import { Component, Fragment } from "react";
import Section from "components/Section";
import Controls from "components/Controls";
import Statistics from "components/Statistics";
import Notification from "components/Notification";

class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  changeState = (e) =>
    this.setState((prevState) => {
      return {
        ...prevState,
        [e.target.dataset.value]: prevState[e.target.dataset.value] + 1,
      };
    });

  makeExtendedStats = (stats) => {
    const total = this.countTotalFeedback(stats);
    const percentGood = this.countPositiveFeedbackPercentage(stats, total);
    return [
      ...stats,
      { label: "Total", count: total },
      { label: "Positive feedback", count: percentGood },
    ];
  };

  countTotalFeedback = (stats) => {
    return stats.reduce((total, item) => (total += item.count), 0);
  };

  countPositiveFeedbackPercentage = (stats, total) => {
    const totalGood = stats.reduce(
      (total, item) => (item.label === "good" ? (total += item.count) : total),
      0
    );
    return total > 0 ? String(Math.round((totalGood / total) * 100)) + "%" : "";
  };

  render() {
    const { good, neutral, bad } = this.state;
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
    const extendedStats = this.makeExtendedStats(stats);
    return (
      <Fragment>
        <h1>Please leave feedback</h1>
        <Section>
          <Controls
            options={["good", "neutral", "bad"]}
            onClick={this.changeState}
          />
        </Section>
        {this.countTotalFeedback(stats) ? (
          <Section type="statistics" title="Statistics">
            <Statistics stats={extendedStats} />
          </Section>
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Fragment>
    );
  }
}
export default App;
