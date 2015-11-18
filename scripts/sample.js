"use strict";

let co     = require('co');
let heroku = require('heroku-client');


module.exports = {
  run: run
};


co(main).catch(logError);


function* main() {
  let args = getArgs();
  try {
    let result = yield run(args.appName);
    log(result);
  } catch (err) {
    throw err;
  }

  function getDynos(app) {
    return hk.apps(app.name).dynos().list();
  }
};

function* run(appName) {
  let hk = getHerokuClient();

  let apps  = yield hk.apps().list();
  // log(apps.map((a) => a.name));
  // let randomApp = apps[0];
  // let addons = yield hk.apps(randomApp.name).addons().listByApp();
  let addons = yield hk.apps(appName).addons().listByApp();
  // let dynos = yield apps.map(getDynos);

  let result = addons;
  return result;
}

function logError(err) {
  console.log(err.stack);
}

function getHerokuClient() {
  let args = getArgs();

  return heroku.createClient({
    token: tok
  });

}

function log() {
  console.log.apply(console, arguments);
}


function getArgs() {
  let key = "HEROKU_API_KEY";
  let tok = process.env[key];

  if (!tok) {
    throw new Error('Must specify ' + key);
  } else {
    return {
      appName: process.env.HEROKU_APP_NAME,
      key: tok
    };
  }
}
