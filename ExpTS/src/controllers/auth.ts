import { Request, Response } from "express";
import { getMajors } from "../services/major";
import { createUser } from "../services/user";
import { checkAuth } from "../services/auth";

const signup = async (req: Request, res: Response) => {
  if (req.method === "GET") {
    const majors = await getMajors();
    res.render("auth/signup", { majors, layout: "index" });
  } else {
    try {
      await createUser(req.body);
      res.redirect("/auth/login");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
};

const login = async (req: Request, res: Response) => {
  if (req.method === "GET") {
    res.render("auth/login", { layout: "index" });
  } else {
    const user = await checkAuth(req.body);
    if (!user) return res.redirect("/auth/login");
    req.session.uid = user.id;
    res.redirect("/major");
  }
};
const logout = async (req: Request, res: Response) => {
  req.session.destroy((error) => {
    if (error) console.log(error);
    else res.redirect("/auth/login");
  });
};

export default { signup, login, logout };
