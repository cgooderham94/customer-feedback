export const getResultsCount = (results: number) => {
  const baseStr = `${results} Rating`;
  const plural = results > 1 ? "s" : "";

  return [baseStr, plural].join("");
};
