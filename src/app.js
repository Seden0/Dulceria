const express = require('express');
const morgan = require('morgan');

const {db}= require('./firebase')

const app= express();

app.use(morgan('dev'))

app.get('/', async(req, res)=>{

   const querySnapshot = await db.collection('products').get()

   console.log(querySnapshot.docs[0].data());
   res.send('hello')
})

module.exports = app;