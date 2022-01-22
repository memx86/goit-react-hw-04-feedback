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

export default Controls;
