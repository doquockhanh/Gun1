const express = require("express");
const app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use("/src", express.static('./src/'));

app.listen(process.env.PORT || 8080, function () {
    console.log("app alive");
});

app.get("/", function (req,res){
    res.render("index");
})