import { Fragment, useState } from "react";
import Section from "components/Section";
import Controls from "components/Controls";
import Statistics from "components/Statistics";
import Notification from "components/Notification";

const LABELS = {
  GOOD: "good",
  NEUTRAL: "neutral",
  BAD: "bad",
};
const TYPE = {
  SETSTATE: "setState",
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleSwitch = (key, type) => {
    const set = type === TYPE.SETSTATE;
    switch (key) {
      case LABELS.GOOD:
        set && setGood(good + 1);
        return good;
      case LABELS.NEUTRAL:
        set && setNeutral(neutral + 1);
        return neutral;
      case LABELS.BAD:
        set && setBad(bad + 1);
        return bad;
      default:
        return;
    }
  };

  const changeState = (e) => {
    const key = e.target.dataset.value;
    handleSwitch(key, TYPE.SETSTATE);
  };

  const makeExtendedStats = (stats) => {
    const total = countTotalFeedback(stats);
    const percentGood = countPositiveFeedbackPercentage(stats, total);
    return [
      ...stats,
      { label: "Total", count: total },
      { label: "Positive feedback", count: percentGood },
    ];
  };

  const countTotalFeedback = (stats) => {
    return stats.reduce((total, item) => (total += item.count), 0);
  };

  const countPositiveFeedbackPercentage = (stats, total) => {
    const totalGood = stats.reduce(
      (total, item) =>
        item.label === LABELS.GOOD ? (total += item.count) : total,
      0
    );
    return total > 0 ? String(Math.round((totalGood / total) * 100)) + "%" : "";
  };

  const stats = Object.values(LABELS).map((item) => {
    const count = handleSwitch(item);
    return { label: item, count };
  });

  const extendedStats = makeExtendedStats(stats);

  return (
    <Fragment>
      <h1>Please leave feedback</h1>
      <Section>
        <Controls options={Object.values(LABELS)} onClick={changeState} />
      </Section>
      {countTotalFeedback(stats) ? (
        <Section type="statistics" title="Statistics">
          <Statistics stats={extendedStats} />
        </Section>
      ) : (
        <Notification message="There is no feedback" />
      )}
    </Fragment>
  );
}

export default App;
