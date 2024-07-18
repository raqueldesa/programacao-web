export function generateLoremIpsum(paragraphs: number): string[] {
  const loremText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  return Array(paragraphs).fill(loremText);
}
