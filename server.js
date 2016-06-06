var express = require('express'),
    app = express();

app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/build'));

// This redirects everything back to index.html (HTML5 pushstate).
app.all('/*', function(request, response) {
    response.sendFile('index.html', {
        root: __dirname + '/build'
    });
});

// Set views directory.
app.set('views', __dirname + '/build');

// Set routes.
app.get('/', function(request, response) {
    response.render('index');
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
