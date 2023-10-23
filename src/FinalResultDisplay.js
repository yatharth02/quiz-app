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
    var finaTotalScoreMap = combineMaps(
      buzzerTotalScoreMap,
      extemporeTotalScoreMap
    );
    var mcqTotalScoreMap = new Map(
      JSON.parse(sessionStorage.getItem("mcqTotalScore"))
    );
    var finaTotalScoreMap = combineMaps(finaTotalScoreMap, mcqTotalScoreMap);
    var rapidTotalScoreMap = new Map(
      JSON.parse(sessionStorage.getItem("rapidTotalScore"))
    );
    var finaTotalScoreMap = combineMaps(finaTotalScoreMap, rapidTotalScoreMap);
    var videoTotalScoreMap = new Map(
      JSON.parse(sessionStorage.getItem("videoTotalScore"))
    );
    var finaTotalScoreMap = combineMaps(finaTotalScoreMap, videoTotalScoreMap);
    var visualTotalScoreMap = new Map(
      JSON.parse(sessionStorage.getItem("visualTotalScore"))
    );
    var finaTotalScoreMap = combineMaps(finaTotalScoreMap, visualTotalScoreMap);
    return <div></div>;
  }
}

export default FinalResultDisplay;
