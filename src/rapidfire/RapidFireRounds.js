import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import Quiz from "./RapidFireQuiz";
import RapidTimer from "./RapidTimer";
import { getTeamName } from "../Helper";

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

function ShowAnswers(props) {
  var data = props.data;
  var setShowAns = props.setShowAns;
  var teamNum = props.teamNum;

  return (
    <>
      <div className="mcq_rounds_show_ans">
        <table>
          <thead>
            <tr>
              <th>Question</th>
              <th>Answer</th>
            </tr>
          </thead>
          <tbody>
            {data.map((val, index) => {
              return (
                <tr key={index}>
                  {/* className={getClassName(index)}> */}
                  <td>{val["Questions"]}</td>
                  <td>{val["Answers"]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Link
        className="mcq_rounds_show_ans_link final"
        onClick={() => setShowAns(false)}
      >
        टीम:{getTeamName(teamNum)} परिणाम दिखाओ
      </Link>
    </>
  );
}

function getClassName(idx) {
  let rightAns = JSON.parse(sessionStorage.getItem("rightAns"));
  let wrongAns = JSON.parse(sessionStorage.getItem("wrongAns"));
  let skipAns = JSON.parse(sessionStorage.getItem("skipAns"));

  console.log("idx", idx);
  console.log("rightAns", rightAns[0]);
  console.log("wrongAns", wrongAns[0]);
  console.log("skipAns", skipAns[0]);

  if (idx in rightAns) {
    return "mcq_rounds_show_ans_right";
  } else if (idx in wrongAns) {
    return "mcq_rounds_show_ans_wrong";
  } else if (idx in skipAns) {
    return "mcq_rounds_show_ans_skip";
  } else {
    return "mcq_rounds_show_ans_no";
  }
}

function QuizDetails(props) {
  var data = props.data;
  var teamNum = parseInt(sessionStorage.getItem("teamNum"));

  var [timer, setTimer] = useState("");
  var [quesNum, setQuesNum] = useState(1);
  var [finalSocre, setFinalScore] = useState(false);
  var [showAns, setShowAns] = useState(true);

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
                  <td>टीम:A-1</td>
                  <td>{totalScoreMap.get("Team-1")}</td>
                </tr>
                <tr>
                  <td>टीम:B-2</td>
                  <td>{totalScoreMap.get("Team-2")}</td>
                </tr>
                <tr>
                  <td>टीम:C-3</td>
                  <td>{totalScoreMap.get("Team-3")}</td>
                </tr>
                <tr>
                  <td>टीम:D-4</td>
                  <td>{totalScoreMap.get("Team-4")}</td>
                </tr>
                <tr>
                  <td>टीम:E-5</td>
                  <td>{totalScoreMap.get("Team-5")}</td>
                </tr>
                <tr>
                  <td>टीम:F-6</td>
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
        ) : showAns ? (
          <ShowAnswers data={data} setShowAns={setShowAns} teamNum={teamNum} />
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
              टीम:{getTeamName(teamNum + 1)} के लिए जाएं
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
  sessionStorage.removeItem("rightAns");
  sessionStorage.removeItem("wrongAns");
  sessionStorage.removeItem("skipAns");
}

export default RapidFireRounds;
