var express = require('express'),
    app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/build'));

// Set views directory.
app.set('views', __dirname + '/build');
app.set('view engine', 'ejs');

// Set routes.
app.get('/', function(request, response) {
    response.render('index');
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
