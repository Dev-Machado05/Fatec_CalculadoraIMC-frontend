const getTheme = () => {
  const prefDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (prefDark) {
    return "dark";
  } else {
    return "light";
  }
};

export default getTheme;