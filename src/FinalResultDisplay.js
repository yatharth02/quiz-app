import React, { Component } from "react";
import { Link } from "react-router-dom";
import { combineMaps } from "./Helper";

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
    return <div></div>;
  }
}

export default FinalResultDisplay;
