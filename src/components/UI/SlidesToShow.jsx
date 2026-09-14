

const getSlidesToShow = () => {
  if (typeof window === "undefined") return 4;
  const width = window.innerWidth;
  if (width <= 600) return 1;
  if (width <= 770) return 2;
  if (width <= 1024) return 3;
  return 4;
};

export default getSlidesToShow