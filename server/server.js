//import express from node_modules

let express = require('express');

// make the application from express

let app = express();
const PORT = 5000;

//serve our files

app.use(express.static('server/public'));

app.listen(PORT, () => {
    // console.log('app is running on port 5000')

})