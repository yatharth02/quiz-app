import React, { Component, useEffect, useState } from "react";

import useSound from "use-sound";

class Quiz extends Component {
  render() {
    return (
      <div className="mcq_rounds_quiz">
        <div className="mcq_rounds_question">
          {this.props.data["Questions"]}
        </div>
        <div className="mcq_rounds_answers">
          <QuizDesign
            data={this.props.data}
            setNxtQues={this.props.setNxtQues}
            nxtQues={this.props.nxtQues}
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

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [ansClassName, setAnsClassName] = useState("mcq_rounds_answer");

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

  const handleAnswer = (ans) => {
    const isCorrect = String(ans) === String(data["Choice-1(Correct Ans)"]);
    setNxtQues(isCorrect ? "c" : "w");

    if (isCorrect)
      sessionStorage.setItem(
        "score",
        parseInt(sessionStorage.getItem("score")) + data["Marks"]
      );

    setSelectedAnswer(ans);
    setAnsClassName("mcq_rounds_answer active");

    delay(1000, () =>
      setAnsClassName(
        isCorrect ? "mcq_rounds_answer correct" : "mcq_rounds_answer wrong"
      )
    );

    delay(500, () => {
      if (isCorrect) correctAns();
      else wrongAns();
    });
  };

  const optionMap = { 0: "A", 1: "B", 2: "C", 3: "D" };

  var answers = sessionStorage.getItem("answers").split("&$&");

  return (
    <>
      {answers.map((answer, index) => {
        return (
          <div
            disabled={nxtQues ? true : false}
            key={index}
            id={
              ["w", "t"].includes(nxtQues) &&
              answer === data["Choice-1(Correct Ans)"]
                ? "mcq_rounds_id"
                : null
            }
            className={
              selectedAnswer === answer ? ansClassName : "mcq_rounds_answer"
            }
            onClick={() => handleAnswer(answer)}
          >
            <span className="mcq_rounds_option">
              &#x2756; {optionMap[index]}:{" "}
            </span>
            {answer}
          </div>
        );
      })}
    </>
  );
}

export default Quiz;
