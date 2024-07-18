import { Router, Request, Response } from "express";
import { generateLoremIpsum } from "../public/utils/utils";

const router = Router();

router.get("/", (req, res) => {
  res.send("Página principal do site");
});
router.get("/sobre", (req, res) => {
  res.send("Página sobre");
});

router.get("/lorem/:count", (req: Request, res: Response) => {
  const count = parseInt(req.params.count, 10);

  const loremIpsum = generateLoremIpsum(count);
  res.send(`<p>${loremIpsum.join("</p><p>")}</p>`);
});

router.get("/hb1", (req, res) => {
  res.render("hb1", {
    mensagem: "Olá, você está aprendendo Express + HBS!",
    layout: false,
  });
});

router.get("/hb2", (req, res) => {
  res.render("hb2", {
    poweredByNodejs: true,
    name: "Express",
    type: "Framework",
    layout: false,
  });
});

router.get("/hb3", (req, res) => {
  const profes = [
    { nome: "David Fernandes", sala: 1238 },
    { nome: "Horácio Fernandes", sala: 1233 },
    { nome: "Edleno Moura", sala: 1236 },
    { nome: "Elaine Harada", sala: 1231 },
  ];
  res.render("hb3", { profes, layout: false });
});

router.get("/hb4", function (req, res) {
  const profes = [
    { nome: "David Fernandes", sala: 1238 },
    { nome: "Horácio Fernandes", sala: 1233 },
    { nome: "Edleno Moura", sala: 1236 },
    { nome: "Elaine Harada", sala: 1231 },
  ];
  res.render("hb4", { profes, layout: false });
});

export default router;
