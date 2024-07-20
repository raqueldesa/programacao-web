import { Request, Response } from "express";
import {
  createMajor,
  deleteMajor,
  getMajor,
  getMajors,
  updateMajor,
} from "../services/major";

const index = async (req: Request, res: Response) => {
  try {
    const majors = await getMajors();
    res.render("major/index", { majors, layout: "index" });
  } catch (error) {}
};

const create = async (req: Request, res: Response) => {
  if (req.method === "GET") {
    res.render("major/create", { layout: "index" });
  } else {
    try {
      await createMajor(req.body);
      res.redirect("/major");
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
};

const read = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const major = await getMajor(id);
    res.render("major/read", { major, layout: "index" });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (req.method === "GET") {
    const major = await getMajor(id);
    res.render("major/update", { major, layout: "index" });
  } else {
    try {
      const major = await updateMajor(id, req.body);
      res.render("major/read", { major, layout: "index" });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
};
const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await deleteMajor(id);
    console.log(result);
    res.redirect("/major");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

export default { index, create, read, update, remove };
