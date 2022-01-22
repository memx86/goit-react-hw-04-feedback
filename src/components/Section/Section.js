import PropTypes from "prop-types";
import s from "./Section.module.css";

function Section({ type = "section", title, children }) {
  return (
    <section className={s[type]}>
      {title ? <h2 className={s.title}>{title}</h2> : ""}
      {children}
    </section>
  );
}

Section.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Section;
