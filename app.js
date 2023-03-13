var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
const redis = require("redis");
const connectRedis = require("connect-redis");
var http = require("http");
var socket = require("socket.io");
var bodyParser = require("body-parser");
const passportLocalMysql = require("passport-local-mysql");
const MySQLStore = require("express-mysql-session")(session);
const passport = require("passport");
const connectEnsureLogin = require("connect-ensure-login");
const crypto = require("crypto");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const connection = require("./inc/db");
require("dotenv").config();

var app = express();
var http = http.Server(app);
var io = socket(http);

global.io = io;

var siteRouter = require("./routes/siteRoute")(io);
var adminRouter = require("./routes/adminRoute")(io);

const RedisStore = connectRedis(session);
const redisClient = redis.createClient({
  url: process.env.CACHE_HOST,
  legacyMode: true,
});

redisClient.connect();

redisClient.on("error", function (err) {
  console.log("Could not establish a connection with redis. " + err);
});
redisClient.on("connect", function (err) {
  console.log("Connected to redis successfully");
});

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: "password",
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false, // if true only transmit cookie over https
      httpOnly: false, // if true prevent client side JS from reading the cookie
      maxAge: 2000 * 60 * 10, // session max age in miliseconds
    },
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/*auth*/

const customFields = {
  usernameField: "email",
  passwordField: "senha",
};

const verifyCallback = (username, password, done) => {
  console.log("verifyCallback");
  console.log(username, password);
  connection.query(
    "SELECT * FROM tb_usuarios WHERE email = ? ",
    [username],
    function (error, results, fields) {
      if (error) return done(error);

      if (results.length == 0) {
        return done(null, false);
      }
      const isValid = validPassword(password, results[0].hash, results[0].salt);
      user = {
        id: results[0].id_usuario,
        username: results[0].email,
        nome: results[0].nome,
      };
      if (isValid) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    }
  );
};

const strategy = new LocalStrategy(customFields, verifyCallback);

// strategia login google

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.OAUTH_GOOGLE_CALLBACK,
    },
    function (accessToken, refreshToken, profile, done) {
      userProfile = profile;
      console.log(profile);
      connection.query(
        "SELECT * FROM tb_usuarios where email = ?",
        [profile.email],

        function (error, results) {
          console.log("buscando usuario");
          if (results) {
            console.log(results);
            if (results && results.length > 0) {
              done(null, results[0]);
            } else {
              connection.query(
                "Insert into tb_usuarios(email,nome,tipo_usuario, provider) values(?,?,'Usuario', 'GOOGLE'); SELECT * FROM tb_usuarios WHERE id_usuario = (SELECT MAX(id_usuario) FROM `tb_usuarios`); ",
                [profile.email, profile.given_name],
                function (error, results) {
                  console.log("criando usuario");
                  if (error) {
                    console.log("Error");
                    console.log(error);
                    return done(null, false);
                  } else {
                    console.log(results);
                    console.log(results[1]);
                    console.log(results[1][0]);
                    return done(null, results[1][0]);
                  }
                }
              );
            }
          } else {
            console.log(error);
            connection.query(
              "Insert into tb_usuarios(email,nome,tipo_usuario, provider) values(?,?,'Usuario', 'GOOGLE') ",
              [profile.email, profile.given_name],
              function (error, results) {
                console.log("criando usuario");
                if (error) {
                  console.log("Error");
                  console.log(error);
                  return done(null, false);
                } else {
                  console.log(results);
                  return done(null, results);
                }
              }
            );
          }
        }
      );
    }
  )
);

passport.use(strategy);

passport.serializeUser((user, done) => {
  console.log("inside serialize");
  console.log(user);
  if (user.id) {
    done(null, user.id);
  } else {
    done(null, user.id_usuario);
  }
  
});

passport.deserializeUser(function (userId, done) {
  console.log("deserializeUser" + userId);
  connection.query(
    "SELECT * FROM tb_usuarios where id_usuario = ?",
    [userId],

    function (error, results) {
      if (results) {
        done(null, results[0]);
      } else {
        return done(null, false);
      }
    }
  );
});

/*middleware*/
function validPassword(password, hash, salt) {
  var hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 60, "sha512")
    .toString("hex");
  return hash === hashVerify;
}

function genPassword(password) {
  var salt = crypto.randomBytes(32).toString("hex");
  var genhash = crypto
    .pbkdf2Sync(password, salt, 10000, 60, "sha512")
    .toString("hex");
  return { salt: salt, hash: genhash };
}

function userExists(req, res, next) {
  console.log("userExists");
  connection.query(
    "select * from tb_usuarios where email=? ",
    [req.body.uname],
    function (error, results, fields) {
      if (error) {
        console.log("Error");
        console.log(error);
      } else if (results.length > 0) {
        res.redirect("/userAlreadyExists");
      } else {
        next();
      }
    }
  );
}

function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/notAuthorized");
  }
}

app.get(
  "/auth/google",
  passport.authenticate(
    "google",
    { scope: ["profile", "email"] },
    (sucess, err) => {
      if (sucess) {
        console.log(sucess);
      }
      if (err) {
        console.log(err);
      }
    }
  )
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login?failgoogle=true" }),
  function (req, res) {
    // Successful authentication, redirect success.
    res.redirect("/");
  }
);

app.get("/register", (req, res, next) => {
  console.log("Inside get");
  res.render("register");
});

app.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
app.post("/register", userExists, (req, res, next) => {
  const saltHash = genPassword(req.body.pw);
  const salt = saltHash.salt;
  const hash = saltHash.hash;

  connection.query(
    "Insert into tb_usuarios(email,nome,hash,salt,tipo_usuario) values(?,?,?,?,'Usuario') ",
    [req.body.uname, req.body.name, hash, salt],
    function (error, results, fields) {
      if (error) {
        console.log("Error");
        console.log(error);
      } else {
        console.log("Successfully Entered");
      }
    }
  );

  res.redirect("/login?cadastro=true");
});

app.get("/logar", (req, res, next) => {
  res.render("logar");
});

app.post(
  "/login",
  passport.authenticate(strategy, {
    failureRedirect: "/login?fail=true",
    successRedirect: "/",
  })
);

app.use("/", siteRouter);
app.use("/admin", adminRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

io.on("connection", function (socket) {
  console.log("a user connected");

  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
});

http.listen(3000, () => {
  console.log("Servidor em execução...");
});
