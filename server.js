'use strict'

const app = require('./bin/express');
const variables = require('./bin/config/variables');

app.listen(variables.Api.port, () => {
    console.log(`Server booted to port ${variables.Api.port}`);
});
