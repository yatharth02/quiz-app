import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import Quiz from "./RapidFireQuiz";
import RapidTimer from "./RapidTimer";

class RapidFireRounds extends Component {
  render() {
    if (JSON.parse(sessionStorage.getItem("data"))) {
      var data = JSON.parse(sessionStorage.getItem("data"));

      return <QuizDetails data={data} />;
    } else {
      window.location.replace("/rapid");
    }
  }
}

function QuizDetails(props) {
  var data = props.data;
  var teamNum = parseInt(sessionStorage.getItem("teamNum"));

  var [timer, setTimer] = useState("");
  var [quesNum, setQuesNum] = useState(1);
  var [finalSocre, setFinalScore] = useState(false);

  var totalScoreMap = new Map(
    JSON.parse(sessionStorage.getItem("rapidTotalScore"))
  );

  return (
    <div className="mcq_rounds_main">
      {timer === "timeout" && finalSocre ? (
        teamNum === 6 ? (
          <div className="mcq_rounds_table_div">
            <table className="mcq_rounds_table">
              <caption className="mcq_rounds_caption">
                रैपिड फायर राउण्ड स्कोर
              </caption>
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
              राउंड 6 के लिए जाएं
            </Link>
          </div>
        ) : (
          <>
            <div className="mcq_rounds_final">
              Total score {sessionStorage.getItem("score")} out of&nbsp;
              {data.map((val) => val.Marks).reduce((a, b) => a + b, 0)}
            </div>
            <Link
              className="mcq_rounds_link final"
              to="/rapid"
              onClick={() => postRoundCleanup(false)}
            >
              टीम-{teamNum + 1} के लिए जाएं
            </Link>
          </>
        )
      ) : (
        <>
          {timer === "" ? (
            <>
              <div className="mcq_rounds_top">
                <RapidTimer
                  time={data[0]["TimeLimit(in sec)"]}
                  setTimer={setTimer}
                />
              </div>
              {quizLoop(quesNum, data, setQuesNum, timer, setTimer)}
            </>
          ) : null}

          {timer === "timeout" && !finalSocre
            ? scoreUpdation(setFinalScore, teamNum)
            : null}
        </>
      )}
    </div>
  );
}

function scoreUpdation(setFinalScore, teamNum) {
  var tNum = new Map(JSON.parse(sessionStorage.getItem("rapidTotalScore")));
  tNum.set("Team-" + teamNum, sessionStorage.getItem("score"));
  sessionStorage.setItem(
    "rapidTotalScore",
    JSON.stringify(Array.from(tNum.entries()))
  );
  setFinalScore(true);
}

function quizLoop(quesNum, data, setQuesNum, timer, setTimer) {
  while (quesNum <= data.length && timer === "") {
    return (
      <div className="mcq_rounds_bottom">
        <Quiz
          data={data[quesNum - 1]}
          setQuesNum={setQuesNum}
          quesNum={quesNum}
        />
      </div>
    );
  }
  if (quesNum > data.length) {
    setTimer("timeout");
  }
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
    sessionStorage.setItem("roundClear_5", true);
  }
  sessionStorage.removeItem("score");
  sessionStorage.removeItem("data");
  sessionStorage.removeItem("answers");
}

export default RapidFireRounds;
