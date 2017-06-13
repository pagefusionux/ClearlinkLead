# ReactTodo

After cloning the ReactBoilerplate3 repository and downloading its '.git' directory, you can do
the following commands to change the destination of origin to a new 'ReactToDo' repo for this project
(make sure the ReactToDo repo is set up on github.com first):
- `$ git remote -v` (see how origin is currently setup)
- `$ git remote rm origin`
- `$ git remote add origin https://github.com/pagefusionux/ReactToDo.git`
- `$ git push -u origin master`

Add UUID library for unique IDs:
- `$ npm install node-uuid --save-dev`

Add existence of api folder to webpack:
- edit webpack.config.js, add under modulesDirectories array:
  - './app/api'

See momentjs.com for adding date functionality:
- `npm install moment@2.12.0 --save-dev`

---

Integrating Redux:
- `$ npm install redux@3.3.1 react-redux@4.4.1 deep-freeze-strict --save-dev`
- Add 'app/actions' folder:
  - Create 'app/actions/actions.jsx'
  - Change webpack.config.js to add alias:
  
    `actions: 'app/actions/actions.jsx',`
  
- Add 'app/reducers' folder:
  - Create 'app/reducers/reducers.jsx'
  - Change webpack.config.js to add alias:
  
    `reducers: 'app/reducers/reducers.jsx',`

- Add 'app/store' folder:
  - Create 'app/store/configureStore.jsx'
  - Change webpack.config.js to add alias:
    
    `configureStore: 'app/store/configureStore.jsx',`

---

Setting up Firebase:
- Create an account on firebase.com (or use Google account)
- `$ npm install firebase@3.0.2` --save
- add 'app/firebase' folder
  - add 'app/firebase/routes.jsx'
  - add to webpack.config.js under 'alias':
  
  ````
  app: 'app', // the alias to end all aliases
  ````

Setting up redux-thunk:
- `$ npm install redux-thunk@2.1.0 --save-dev`

Setting up redux-mock-store (for testing):
- `$ npm install redux-mock-store@1.0.3 --save-dev`

Setting up difference environment (variables):
- `$ npm install node-env-file@0.1.8 --save`
- create directory /config
  - create file /config/test.env
  - create file /config/development.env



---
Udemy Tutorial:
https://www.udemy.com/the-complete-react-web-app-developer-course
