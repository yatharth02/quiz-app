import React, { Component } from "react";
import { Link } from "react-router-dom";
import { readData } from "../Helper";
import "./RapidFireTeam.css";

class RapidFireTeam extends Component {
  renderPosts = async (teamNum) => {
    var res = await readData("Team-" + teamNum, "RapidFire Round");
    sessionStorage.setItem("data", JSON.stringify(res));
  };

  setScore() {
    sessionStorage.setItem("score", 0);
  }

  render() {
    var teamNum = sessionStorage.getItem("teamNum");
    this.renderPosts(teamNum);

    if (!sessionStorage.getItem("rapidTotalScore")) {
      sessionStorage.setItem(
        "rapidTotalScore",
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
      <div className="rapid_cont">
        <video
          className="rapid_video"
          src="rapidfire/fire.mp4"
          autoPlay
          muted
          loop
        />
        <div className="rapid_text">
          <span>टीम</span>
          <span>
            <Link
              className="rapid_link"
              to="/rapid_round"
              onClick={() => {
                this.setScore();
              }}
            >
              {teamNum}
            </Link>
          </span>
          <span>राउंड</span>
          <span>शुरू</span>
          <span>करे</span>
        </div>
      </div>
    );
  }
}

export default RapidFireTeam;
