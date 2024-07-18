import { Request, Response } from "express";
import fs from "fs";
import path from "path";

const dbPath = path.join(__dirname, "../../data/db.json");

interface Produto {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
}

const readDb = (): { produtos: Produto[] } => {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data);
};

const writeDb = (data: { produtos: Produto[] }) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
};

export const index = (req: Request, res: Response) => {
  const db = readDb();
  res.render("produto/index", { produtos: db.produtos, layout: "index" });
};

export const create = (req: Request, res: Response) => {
  if (req.method === "GET") {
    res.render("produto/create", { layout: "index" });
  } else {
    const db = readDb();
    const newProduto: Produto = {
      id: db.produtos.length ? db.produtos[db.produtos.length - 1].id + 1 : 1,
      ...req.body,
      preco: Number(req.body.preco),
      estoque: Number(req.body.estoque),
    };
    db.produtos.push(newProduto);
    writeDb(db);
    res.redirect("/produto");
  }
};

export const read = (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDb();
  const produto = db.produtos.find((p) => p.id === Number(id));
  if (produto) {
    res.render("produto/read", { produto, layout: "index" });
  } else {
    res.status(404).send("Produto não encontrado");
  }
};

export const update = (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDb();
  const produtoIndex = db.produtos.findIndex((p) => p.id === Number(id));
  if (produtoIndex > -1) {
    if (req.method === "GET") {
      res.render("produto/update", {
        produto: db.produtos[produtoIndex],
        layout: "index",
      });
    } else {
      db.produtos[produtoIndex] = {
        ...db.produtos[produtoIndex],
        ...req.body,
        preco: Number(req.body.preco),
        estoque: Number(req.body.estoque),
      };
      writeDb(db);
      res.redirect("/produto");
    }
  } else {
    res.status(404).send("Produto não encontrado");
  }
};

export const remove = (req: Request, res: Response) => {
  const { id } = req.params;
  const db = readDb();
  const produtoIndex = db.produtos.findIndex((p) => p.id === Number(id));
  if (produtoIndex > -1) {
    db.produtos.splice(produtoIndex, 1);
    writeDb(db);
    res.redirect("/produto");
  } else {
    res.status(404).send("Produto não encontrado");
  }
};

export default { index, read, create, update, remove };
