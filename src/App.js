import { Fragment, useState } from "react";
import Section from "components/Section";
import Controls from "components/Controls";
import Statistics from "components/Statistics";
import Notification from "components/Notification";

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const changeState = (e) => {
    const key = e.target.dataset.value;
    switch (key) {
      case "good":
        setGood(good + 1);
        return;
      case "neutral":
        setNeutral(neutral + 1);
        return;
      case "bad":
        setBad(bad + 1);
        return;
      default:
        return;
    }
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
      (total, item) => (item.label === "good" ? (total += item.count) : total),
      0
    );
    return total > 0 ? String(Math.round((totalGood / total) * 100)) + "%" : "";
  };

  const stats = [
    {
      label: "good",
      count: good,
    },
    {
      label: "neutral",
      count: neutral,
    },
    {
      label: "bad",
      count: bad,
    },
  ];
  const extendedStats = makeExtendedStats(stats);
  return (
    <Fragment>
      <h1>Please leave feedback</h1>
      <Section>
        <Controls options={["good", "neutral", "bad"]} onClick={changeState} />
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
