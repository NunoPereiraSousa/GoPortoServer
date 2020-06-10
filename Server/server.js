const express = require('express');
const cors = require("cors")
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const router = require("./Routes/routes");
// const session = require('express-session');
const helmet = require('helmet');

// const csrf = require('csurf');

app.use(cors({
    credentials: true,
    origin: true
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(helmet.hsts({
    maxAge: 7776000000,
    includeSubDomains: true
}));
// app.use(session({
//     secret: 'our super secret session secret',
//     saveUninitialized: true,
//     resave: true,
//     cookie: {
//         maxAge: 3600000,
//         secure: true,
//         httpOnly: true
//     }
// }));

app.use(router);

app.listen(port, () => console.log(`Serving working on port ${port}`));