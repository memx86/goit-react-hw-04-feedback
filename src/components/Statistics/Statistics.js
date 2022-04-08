import { Fragment } from "react";
import PropTypes from "prop-types";
import s from "./Statistics.module.css";

function Statistics({ stats }) {
  return (
    <Fragment>
      <ul className={s.list}>
        {stats.map((item) => (
          <li
            className={s[item.label] ? s[item.label] : s.item}
            key={item.label}
          >
            <span className={s.label}>{item.label}</span>
            <span className={s.count}>{item.count}</span>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}
Statistics.propTypes = {
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      count: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    })
  ).isRequired,
};
export default Statistics;
