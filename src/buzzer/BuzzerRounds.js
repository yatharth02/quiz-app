import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import Timer from "../mcq/McqTimer";
import Quiz from "./BuzzerQuiz";

class BuzzerRounds extends Component {
  render() {
    var quesNum = sessionStorage.getItem("quesNum");

    if (JSON.parse(sessionStorage.getItem("data"))) {
      var totalData = JSON.parse(sessionStorage.getItem("data"));
      var data =
        parseInt(quesNum) === 16
          ? {}
          : totalData.filter((data) => data["Q.No."] === "Q" + quesNum)[0];

      return <QuizDetails quesNum={quesNum} data={data} />;
    } else {
      window.location.replace("/buzzer");
    }
  }
}

function QuizDetails(props) {
  var quesNum = props.quesNum;
  var data = props.data;

  var totalQues = sessionStorage.getItem("totalQues");

  var [nxtQues, setNxtQues] = useState("");
  var [askQues, setAskQues] = useState("False");
  var [teamSelected, setTeamSelected] = useState("");

  var totalScoreMap = new Map(
    JSON.parse(sessionStorage.getItem("buzzerTotalScore"))
  );

  return (
    <div className="mcq_rounds_main">
      {parseInt(totalQues) === 10 ? (
        <div className="mcq_rounds_table_div">
          <table className="mcq_rounds_table">
            <caption className="mcq_rounds_caption">बजर राउण्ड स्कोर</caption>
            <thead className="mcq_rounds_thead">
              <tr>
                <th>टीम</th>
                <th>स्कोर</th>
              </tr>
            </thead>
            <tbody className="mcq_rounds_tbody">
              <tr>
                <td>टीम-1</td>
                <td>{totalScoreMap.get("Team-1")}</td>
              </tr>
              <tr>
                <td>टीम-2</td>
                <td>{totalScoreMap.get("Team-2")}</td>
              </tr>
              <tr>
                <td>टीम-3</td>
                <td>{totalScoreMap.get("Team-3")}</td>
              </tr>
              <tr>
                <td>टीम-4</td>
                <td>{totalScoreMap.get("Team-4")}</td>
              </tr>
              <tr>
                <td>टीम-5</td>
                <td>{totalScoreMap.get("Team-5")}</td>
              </tr>
              <tr>
                <td>टीम-6</td>
                <td>{totalScoreMap.get("Team-6")}</td>
              </tr>
            </tbody>
          </table>
          <Link
            className="mcq_rounds_link table"
            to="/flip_book"
            onClick={() => postRoundCleanup(true)}
          >
            उत्तराखंड प्रश्नोत्तरी संपन्न
          </Link>
        </div>
      ) : (
        <>
          {askQues === "False" ? (
            <div className="mcq_rounds_top">
              <Link
                className="buzzer_link"
                onClick={() => {
                  setAskQues("True");
                }}
              >
                प्रश्न पूछो
              </Link>
            </div>
          ) : null}

          {askQues === "True" ? (
            <>
              <div className="buzzer_rounds_top">
                {teamSelected ? (
                  <Timer
                    time={data["TimeLimit(in sec)"]}
                    setNxtQues={setNxtQues}
                    nxtQues={nxtQues}
                  />
                ) : null}
              </div>
              <div className="mcq_rounds_bottom">
                <Quiz
                  data={data}
                  setNxtQues={setNxtQues}
                  nxtQues={nxtQues}
                  teamSelected={teamSelected}
                  setTeamSelected={setTeamSelected}
                />
              </div>
            </>
          ) : null}

          {nxtQues ? (
            <>
              <div className="mcq_rounds_gif">
                {nxtQues === "c" ? (
                  <img src="mcq\dance-emoji.gif" />
                ) : nxtQues === "w" ? (
                  <img src="mcq\crying-emoji.gif" />
                ) : (
                  <img src="mcq\hourglass-done.gif" />
                )}
              </div>
              <Link
                className="mcq_rounds_link"
                onClick={() => {
                  sessionStorage.setItem("quesNum", parseInt(quesNum) + 1);
                  sessionStorage.setItem("totalQues", parseInt(totalQues) + 1);
                  window.location.reload();
                }}
              >
                अगला सवाल
              </Link>
            </>
          ) : null}
        </>
      )}
    </div>
  );
}

function postRoundCleanup(isOver) {
  sessionStorage.removeItem("quesNum");
  if (!isOver) {
    sessionStorage.setItem(
      "teamNum",
      parseInt(sessionStorage.getItem("teamNum")) + 1
    );
  } else {
    sessionStorage.removeItem("teamNum");
    // sessionStorage.removeItem("totalScore");
    sessionStorage.setItem("roundClear_6", true);
  }
  sessionStorage.removeItem("score");
  sessionStorage.removeItem("data");
  sessionStorage.removeItem("answers");
}

export default BuzzerRounds;
