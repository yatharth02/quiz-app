import React, { Component, useEffect } from "react";
import useSound from "use-sound";

class Quiz extends Component {
  render() {
    return (
      <div className="mcq_rounds_quiz">
        <div className="mcq_rounds_question">
          {this.props.data["Questions"]}
        </div>
        <div className="buzzer_rounds_answers">
          <QuizDesign
            data={this.props.data}
            setNxtQues={this.props.setNxtQues}
            nxtQues={this.props.nxtQues}
            setTeamSelected={this.props.setTeamSelected}
            teamSelected={this.props.teamSelected}
          />
        </div>
      </div>
    );
  }
}

function QuizDesign(props) {
  var data = props.data;
  var setNxtQues = props.setNxtQues;
  var nxtQues = props.nxtQues;
  var setTeamSelected = props.setTeamSelected;
  var teamSelected = props.teamSelected;

  const [letsPlay] = useSound("mcq/play.mp3");
  const [correctAns] = useSound("mcq/correct.mp3");
  const [wrongAns] = useSound("mcq/wrong.mp3");

  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleTeams = (teamKey) => {
    if (teamKey === "Buzzer Confusion") {
      sessionStorage.setItem(
        "quesNum",
        parseInt(sessionStorage.getItem("quesNum")) + 1
      );
      window.location.reload();
    } else setTeamSelected(teamKey);
  };

  const handleAnswer = (ans) => {
    const isCorrect = ans === "RIGHT";
    setNxtQues(isCorrect ? "c" : "w");

    var score = 0;
    if (isCorrect) score = parseInt(data["Marks"]);
    else score = -parseInt(data["Negative Marking"]);

    var tNum = new Map(JSON.parse(sessionStorage.getItem("buzzerTotalScore")));
    tNum.set(teamSelected, parseInt(tNum.get(teamSelected)) + score);
    sessionStorage.setItem(
      "buzzerTotalScore",
      JSON.stringify(Array.from(tNum.entries()))
    );

    delay(500, () => {
      if (isCorrect) correctAns();
      else wrongAns();
    });
  };

  const teamOptionMap = {
    0: "A",
    1: "B",
    2: "C",
    3: "D",
    4: "E",
    5: "F",
    6: "G",
  };

  var teamMap = [
    "Team-1",
    "Team-2",
    "Team-3",
    "Team-4",
    "Team-5",
    "Team-6",
    "Buzzer Confusion",
  ];

  const optionMap = { 0: "A", 1: "B" };

  var answers = ["RIGHT", "WRONG"];

  return (
    <>
      {!teamSelected ? (
        teamMap.map((teamKey, index) => {
          return (
            <div
              disabled={nxtQues ? true : false}
              key={index}
              className="mcq_rounds_answer"
              onClick={() => handleTeams(teamKey)}
            >
              <span className="mcq_rounds_option">
                &#x2756; {teamOptionMap[index]}:{" "}
              </span>
              {teamKey}
            </div>
          );
        })
      ) : nxtQues ? (
        <div
          disabled={nxtQues ? true : false}
          className={
            nxtQues === "c"
              ? "mcq_rounds_answer correct"
              : "mcq_rounds_answer wrong"
          }
        >
          <span className="mcq_rounds_option">&#x2756;</span>
          {data["Answers"]}
        </div>
      ) : (
        answers.map((answer, index) => {
          return (
            <div
              disabled={nxtQues ? true : false}
              key={index}
              id={
                ["w", "t"].includes(nxtQues) && answer === "RIGHT"
                  ? "mcq_rounds_id"
                  : null
              }
              className="mcq_rounds_answer"
              onClick={() => handleAnswer(answer)}
            >
              <span className="mcq_rounds_option">
                &#x2756; {optionMap[index]}:{" "}
              </span>
              {answer}
            </div>
          );
        })
      )}
    </>
  );
}

export default Quiz;
