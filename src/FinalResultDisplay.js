import React, { Component } from "react";
import { combineMaps } from "./Helper";
import "./FinalResultDisplay.css";

class FinalResultDisplay extends Component {
  render() {
    var buzzerTotalScoreMap = new Map(
      JSON.parse(sessionStorage.getItem("buzzerTotalScore"))
    );
    var extemporeTotalScoreMap = new Map(
      JSON.parse(sessionStorage.getItem("extemporeTotalScore"))
    );
    var mcqTotalScoreMap = new Map(
      JSON.parse(sessionStorage.getItem("mcqTotalScore"))
    );
    var rapidTotalScoreMap = new Map(
      JSON.parse(sessionStorage.getItem("rapidTotalScore"))
    );
    var videoTotalScoreMap = new Map(
      JSON.parse(sessionStorage.getItem("videoTotalScore"))
    );
    var visualTotalScoreMap = new Map(
      JSON.parse(sessionStorage.getItem("visualTotalScore"))
    );
    var finaTotalScoreMap = combineMaps(
      buzzerTotalScoreMap,
      extemporeTotalScoreMap,
      mcqTotalScoreMap,
      rapidTotalScoreMap,
      videoTotalScoreMap,
      visualTotalScoreMap
    );
    return (
      <div className="result_body">
        <>
          <table className="result_team-container">
            <tr>
              <td className="result_team result_winner">
                <p style={{ color: "White" }}>Team A</p>
                <p style={{ color: "rgb(245, 243, 117)" }}>
                  Score: {finaTotalScoreMap[0][1]}
                </p>
              </td>
              <td className="result_team">
                <p>2nd Place</p>
                <p>Team B</p>
                <p>Score: {finaTotalScoreMap[1][1]}</p>
                <p>Result: Runner-Up</p>
              </td>
              <td className="result_team">
                <p>3rd Place</p>
                <p>Team C</p>
                <p>Score: {finaTotalScoreMap[2][1]}</p>
                <p>Result: 3rd Place</p>
              </td>
            </tr>
            <tr>
              <td className="result_team">
                <p>4th Place</p>
                <p>Team D</p>
                <p>Score: {finaTotalScoreMap[3][1]}</p>
                <p>Result: Participant</p>
              </td>
              <td className="result_team">
                <p>5th Place</p>
                <p>Team E</p>
                <p>Score: {finaTotalScoreMap[4][1]}</p>
                <p>Result: Participant</p>
              </td>
              <td className="result_team">
                <p>6th Place</p>
                <p>Team F</p>
                <p>Score: {finaTotalScoreMap[5][1]}</p>
                <p>Result: Participant</p>
              </td>
            </tr>
          </table>
        </>
      </div>
    );
  }
}

export default FinalResultDisplay;
