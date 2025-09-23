const express = require("express");
const app = express();
const mainRouter = require("./routes/index")
const cors = require("cors");
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/api/v1",mainRouter);

app.listen(port, (err)=>{
    if(err) {
        console.log("error in server setup");
    }
    console.log("server listening on port", port);
});