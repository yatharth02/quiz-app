import React, { Component } from "react";

class Quiz extends Component {
  render() {
    var data = this.props.data;
    return (
      <div className="mcq_rounds_quiz">
        <div className="mcq_rounds_question">{data["Questions"]}</div>
        <div className="mcq_rounds_answers">
          <QuizDesign
            data={data}
            setQuesNum={this.props.setQuesNum}
            quesNum={this.props.quesNum}
          />
        </div>
      </div>
    );
  }
}

function QuizDesign(props) {
  var data = props.data;
  var setQuesNum = props.setQuesNum;
  var quesNum = props.quesNum;

  const handleAnswer = (ans) => {
    const isCorrect = ans === "RIGHT";

    if (isCorrect) {
      sessionStorage.setItem(
        "score",
        parseInt(sessionStorage.getItem("score")) + data["Marks"]
      );
    }
    setQuesNum(quesNum + 1);
  };

  const optionMap = { 0: "A", 1: "B", 2: "C" };

  var answers = ["RIGHT", "WRONG", "SKIP"];

  return (
    <>
      {answers.map((answer, index) => {
        return (
          <div
            key={index}
            className="mcq_rounds_answer"
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
