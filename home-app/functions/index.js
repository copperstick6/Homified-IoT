'use strict';

const {dialogflow} = require('actions-on-google');
const functions = require('firebase-functions');

const app = dialogflow();

app.intent('Request', (conv) => {
  conv.close("Request Sent. Preset activated.")
});

app.intent('Default Welcome Intent', conv =>{
  conv.ask("Welcome to Home IoT. Please say Request to run your presets.")
})

exports.HomeIoT = functions.https.onRequest(app);
