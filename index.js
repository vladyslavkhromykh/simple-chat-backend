const app = require('express')();
const http = require('http').Server(app);
const port = process.env.PORT || 3000;


http.listen(port, () => {
    console.log('server running at port ${port}')
})