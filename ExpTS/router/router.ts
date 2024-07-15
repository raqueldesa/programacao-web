import { Router, Request, Response } from "express";
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

function generateLoremIpsum(paragraphs: number): string[] {
  const loremText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  return Array(paragraphs).fill(loremText);
}
export default router;
