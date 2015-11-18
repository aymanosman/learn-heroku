"use strict";

let co     = require('co');
let heroku = require('heroku-client');
let hk     = heroku.createClient({ token: process.env.HEROKU_API_KEY });

let main = function* () {
  let apps  = yield hk.apps().list();
  let dynos = yield apps.map(getDynos);

  console.log(dynos);

  function getDynos(app) {
    return hk.apps(app.name).dynos().list();
  }
};

co(main)();
