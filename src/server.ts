import app, { init } from "./app";
//import { PORT } from "./config/constants";

const port = process.env.PORT || 4002;

init().then(()=>{
    app.listen(port, ()=>{
        console.log(`Server is listening on ${port}`)
    });
});