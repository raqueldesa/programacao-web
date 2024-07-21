import { NextFunction, Request, Response } from "express";
import { generateLoremIpsum } from "../utils/utils";
import { v4 as uuidv4 } from "uuid";

const index = (req: Request, res: Response) => {
  res.render("main/index", { mensagem: "Página inicial <3", layout: "index" });
};

const sobre = (req: Request, res: Response) => {
  res.send("Página sobre");
};

const lorem = (req: Request, res: Response) => {
  const count = parseInt(req.params.count, 10);

  const loremIpsum = generateLoremIpsum(count);
  res.send(`<p>${loremIpsum.join("</p><p>")}</p>`);
};

const hb1 = (req: Request, res: Response) => {
  res.render("main/hb1", {
    uf: "Universidade Federal do Amazonas",
    layout: "index",
  });
};

const hb2 = (req: Request, res: Response) => {
  res.render("main/hb2", {
    poweredByNodejs: true,
    name: "Express",
    type: "Framework",
    layout: "index",
  });
};

const hb3 = (req: Request, res: Response) => {
  const profes = [
    { nome: "David Fernandes", sala: 1238 },
    { nome: "Horácio Fernandes", sala: 1233 },
    { nome: "Edleno Moura", sala: 1236 },
    { nome: "Elaine Harada", sala: 1231 },
  ];
  res.render("main/hb3", { profes, layout: "index" });
};

const hb4 = (req: Request, res: Response) => {
  const technologies = [
    { name: "Express", type: "Framework", poweredByNodejs: true },
    { name: "Laravel", type: "Framework", poweredByNodejs: false },
    { name: "React", type: "Library", poweredByNodejs: true },
    { name: "Handlebars", type: "Engine View", poweredByNodejs: true },
    { name: "Django", type: "Framework", poweredByNodejs: false },
    { name: "Docker", type: "Virtualization", poweredByNodejs: false },
    { name: "Sequelize", type: "ORM tool", poweredByNodejs: true },
  ];
  res.render("main/hb4", { technologies, layout: "index" });
};
const createCookie = (req: Request, res: Response) => {
  if (!("nomeCookie" in req.cookies)) {
    res.cookie("nomeCookie", "valorCookie");
    res.send("Você NUNCA passou por aqui!");
  } else {
    res.send("Você JÁ passou por aqui");
  }
};
const clearCookie = (req: Request, res: Response) => {
  res.clearCookie("nomeCookie");
  res.send("cookie apagado");
};

const uuid = (req: Request, res: Response, next: NextFunction) => {
  const uniqueId = uuidv4();
  res.send(`UUID: ${uniqueId}`);
};

export default {
  index,
  sobre,
  lorem,
  hb1,
  hb2,
  hb3,
  hb4,
  createCookie,
  clearCookie,
  uuid,
};
