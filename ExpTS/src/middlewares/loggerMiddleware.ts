import { Request, Response, NextFunction } from "express";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

dotenv.config();

const logPath = process.env.LOG_PATH || "./logs";

if (!fs.existsSync(logPath)) {
  fs.mkdirSync(logPath, { recursive: true });
}

const simpleLog = (req: Request): string => {
  return `${new Date().toISOString()}, ${req.url}, ${req.method}\n`;
};

const completeLog = (req: Request): string => {
  return `${new Date().toISOString()}, ${req.url}, ${req.method}, ${
    req.httpVersion
  }, ${req.get("User-Agent")}\n`;
};

const loggerMiddleware = (logFormat: "simples" | "completo") => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const log = logFormat === "simples" ? simpleLog(req) : completeLog(req);
    const logFile = path.join(logPath, "access.log");

    fs.appendFile(logFile, log, (err) => {
      if (err) {
        console.error("Failed to write log:", err);
      }
    });

    next();
  };
};

export default loggerMiddleware;
