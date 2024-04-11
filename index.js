const express = require('express');
const AuthRouter=require('./routes/Auth');
const TaskRouter=require('./routes/Tasks');
const UserRouter=require('./routes/User')


const app = express();
app.use(express.json());

app.use("/", AuthRouter);
app.use("/task",TaskRouter)
app.use("/user",UserRouter)

app.listen(8800, () => {
  console.log("Connected...");
});