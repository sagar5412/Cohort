const express = require("express");
const app = express();
// const bodyParser=require('body-parser');
app.use(express.json());
const port=3000;
const user = [
    {
        name: "john",
        kidneys: [
            {
                healthy: false,
            },
        ],
    },
];

app.get("/", (req, res) => {
    const johnKidneys = user[0].kidneys;
    const numberofkidneys = johnKidneys.length;
    let numberofHealthyKidneys = 0;
    for (let i = 0; i < johnKidneys.length; i++) {
        if (johnKidneys[i].healthy) {
            numberofHealthyKidneys++;
        }
    }
    const numberOfUnhealthykidneys = numberofkidneys - numberofHealthyKidneys;
    res.json({
        numberofkidneys,
        numberofHealthyKidneys,
        numberOfUnhealthykidneys,
    });
});

app.post("/", (req, res) => {
    const isHealthy = req.body.isHealthy;
    user[0].kidneys.push({
        healthy: isHealthy,
    });
    res.json({
        msg: "Done!",
    });
});

app.put("/", (req, res) => {
    console.log(isthereUnhealthykidney());
    if (isthereUnhealthykidney()) {
        for (let kidney of user[0].kidneys) {
            kidney.healthy = true;
        }
        
        return res.json({});
    } else {
        return res.status(411).json({
            msg: "You have no unhealthy kidneys",
        });
    }
});

app.delete("/", (req, res) => {
    if (isthereUnhealthykidney()) {
        const newKidneys = [];
        for (let i of user[0].kidneys) {
            if (i.healthy) {
                newKidneys.push({
                    healthy: true,
                });
            }
        }
        user[0].kidneys = newKidneys;
        console.log(user[0].kidneys);
        return res.json({
            msg: "Done",
        });
    } else {
        return res.status(411).json({
            msg: "You have no unhealthy kidneys",
        });
    }
});

function isthereUnhealthykidney() {
    let unhealthykidney = false;
    for (let kidney of user[0].kidneys) {
        if (!kidney.healthy) {
            unhealthykidney = true;
        }
    }
    return unhealthykidney;
}

app.listen(port,()=>{
    console.log("App is listening");
});
