var express = require('express'),
    app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/build'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

// Set views directory.
app.set('views', __dirname + '/build');

// Set routes.
app.get('/', function(request, response) {
    response.render('index');
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
