export const renderStars = (rating, darkMode, isSelectable) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    let starColor = "#D9D9D9";
    let curosr = isSelectable ? "pointer" : "default";

    if (i <= rating) {
      starColor = "#688BFF";
    } else if (i - 0.5 === rating) {
      starColor = "#688BFF";
      stars.push(
        <i
          key={`half-${i}`}
          className={`fa-solid fa-star-half-alt mr-2 ${
            darkMode ? "dark-text-white" : ""
          }`}
          style={{
            color: "#688BFF",
            fontSize: "18px",
            cursor: curosr,
          }}
        ></i>
      );
      continue;
    }

    stars.push(
      <i
        key={i}
        className={`fa-solid fa-star mr-2 ${darkMode ? "dark-text-white" : ""}`}
        style={{
          color: starColor,
          fontSize: "18px",
          cursor: curosr,
        }}
      ></i>
    );
  }
  return stars;
};
