import React, { Component } from "react";
import { Link } from "react-router-dom";
import { readData } from "../Helper";
import "./VideoTeam.css";

class VideoTeam extends Component {
  renderPosts = async (teamNum) => {
    var res = await readData("Team-" + teamNum, "Video Round");
    sessionStorage.setItem("data", JSON.stringify(res));
  };

  setQuesNum() {
    var quesNum = sessionStorage.getItem("quesNum")
      ? sessionStorage.getItem("quesNum")
      : 1;
    sessionStorage.setItem("quesNum", quesNum);
  }

  render() {
    const imgRef = React.createRef(null);
    const leftEyeRef = React.createRef(null);
    const rightEyeRef = React.createRef(null);

    var teamNum = sessionStorage.getItem("teamNum");
    this.renderPosts(teamNum);

    if (!sessionStorage.getItem("videoTotalScore")) {
      sessionStorage.setItem(
        "videoTotalScore",
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
      <div
        className="video_body"
        onMouseMove={(e) => mouseMove(e, imgRef, leftEyeRef, rightEyeRef)}
      >
        <div className="video_container">
          <img
            className="video_img"
            src="video/minion.png"
            alt="minion"
            ref={imgRef}
          />
          <img
            className="video_eye"
            src="video/eye.png"
            style={{ bottom: "419px", right: "-262px" }}
            alt="eye_left"
            ref={leftEyeRef}
          />
          <img
            className="video_eye"
            src="video/eye.png"
            style={{ bottom: "419px", right: "-286px" }}
            alt="eye_right"
            ref={rightEyeRef}
          />
          <Link
            className="video_link"
            to="/video_round"
            onClick={() => {
              this.setQuesNum();
            }}
          >
            टीम {teamNum} राउंड शुरू करे
          </Link>
        </div>
      </div>
    );
  }
}

function mouseMove(e, imgRef, leftEyeRef, rightEyeRef) {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  const anchor = imgRef.current;
  const rekt = anchor.getBoundingClientRect();
  const anchorX = rekt.left + rekt.width / 2;
  const anchorY = rekt.top + rekt.height / 2;

  const angleDeg = angle(mouseX, mouseY, anchorX, anchorY);

  const eyes = [leftEyeRef.current, rightEyeRef.current];
  eyes.forEach((eye) => {
    eye.style.transform = `rotate(${90 + angleDeg}deg)`;
  });
}

function angle(cx, cy, ex, ey) {
  const dy = ey - cy;
  const dx = ex - cx;
  const rad = Math.atan2(dy, dx);
  const deg = (rad * 180) / Math.PI;
  return deg;
}

export default VideoTeam;
