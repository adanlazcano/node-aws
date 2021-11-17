// const express = require('express');

// const app = express();

// app.set('port', process.env.PORT || 3000);

// app.get('/', (req, res) => {

//     res.send('welcome world');
// })

// app.listen(app.get('port'), _ => {
//     try {
//         console.log(`Server running on port ${app.get('port')}`);
//     } catch (error) {
//         console.log(error.message);
//     }
// });

// const http = require('http');

const path = require("path");
const dotenv = require("dotenv");
// dotenv.config();
dotenv.config({ path: path.join(__dirname, ".env") });

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");

const GanadoStatus = require("./cronjob");

GanadoStatus();

mongoose
    .connect(`${process.env.DBHATO}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true

    })
    .then((x) => {
        console.log(`Conectado a base de datos: "${x.connections[0].name}"`);
    })
    .catch((err) => {
        console.error("Error connecting to mongo", err);
    });

const app_name = require("./package.json").name;
const debug = require("debug")(
    `${app_name}:${path.basename(__filename).split(".")[0]}`
);
// console.log("debug", debug);
const app = express();

app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTENDPOINT.split(";"),
    })
);

app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: process.env.SECRET,
        cookie: { maxAge: 1000 * 60 * 60 },
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger("dev"));

const index = require("./routes/index");
const rancho = require("./routes/rancho");
const ganaderos = require("./routes/ganaderos");
const Proveedores = require("./routes/Proveedores");
const Palpacion = require("./routes/palpacion");
const vacunas = require("./routes/vacunas");
const auth = require("./routes/auth");
const configuracion = require("./routes/Config");
const details = require("./routes/details");

app.use("/api/", index);
app.use("/api/rancho", rancho);
app.use("/api/details", details);
app.use("/api/ganaderos", ganaderos);
app.use("/api/proveedores", Proveedores);
app.use("/api/palpacion", Palpacion);
app.use("/api/vacunas", vacunas);
app.use("/api/auth", auth);
app.use("/api/config", configuracion);

app.use((req, res, next) => {
    res.status(404).json({ msg: 'Not Found' });
});

app.use((err, req, res, next) => {
    console.error('ERROR', req.method, req.path, err);
    if (!res.headersSent) {
        res.status(500).send({ msg: 'Revisa tu consola' });
    }
});

// const server = http.createServer(app);

//   server.on('error', (error) => {
//     if (error.syscall !== 'listen') {
//       throw error;
//     }
//     switch (error.code) {
//       case 'EACCES':
//         console.error(`Port ${procces.env.PORT} requiere privilegios`);
//         process.exit(1);
//         break;
//       case 'EADDRINUSE':
//         console.error(`Port ${procces.env.PORT} esta en uso`);
//         process.exit(1);
//         break;
//       default:
//         throw error;
//     }
//   });

app.listen(process.env.PORT, () => {
    console.log(`Listening on http://localhost:${process.env.PORT}`);
});