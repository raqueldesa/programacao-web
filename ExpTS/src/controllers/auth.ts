import { Request, Response } from "express";
import { getMajors } from "../services/major";

const signup = async (req: Request, res: Response) => {
  if (req.method === "GET") {
    const majors = await getMajors();
    res.render("auth/signup", { majors, layout: "index" });
  } else {
    res.send("dados recebidos");
  }
};

const login = async (req: Request, res: Response) => {};
const logout = async (req: Request, res: Response) => {};

export default { signup, login, logout };
