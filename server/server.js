const express = require("express"),
    bp = require("body-parser"),
    cors = require("cors"),
    app = express(),
    port = 8000,
    path = require('path');


app.get("/stream", (req, res) => {
    res.set({
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
    });

    let eventInterval = setInterval(() => {
        res.write(`event: message\n`);
        res.write(`data: ${JSON.stringify( new Date().toLocaleString())}\n\n`);
    }, 1000);

    req.on("close", (err) => {
        clearInterval(eventInterval);
        res.end();
    });
});


app.use(cors());
app.use(bp.json());
app.use(express.static(path.join(__dirname, './client/build')));


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});