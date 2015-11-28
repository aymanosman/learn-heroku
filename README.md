```sh
tok=`heroku auth:token`
app=<app-name>

HEROKU_APP_NAME=$app HEROKU_API_KEY=$tok node scripts/sample.js
```

requires nodev4 or above.
