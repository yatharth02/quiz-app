import React, { Component } from "react";
import { Link } from "react-router-dom";
import { readData } from "../Helper";
import "./BuzzerTeam.css";

class BuzzerTeam extends Component {
  renderPosts = async () => {
    var res = await readData(null, "Buzzer Round");
    sessionStorage.setItem("data", JSON.stringify(res));
  };

  setQuesNum() {
    var quesNum = sessionStorage.getItem("quesNum")
      ? sessionStorage.getItem("quesNum")
      : 1;
    sessionStorage.setItem("quesNum", quesNum);

    var totalQues = sessionStorage.getItem("totalQues")
      ? sessionStorage.getItem("totalQues")
      : 0;
    sessionStorage.setItem("totalQues", totalQues);
  }

  render() {
    this.renderPosts();

    if (!sessionStorage.getItem("buzzerTotalScore")) {
      sessionStorage.setItem(
        "buzzerTotalScore",
        JSON.stringify(
          Array.from(
            new Map([
              ["Team-1", 0],
              ["Team-2", 0],
              ["Team-3", 0],
              ["Team-4", 0],
              ["Team-5", 0],
              ["Team-6", 0],
            ]).entries()
          )
        )
      );
    }

    return (
      <div className="buzzer_cont">
        <Link
          className="buzzer_link"
          to="/buzzer_round"
          onClick={() => {
            this.setQuesNum();
          }}
        >
          बजर राउंड शुरू करे
        </Link>
      </div>
    );
  }
}

export default BuzzerTeam;
