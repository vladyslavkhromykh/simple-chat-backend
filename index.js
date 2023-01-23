const app = require("express")();
const http = require("http").Server(app);
const port = process.env.PORT || 3000;
const io = require("socket.io")(http);
const fs = require("fs");

io.on("connection", (socket) => {
    console.log("user connected");
    
    socket.on("disconnect", () => {
        console.log("user disconnected")
    })

    socket.on("message", message => {
        console.log("message:"+message);

        let historyFile = "history.txt"

        console.log("\n" + historyFile+ " before writing:",
        fs.readFileSync(historyFile, "utf8"));

        fs.appendFile(historyFile, "\n" + message, (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log(historyFile+"\n", "utf8");
            }
        });
        io.emit("message", message);
    })
});

http.listen(port, () => {
    console.log("server running at port "+port);

    // Create history file if it doesn't exists
    let historyFile = "history.txt"
    if (!fs.existsSync(historyFile)) {
        console.log(historyFile + "doesn't exists so we are about to create one")
        fs.open(historyFile, 'w', function(err, file) {
            if (err) throw err;
            console.log(historyFile + " created");
        });
    } else {
        console.log(historyFile + " already exists");
    }
})

app.get("/getHistory", (request, response) => {
    let array = fs.readFileSync("history.txt").toString().split("\n");
    response.send(array);
});