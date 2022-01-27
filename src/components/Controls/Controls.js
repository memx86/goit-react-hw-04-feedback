import PropTypes from "prop-types";
import s from "./Controls.module.css";

function Controls({ options, onClick }) {
  return (
    <div className={s.controls}>
      {options.map((option) => (
        <button
          className={s.button}
          type="button"
          onClick={onClick}
          key={option}
          data-value={option}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
Controls.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Controls;
