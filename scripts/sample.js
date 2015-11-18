"use strict";

let co     = require('co');
let heroku = require('heroku-client');

function* main() {
  let hk = getHerokuClient();
  try {
    let apps  = yield hk.apps().list();
    let dynos = yield apps.map(getDynos);

    console.log(dynos);
  } catch (err) {
    throw err;
  }

  function getDynos(app) {
    return hk.apps(app.name).dynos().list();
  }
};

co(main).catch(logError);

function logError(err) {
  console.log(err.stack);
}

function getHerokuClient() {
  let key = "HEROKU_API_KEY";
  let tok = process.env[key];

  if (!tok) {
    throw new Error('Must specify ' + key);
  } else {
    return heroku.createClient({
      token: tok
    });
  }
}
