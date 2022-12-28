import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import Quiz from "./Quiz";
import Timer from "./Timer";
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

  var [nxtQues, setNxtQues] = useState("");

  return (
    <div className="mcq_rounds_main">
      {parseInt(quesNum) === 6 ? (
        <>
          <div className="mcq_rounds_final">
            Total score {sessionStorage.getItem("score")}/
            {totalData.map((val) => val.Marks).reduce((a, b) => a + b, 0)}
          </div>
          <Link
            className="mcq_rounds_link final"
            to="/mcq"
            onClick={() => postRoundCleanup()}
          >
            टीम-{parseInt(sessionStorage.getItem("teamNum")) + 1} के लिए जाएं
          </Link>
        </>
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
                <Link
                  className="mcq_rounds_link score"
                  onClick={() => {
                    sessionStorage.setItem("quesNum", parseInt(quesNum) + 1);
                    window.location.reload();
                  }}
                >
                  चेक स्कोर
                </Link>
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

function postRoundCleanup() {
  sessionStorage.removeItem("quesNum");
  sessionStorage.setItem(
    "teamNum",
    parseInt(sessionStorage.getItem("teamNum")) + 1
  );
  sessionStorage.removeItem("score");
  sessionStorage.removeItem("data");
  sessionStorage.removeItem("answers");
}

export default McqRounds;
