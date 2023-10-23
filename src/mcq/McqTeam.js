import React, { Component } from "react";
import { Link } from "react-router-dom";
import { readData } from "../Helper";
import "./McqTeam.css";

class McqTeam extends Component {
  renderPosts = async (teamNum) => {
    var res = await readData("Team-" + teamNum, "MCQ Round");
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

    if (!sessionStorage.getItem("mcqTotalScore")) {
      sessionStorage.setItem(
        "mcqTotalScore",
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
      <div className="mcq_body">
        <div className="mcq_wrapper">
          <img className="mcq_img" src="mcq/minion.jfif" alt="minion" />
          <Link
            className="mcq_link"
            to="/mcq_round"
            onClick={() => {
              this.setQuesNum();
            }}
          >
            टीम {teamNum} राउंड शुरू करे
          </Link>
          <div id="mcq_left-door" className="mcq_door">
            <div className="mcq_shape"></div>
            <div className="mcq_shape"></div>
            <div id="mcq_left-knob" className="mcq_knob"></div>
          </div>
          <div id="mcq_right-door" className="mcq_door">
            <div className="mcq_shape"></div>
            <div className="mcq_shape"></div>
            <div id="mcq_right-knob" className="mcq_knob"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default McqTeam;
