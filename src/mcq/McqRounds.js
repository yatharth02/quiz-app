import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import Quiz from "./McqQuiz";
import Timer from "./McqTimer";
import { shuffleArrayToString } from "../Helper";
import "./McqRounds.css";

class McqRounds extends Component {
  render() {
    var quesNum = sessionStorage.getItem("quesNum");

    if (JSON.parse(sessionStorage.getItem("data"))) {
      var totalData = JSON.parse(sessionStorage.getItem("data"));
      var data =
        parseInt(quesNum) === 6
          ? {}
          : totalData.filter((data) => data["Q.No."] === "Q" + quesNum)[0];

      sessionStorage.setItem(
        "answers",
        shuffleArrayToString([
          data["Choice-1(Correct Ans)"],
          data["Choice-2"],
          data["Choice-3"],
          data["Choice-4"],
        ])
      );
      if (parseInt(quesNum) === 1) sessionStorage.setItem("score", 0);

      return (
        <QuizDetails quesNum={quesNum} data={data} totalData={totalData} />
      );
    } else {
      window.location.replace("/mcq");
    }
  }
}

function QuizDetails(props) {
  var quesNum = props.quesNum;
  var data = props.data;
  var totalData = props.totalData;
  var teamNum = parseInt(sessionStorage.getItem("teamNum"));

  var [nxtQues, setNxtQues] = useState("");

  var totalScoreMap = new Map(
    JSON.parse(sessionStorage.getItem("mcqTotalScore"))
  );

  return (
    <div className="mcq_rounds_main">
      {parseInt(quesNum) === 6 ? (
        teamNum === 6 ? (
          <div className="mcq_rounds_table_div">
            <table className="mcq_rounds_table">
              <caption className="mcq_rounds_caption">
                बहुविकल्पीय राउण्ड स्कोर
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
              राउंड 2 के लिए जाएं
            </Link>
          </div>
        ) : (
          <>
            <div className="mcq_rounds_final">
              Total score {sessionStorage.getItem("score")} out of&nbsp;
              {totalData.map((val) => val.Marks).reduce((a, b) => a + b, 0)}
            </div>
            <Link
              className="mcq_rounds_link final"
              to="/mcq"
              onClick={() => postRoundCleanup(false)}
            >
              टीम-{teamNum + 1} के लिए जाएं
            </Link>
          </>
        )
      ) : (
        <>
          <div className="mcq_rounds_top">
            <Timer
              time={data["TimeLimit(in sec)"]}
              setNxtQues={setNxtQues}
              nxtQues={nxtQues}
            />
          </div>
          {parseInt(quesNum) === 4 ? (
            <div className="mcq_rounds_q4">
              <img
                className="mcq_rounds_q4_img"
                src={"inputQuiz" + data["Picture"].split("inputQuiz")[1]}
              />
            </div>
          ) : null}
          <div className="mcq_rounds_bottom">
            <Quiz data={data} setNxtQues={setNxtQues} nxtQues={nxtQues} />
          </div>

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
              {parseInt(quesNum) === 5 ? (
                <>
                  <Link
                    className="mcq_rounds_link score"
                    onClick={() => {
                      var tNum = new Map(
                        JSON.parse(sessionStorage.getItem("mcqTotalScore"))
                      );
                      tNum.set(
                        "Team-" + teamNum,
                        sessionStorage.getItem("score")
                      );
                      sessionStorage.setItem(
                        "mcqTotalScore",
                        JSON.stringify(Array.from(tNum.entries()))
                      );
                      sessionStorage.setItem("quesNum", parseInt(quesNum) + 1);
                      window.location.reload();
                    }}
                  >
                    चेक स्कोर
                  </Link>
                </>
              ) : (
                <Link
                  className="mcq_rounds_link"
                  onClick={() => {
                    sessionStorage.setItem("quesNum", parseInt(quesNum) + 1);
                    window.location.reload();
                  }}
                >
                  अगला सवाल
                </Link>
              )}
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
    sessionStorage.setItem("roundClear_1", true);
  }
  sessionStorage.removeItem("score");
  sessionStorage.removeItem("data");
  sessionStorage.removeItem("answers");
}

export default McqRounds;
