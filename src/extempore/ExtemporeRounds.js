import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import Timer from "../mcq/McqTimer";
import PicTimer from "../PicTimer";
import { randomItem } from "../Helper";
import useSound from "use-sound";

class ExtemporeRounds extends Component {
  render() {
    var quesNum = sessionStorage.getItem("quesNum");

    if (JSON.parse(sessionStorage.getItem("data"))) {
      var totalData = JSON.parse(sessionStorage.getItem("data"));
      var tempTotalData = JSON.parse(sessionStorage.getItem("tempTotalData"));

      totalData = tempTotalData
        ? totalData.filter((val) => !(val in tempTotalData))
        : totalData;

      var data = randomItem(totalData);

      if (parseInt(quesNum) === 1) sessionStorage.setItem("score", 0);

      return <QuizDetails quesNum={quesNum} data={data} />;
    } else {
      window.location.replace("/extempore");
    }
  }
}

function QuizDetails(props) {
  var quesNum = props.quesNum;
  var data = props.data;
  var teamNum = parseInt(sessionStorage.getItem("teamNum"));

  var [nxtQues, setNxtQues] = useState("");
  var [nxtPic, setNxtPic] = useState("");

  var totalScoreMap = new Map(
    JSON.parse(sessionStorage.getItem("extemporeTotalScore"))
  );

  const [letsPlay] = useSound("mcq/play.mp3");

  return (
    <div className="mcq_rounds_main">
      {parseInt(quesNum) === 2 ? (
        teamNum === 6 ? (
          <div className="mcq_rounds_table_div">
            <table className="mcq_rounds_table">
              <caption className="mcq_rounds_caption">
                एक्सटेम्पोर राउण्ड स्कोर
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
              राउंड 4 के लिए जाएं
            </Link>
          </div>
        ) : (
          <>
            <div className="mcq_rounds_final">
              Total score {sessionStorage.getItem("score")} out of&nbsp;
              {data.Marks}
            </div>
            <Link
              className="mcq_rounds_link final"
              to="/extempore"
              onClick={() => postRoundCleanup(false)}
            >
              टीम-{teamNum + 1} के लिए जाएं
            </Link>
          </>
        )
      ) : (
        <>
          <div className="mcq_rounds_quiz">
            <div className="mcq_rounds_question">
              <label>{data["Choice-1"]}</label>
              &emsp;&emsp;&emsp;&emsp;अथवा&emsp;&emsp;&emsp;&emsp;
              <label>{data["Choice-2"]}</label>
            </div>
          </div>

          {nxtPic !== "True" ? (
            <div className="mcq_rounds_quiz">
              {letsPlay()}
              <div className="mcq_rounds_top">
                <PicTimer time={data["Thinking"]} setNxtPic={setNxtPic} />
              </div>
            </div>
          ) : null}

          {nxtPic === "True" ? (
            <>
              <div className="mcq_rounds_top">
                <Timer
                  time={data["TimeLimit(in sec)"]}
                  setNxtQues={setNxtQues}
                  nxtQues={nxtQues}
                />
              </div>
              <div className="mcq_rounds_quiz">
                <div className="extempore_bottom">
                  <button
                    className="extempore_btn"
                    onClick={() =>
                      provideScore(quesNum, setNxtQues, data, teamNum)
                    }
                  >
                    Provide Score
                  </button>
                </div>
              </div>
            </>
          ) : null}

          {nxtQues ? (
            <div className="mcq_rounds_gif">
              <img src="mcq\dance-emoji.gif" />
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}

function provideScore(quesNum, setNxtQues, data, teamNum) {
  setNxtQues("c");
  sessionStorage.setItem("quesNum", parseInt(quesNum) + 1);

  var tempTotalData = JSON.parse(sessionStorage.getItem("tempTotalData"));

  if (tempTotalData) {
    tempTotalData.push(data);
  } else {
    tempTotalData = [data];
  }
  sessionStorage.setItem("tempTotalData", JSON.stringify(tempTotalData));

  var value = prompt("Please enter score out of 10");
  sessionStorage.setItem("score", parseInt(value));

  var tNum = new Map(JSON.parse(sessionStorage.getItem("extemporeTotalScore")));
  tNum.set("Team-" + teamNum, sessionStorage.getItem("score"));
  sessionStorage.setItem(
    "extemporeTotalScore",
    JSON.stringify(Array.from(tNum.entries()))
  );

  window.location.reload();
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
    sessionStorage.removeItem("tempTotalData");
    sessionStorage.setItem("roundClear_3", true);
  }
  sessionStorage.removeItem("score");
  sessionStorage.removeItem("data");
  sessionStorage.removeItem("answers");
}

export default ExtemporeRounds;
