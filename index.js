const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 5000

disconnect = false;
ping = false;
isRunning = "Not received";
minPing = "Not received";
maxPing = "Not received";
blockedProcess = "";
time = "15";
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('login')
})

app.get('/ping', (req, res) => {
    ping = true;
    res.redirect('/');
})

app.get('/disconnect', (req, res) => {
    disconnect = true;
    res.redirect('/')
})



app.get('/rest', (req, res) => {
    disconnect = false;
    ping = false;
    isRunning = false;
    res.redirect('/')
})

app.get('/manageProcess', (req, res) => {
    res.render("file", { "blockedProcess": blockedProcess });
})

app.get('/delay', (req, res) => {
    res.send(time);
})

app.get('/setDelay/:time', (req, res) => {
    time = req.params.time;
    res.redirect("/delay");
})

app.post('/manageProcess', (req, res) => {
    blockedProcess = req.body.process;
    res.render("file", { "blockedProcess": blockedProcess });

})

app.get("/processList", (req, res) => {
    res.send(blockedProcess);
})
app.post('/', (req, res) => {
    password = req.body.password;
    if (password == "Oabis#gsiFh5t") {
        res.render('index', { status: isRunning, "maxPing": maxPing, "minPing": minPing });
    }
    res.send("GetLost");
})

app.post('/toExecute', (req, res) => {
    if (req.body.running == "true") {
        isRunning = "yes";
    } else {
        isRunning = "no";
    }

    if (req.body.min) {
        minPing = req.body.min;
    }
    if (req.body.max) {
        maxPing = req.body.max;
    }
    if (disconnect) {
        res.send("Disconnect");
    }
    else if (ping) {
        res.send("Ping");
    }
    else {
        res.send("nothing");
    }


})

app.listen(PORT, () => {
    console.log("lising on port " + PORT);
});


