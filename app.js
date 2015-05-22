var server = require('./src/lib/server');

var Good = require('good');

server.register({
    register: Good,
    options: {
        reporters: [{
            reporter: require('good-console'),
            events: {
                response: '*',
                log: '*'
            }
        }]
    }
}, function (err) {
    if (err) {
        throw err; 
    }

    server.start(function () {
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});