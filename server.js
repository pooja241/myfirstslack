require('dotenv').config();
const http = require("http");
const express = require("express"),
  bodyParser = require("body-parser"),
   //axios = require('axios'),  
  _case = require("./case"),

  app = express();
var cronLink = require("node-cron-link");
var keepAlive = require("node-keepalive");
//keepAlive({}, app);
app.enable('trust proxy');
app.set("port", process.env.PORT || 0);
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/case", _case.execute);


app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
http.createServer(app).listen(app.get("port"), () => {
  setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

  
  console.log(`server listening on port ${app.get("port")}`);
});


cronLink("https://heady-adasaurus.glitch.me/keepalive", {time: 2, kickStart: true});


