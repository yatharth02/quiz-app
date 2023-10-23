import React, { Component } from "react";
import { Link } from "react-router-dom";
import { readData } from "../Helper";
import "./VisualTeam.css";

class VisualTeam extends Component {
  renderPosts = async (teamNum) => {
    var res = await readData("Team-" + teamNum, "Visual Round");
    sessionStorage.setItem("data", JSON.stringify(res));
  };

  setQuesNum() {
    var quesNum = sessionStorage.getItem("quesNum")
      ? sessionStorage.getItem("quesNum")
      : 1;
    sessionStorage.setItem("quesNum", quesNum);
  }

  render() {
    var teamNum = sessionStorage.getItem("teamNum");
    this.renderPosts(teamNum);

    if (!sessionStorage.getItem("visualTotalScore")) {
      sessionStorage.setItem(
        "visualTotalScore",
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
      <div className="visual_body">
        <div className="visual_container">
          <img
            className="visual_img"
            src="visual/visual_minion.jpg"
            alt="minion"
          />
          <div className="visual_curtains">
            <Link
              className="visual_link"
              to="/visual_round"
              onClick={() => {
                this.setQuesNum();
              }}
            >
              टीम {teamNum} राउंड शुरू करे
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default VisualTeam;
