const Rating = ({ Rating, text }) => {
  const color = "#ffbf00";
  return (
    <div className="rating">
      <span>
        <i
          style={{ color: color }}
          className={Rating >= 1 ? "fas fa-star" : "far fa-star"}
        ></i>
      </span>
      <span>
        <i
          style={{ color: color }}
          className={Rating >= 2 ? "fas fa-star" : "far fa-star"}
        ></i>
      </span>
      <span>
        <i
          style={{ color: color }}
          className={Rating >= 3 ? "fas fa-star" : "far fa-star"}
        ></i>
      </span>
      <span>
        <i
          style={{ color: color }}
          className={Rating >= 4 ? "fas fa-star" : "far fa-star"}
        ></i>
      </span>
      <span>
        <i
          style={{ color: color }}
          className={Rating >= 5 ? "fas fa-star" : "far fa-star"}
        ></i>
      </span>

      <span>{`${typeof text !== "undefined" ? text : 0} reviews`}</span>
    </div>
  );
};
export default Rating;
