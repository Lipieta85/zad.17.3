var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    stringifyFile,

    fs = require('fs');

app.use(bodyParser.json());

app.get('/getNote', function (req, res) {
    fs.readFile('./test.json', 'utf8', function (err, data) {
        if (err) throw err;
        stringifyFile = data
        res.send(data);
    });
});

app.post('/updateNote/:note', function (req, res) {
    console.log('Otrzymałem żądanie POST do strony głównej');
    stringifyFile = req.params.note;
    fs.writeFile('./test.json', stringifyFile, function (err) {
        if (err) throw err;
        console.log('file updated');
    });
    res.send('Hello POST!');
});


var server = app.listen(3000);

app.use(function (req, res, next) {
    res.status(404).send('Wybacz, nie mogliśmy odnaleźć tego, czego żądasz!')
});