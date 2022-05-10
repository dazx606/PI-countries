warning: LF will be replaced by CRLF in api/src/db.js.
The file will have its original line endings in your working directory
[1mdiff --git a/api/src/db.js b/api/src/db.js[m
[1mindex 3cf3ae9..4334b74 100644[m
[1m--- a/api/src/db.js[m
[1m+++ b/api/src/db.js[m
[36m@@ -4,12 +4,13 @@[m [mconst { Sequelize, Op } = require('sequelize');[m
 const fs = require('fs');[m
 const path = require('path');[m
 const {[m
[31m-  DB_USER2, DB_PASSWORD2, DB_HOST2, DB_NAME2, DB_USER, DB_PASSWORD, DB_HOST, DB_NAME[m
[32m+[m[32m DB_USER, DB_PASSWORD, DB_HOST, DB_NAME[m
 } = process.env;[m
 [m
 //----------------------------------------HEROKU CONECTION------------------------------[m
[31m-[m
[31m-sequelize = new Sequelize(process.env.DATABASE_URL, {[m
[32m+[m[32mlet sequelize;[m
[32m+[m[32mif(process.env.DATABASE_URL){[m
[32m+[m[32m  sequelize = new Sequelize(process.env.DATABASE_URL, {[m
     dialectOptions: {[m
       ssl: {[m
         require: true,[m
[36m@@ -27,13 +28,17 @@[m [msequelize[m
   .catch(err => {[m
     console.error('Unable to connect to the database:', err);[m
   });[m
[32m+[m[32m} else {[m
[32m+[m[32m  //-------------------------------------LOCAL----------------------------------------------------[m
[32m+[m
[32m+[m[32m  sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {[m
[32m+[m[32m  logging: false, // set to console.log to see the raw SQL queries[m
[32m+[m[32m  native: false, // lets Sequelize know we can use pg-native for ~30% more speed[m
[32m+[m[32m});[m
[32m+[m[32m}[m
[32m+[m
 [m
[31m-//-------------------------------------LOCAL----------------------------------------------------[m
 [m
[31m-// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {[m
[31m-//   logging: false, // set to console.log to see the raw SQL queries[m
[31m-//   native: false, // lets Sequelize know we can use pg-native for ~30% more speed[m
[31m-// });[m
 [m
 const basename = path.basename(__filename);[m
 [m
[1mdiff --git a/client/src/app/config.js b/client/src/app/config.js[m
[1mindex 8ee827b..8857c31 100644[m
[1m--- a/client/src/app/config.js[m
[1m+++ b/client/src/app/config.js[m
[36m@@ -1,5 +1,5 @@[m
[31m-// export const URL_API_COUNTRIES = "http://localhost:3001/countries"[m
[31m-// export const URL_API_ACTIVITIES = "http://localhost:3001/activities"[m
[32m+[m[32mexport const URL_API_COUNTRIES = "http://localhost:3001/countries"[m
[32m+[m[32mexport const URL_API_ACTIVITIES = "http://localhost:3001/activities"[m
 [m
[31m-export const URL_API_COUNTRIES = "https://countries-daz.herokuapp.com/countries"[m
[31m-export const URL_API_ACTIVITIES = "https://countries-daz.herokuapp.com/activities"[m
[32m+[m[32m// export const URL_API_COUNTRIES = "https://countries-daz.herokuapp.com/countries"[m
[32m+[m[32m// export const URL_API_ACTIVITIES = "https://countries-daz.herokuapp.com/activities"[m
[1mdiff --git a/client/src/app/redux/actions/actionType.js b/client/src/app/redux/actions/actionType.js[m
[1mindex 138b270..f6f63eb 100644[m
[1m--- a/client/src/app/redux/actions/actionType.js[m
[1m+++ b/client/src/app/redux/actions/actionType.js[m
[36m@@ -14,3 +14,5 @@[m [mexport const SET_ACT = "SET_ACT";[m
 export const ALL = "ALL";[m
 export const SET_SEASON = "SET_SEASON";[m
 export const CLEAR_COUNTRY = "CLEAR_COUNTRY"[m
[41m+[m
[41m+[m
