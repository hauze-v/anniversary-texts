// Pull in twilio env variables and create & authenticate twilio client
const dotenv = require('dotenv').config();
const cron = require('node-cron'); // Pull in the node cron package

// Check to see if env variables exist
if (!process.env.ACCOUNT_SID || !process.env.AUTH_TOKEN) {
  console.log("Couldn't find environmental variables account_sid or auth_token");
  process.exit(1);
}

// Assign env variables
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// Pull in the messages
const messages = require('./messages')
var currentMessage = 0;

// Send Message function
function sendMessage() {
  client.messages
    .create({
      body: messages[currentMessage],
      from: process.env.FROM_NUMBER,
      to: process.env.TO_NUMBER
    })
    .then(message => {
      currentMessage++;
      console.log(message);
    })
    .catch(error => console.log(error))
}

console.log('--- Starting anniversary texts job ---');

// Schedule a function to run every hour:
cron.schedule('* 13 * * *', ()=> {
  sendMessage();
  console.log('Message sent!');
}) // Here, the '0 * * * *' means: Run every hour at 0 minutes


