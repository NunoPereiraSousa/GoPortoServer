const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const router = require("./Routes/routes")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(router);

app.listen(port, () => console.log(`Serving working on port ${port}`));