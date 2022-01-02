const express = require("express");
const app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use("/src", express.static('./src/'));

app.listen(8080, function () {
    console.log("app alive");
});

app.get("/", function (req,res){
    console.log("sever on");
    res.render("index");
})