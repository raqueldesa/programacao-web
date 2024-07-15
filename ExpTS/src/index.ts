import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import loggerMiddleware from "./loggerMiddleware";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3333;

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Requisição ${req.method} ${req.url}`);
  next();
});
app.use(loggerMiddleware("completo"));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world!");
});

app.get("/teste1", (req: Request, res: Response) => {
  res.send("teste1");
});

app.get("/teste2", (req: Request, res: Response) => {
  res.send("teste2");
});

app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}.`);
});
