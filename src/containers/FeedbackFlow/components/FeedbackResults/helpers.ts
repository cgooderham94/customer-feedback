export const getPluralised = (count: number, baseWord: string) => {
  const baseStr = `${count} ${baseWord}`;
  const plural = count > 1 ? "s" : "";

  return [baseStr, plural].join("");
};
