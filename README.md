# react-nodejs-boilerplate
React, NodeJS --harmony, React Router, Gulp, Browserify and more Boilerplate. Unopinionated on NodeJS server. Use express, hapi, koa or whatever.

## Create a Project
```
bash <( curl https://raw.githubusercontent.com/mtomcal/react-nodejs-boilerplate/master/install.sh )
```

##Install From Source
```
npm install
bower install
```

## Entry Points
React Entrypoint
```
./views/App.jsx
```
Server Entrypoint
```
./app.js
```

## Running
Build Static Assets
```
npm run build[-production]
```
Serve Project
```
npm run serve[-production]
```

## Tips
```
npm install -g super-react
super-react "ListContainer>List" --output=./views/components
```
See [Super React](https://github.com/mtomcal/super-react) project for more details.
