import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import loggerMiddleware from "./middlewares/loggerMiddleware";
import { engine } from "express-handlebars";
import router from "./router/router";
import sass from "node-sass-middleware";
import cookieParser from "cookie-parser";
import session from "express-session";
import { v4 as uuidv4 } from "uuid";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3333;
const publicPath = `${process.cwd()}`;

declare module "express-session" {
  interface SessionData {
    uid: string;
  }
}

app.engine(
  "handlebars",
  engine({
    layoutsDir: `${__dirname}/views/layouts`,
    defaultLayout: "index",
  })
);
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);
app.engine(
  "handlebars",
  engine({
    helpers: require(`${__dirname}/views/helpers/helpers.ts`),
  })
);

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Requisição ${req.method} ${req.url}`);
  next();
});
app.use(loggerMiddleware("completo"));

app.use(
  sass({
    src: `${__dirname}/../public/scss`,
    dest: `${__dirname}/../public/css`,
    outputStyle: "compressed",
    prefix: "/css",
  })
);
app.use("/css", express.static(`${__dirname}/../public/css`));

app.use("/js", [
  express.static(`${__dirname}/../public/js`),
  express.static(`${__dirname}/../node_modules/bootstrap/dist/js/`),
]);
app.use("/img", express.static(`${publicPath}/public/img`));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    genid: () => uuidv4(), // usamos UUID para gerar os SESSID
    secret: "Hi9Cf#mK98",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(router);

app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}.`);
});
