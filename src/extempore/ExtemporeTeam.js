import React, { Component } from "react";
import { Link } from "react-router-dom";
import { readData } from "../Helper";
import "./ExtemporeTeam.css";

class ExtemporeTeam extends Component {
  renderPosts = async () => {
    var res = await readData(null, "Extempore Round");
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
    this.renderPosts();

    if (!sessionStorage.getItem("extemporeTotalScore")) {
      sessionStorage.setItem(
        "extemporeTotalScore",
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
      <div className="extempore_body">
        <div className="extempore_container">
          <img
            className="extempore_img"
            src="extempore/minion.jpg"
            alt="minion"
          />
          <div className="extempore_curtains">
            <Link
              className="extempore_link"
              to="/extempore_round"
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

export default ExtemporeTeam;
