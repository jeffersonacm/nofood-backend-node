const variables = {
    Api: {
        port: process.env.port || 3000
    }, 
    Database: {
        connection: process.env.connection || 'you_connection_here'
    }
}

module.exports = variables;