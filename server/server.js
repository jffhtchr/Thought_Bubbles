const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./db'); 

app.use(express.static(path.join(__dirname, '../public')))

// Any routes or other various middlewares should go here!

// Make sure this is right at the end of your server logic!
// The only thing after this might be a piece of middleware to serve up 500 errors for server problems
// (However, if you have middleware to serve up 404s, that go would before this as well)
app.get('*', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});


db.sync({force:true})  // sync our database
  .then(function(){
    // app.listen(port) // then start listening with our express server once we have synced
    app.listen(PORT, function () {
        console.log(`Listening on port ${PORT}`);
      });
  })




app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error');
  });