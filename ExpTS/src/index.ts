import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import loggerMiddleware from "./loggerMiddleware";
import { engine } from "express-handlebars";
import router from "../router/router";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3333;
const publicPath = `${process.cwd()}`;

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);
console.log(`${__dirname}/views`);

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Requisição ${req.method} ${req.url}`);
  next();
});
app.use(loggerMiddleware("completo"));

app.use("/css", express.static(`${publicPath}/public/css`));
app.use("/js", express.static(`${publicPath}/public/js`));
app.use("/img", express.static(`${publicPath}/public/img`));

app.use(router);
app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}.`);
});
