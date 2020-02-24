Run `npm install` from the root directory

Then add in your env variables (account_sid, auth_token, from_number, to_number) in the .env directory

Modify the cron.schedule string in `app.js` to be the current hour. For example, if it's 2:04pm, the string should be (* 14 * * *)

This will schedule the message to send every minute during that hour

Then run `node app.js` from root folder