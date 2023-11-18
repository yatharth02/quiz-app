import React, { Component } from "react";
import "./Home.css";

class Home extends Component {
  render() {
    return (
      <div className="home_main">
        <div className="home_highway"></div>
        <div className="home_mount"></div>
        <div className="home_board">
          <p>
            State Level Quiz Competition
            <br />
            2023
            <br />
            Dehradun - Uttarakhand
            <br />
          </p>
        </div>
        <div className="home_arrow">
          <img src="home/arrow.png" className="home_arrows" />
          <h4 className="home_start">
            <a className="home_a" href="/flip_book">
              START
            </a>
          </h4>
          <h4 className="home_rule">
            <a className="home_a" href="/rules">
              RULES
            </a>
          </h4>
        </div>

        <div className="home_car">
          <img src="home/car.png" />
        </div>
        <div className="home_wheel">
          <img src="home/wheel.png" className="home_back" />
          <img src="home/wheel.png" className="home_front" />
        </div>
        <div className="home_creation">
          <p>
            Innovated By:- Devanand Deoli, State Coordinator, GK Quiz
            Competition. Contact: 9897077226
            <br />
            Developed By:- Yatharth Deoly, Developer
          </p>
        </div>
      </div>
    );
  }
}

export default Home;
