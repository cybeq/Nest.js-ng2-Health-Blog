## Description
Blog with the ability to add articles in the editor by the administrator in assigned categories.
The code does not require a lot of refactoring for deeper development, but it is only a "drawer" project.

Prepared for SEO

## Run dev
Need to add this collection to mongoDB before run
```
mongosh 'mongodb://localhost:27017/mydatabase' --eval "db.categories.insertMany([{ name: 'Zdrowie', color: 'cyan' }, { name: 'Choroby', color: 'black' }, { name: 'Leki', color: 'green' }, { name: 'Ciąża i dziecko', color: 'yellow' }, { name: 'Zdrowie psychiczne', color: 'lightblue' }, { name: 'Dieta', color: 'purple' }, { name: 'Uroda', color: 'pink' }, { name: 'Medycyna estetyczna', color: 'orange' }])"
```
Frontend
```
ng serve --proxy-config proxy.json
```
Api
```
npm run start
```
