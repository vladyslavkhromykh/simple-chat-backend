const app = require("express")();
const http = require("http").Server(app);
const port = process.env.PORT || 3000;
const io = require("socket.io")(http);

io.on("connection", (socket) => {
    console.log("user connected");
    
    socket.on("disconnect", () => {
        console.log("user disconnected")
    })
});

http.listen(port, () => {
    console.log("server running at port "+port)
})