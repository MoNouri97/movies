export const getImage = (
  url: string,
  width: "200" | "300" | "400" | "500" | "original" = "200"
) => {
  const widthString = width == "original" ? width : `w${width}`;
  return `https://image.tmdb.org/t/p/${widthString}${url}`;
};
