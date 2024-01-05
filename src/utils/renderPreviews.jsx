const renderPreviews = (
  previews,
  hoveredIndex,
  setHoveredIndex,
  handleRemove
) => {
  const maxPreviews = 3;
  const remainingPreviews = previews.length - maxPreviews;

  return previews
    .slice(0, maxPreviews)
    .map((preview, index) => (
      <div
        key={index}
        className="relative inline-block group min-w-fit"
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <img
          src={preview}
          alt={`Preview ${index}`}
          className="w-20 h-auto rounded-md"
        />
        {hoveredIndex === index && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-md">
            <button
              className="text-white text-2xl font-bold cursor-pointer"
              onClick={() => handleRemove(index)}
            >
              X
            </button>
          </div>
        )}
      </div>
    ))
    .concat(
      remainingPreviews > 0 && (
        <div
          key="placeholder"
          style={{ marginTop: "10px", fontSize: "20px", fontWeight: "bold" }}
        >
          +{remainingPreviews}
        </div>
      )
    );
};

export default renderPreviews;
