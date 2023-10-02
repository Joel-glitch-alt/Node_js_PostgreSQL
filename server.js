const express = require ('express');
// students routes
const studentRoutes = require('./src/student/routes')
//creating express method
const app = express();
//port
const port = 3000;

//middle ware
app.use(express.json());

//initial route
app.get("/", (req, res)=>{
    res.send("Hello World");
});

//invoking student routes
app.use("/api/v1/students", studentRoutes)

app.listen(port , ()=>console.log(`app listening on port ${port}`));