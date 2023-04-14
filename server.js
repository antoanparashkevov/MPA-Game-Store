const express = require('express');

//configurations
const databaseConfiguration = require('./config/database-configuration');
const expressConfiguration = require('./config/express-configuration');
const routesConfiguration = require('./config/routes-configuration');

const PORT = 3000;

start();

async function start() {
    const app = express();

    expressConfiguration(app);
    await databaseConfiguration(app);
    routesConfiguration(app);

    app.listen(PORT, () => console.log('Server listening on port ' + PORT))

}