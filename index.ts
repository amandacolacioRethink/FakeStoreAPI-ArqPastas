import { errorHandler } from "./middleware/erroHandler";
import express, { Request, Response} from 'express';
import { router } from "./routes";
import * as dotenv from 'dotenv' 
dotenv.config()
const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Fake Store API is running");
});

app.use("/", router);
app.use(errorHandler);

const port = 3000
app.listen(port, ()=>{console.log(`Listening on ${port}`)});