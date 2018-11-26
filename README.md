## Set up

I'm currently running node version v10.3.0
This can be found by running 'node -v' in terminal
If you run into any issues intalling dependencies
try using a newer version of node.

You will need to create a dev config file in
config directory. Name file keys_dev.js with the following
export

module.exports = {
mongoURI: '',
secretOrKey: '',
clientId: '',
clientSecret: ''
};

mongoUri: is the path to you mongose database
ex: mongodb://<dbuser>:<dbpassword>@ds1476370.mlab.com:47520/blink

secretOrKey: Used when signing token never store in repo

clientId: Id issued by spotify

clientSecret: Secret issued by spotify

You will need to create a devloper account
at [https://developer.spotify.com/dashboard/login](https://developer.spotify.com/dashboard/login)

production app can be found at [https://fierce-fjord-92913.herokuapp.com/](https://fierce-fjord-92913.herokuapp.com/)

## Available Scripts

In the project directory, you can run:

### `npm i`

Install dependencies

### `npm start`

Runs the app in the development mode.<br>
at [http://localhost:5500](http://localhost:5500)

Now that server is up navigate to blink_client directory and
install node moduels and run npm start. Additional Read me
is found in directory.
