"use strict";

let express = require('express'),
    bodyParser = require('body-parser'),
    auth = require('.salesforce/module/slack-salesforce-auth'),
    _case = require('.salesforce/module/case'),
    whoami = require('.salesforce/module/whoami'),
    actions = require('./actions'),
    app = express();



app.set('port', process.env.PORT || 3000);


app.use(bodyParser.urlencoded({ extended: true }));

app.post('/actions', actions.handle);

app.post('/case', _case.execute);
app.post('/whoami', whoami.execute);
app.post('/login', auth.loginLink);
app.post('/logout', auth.logout);
app.get('/login/:slackUserId', auth.oauthLogin);
app.get('/oauthcallback', auth.oauthCallback);

app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
