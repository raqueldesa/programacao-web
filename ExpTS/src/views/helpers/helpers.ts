import { Tech } from "./helpersTypes";

export function listTechs(technologies: Tech[]) {
  const list = technologies.map((p) => `<li>${p.name} - ${p.type}</li>`);
  return `<ul>${list.join("")}</ul>`;
}
