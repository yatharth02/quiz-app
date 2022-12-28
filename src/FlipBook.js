import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./FlipBook.css";

class FlipBook extends Component {
  setTeamNum(round) {
    sessionStorage.setItem(
      "teamNum",
      sessionStorage.getItem("teamNum") ? sessionStorage.getItem("teamNum") : 1
    );

    var roundsMap = new Map(JSON.parse(sessionStorage.getItem("rounds")));
    roundsMap.set("Round-" + round, true);
    sessionStorage.setItem(
      "rounds",
      JSON.stringify(Array.from(roundsMap.entries()))
    );

    sessionStorage.setItem("roundClear", false);
  }

  render() {
    if (!sessionStorage.getItem("rounds")) {
      sessionStorage.setItem(
        "rounds",
        JSON.stringify(
          Array.from(
            new Map([
              ["Round-1", undefined],
              ["Round-2", undefined],
              ["Round-3", undefined],
              ["Round-4", undefined],
              ["Round-5", undefined],
              ["Round-6", undefined],
            ]).entries()
          )
        )
      );
    }

    var roundsMap = new Map(JSON.parse(sessionStorage.getItem("rounds")));

    return (
      <div className="flip_book">
        <input type="checkbox" defaultChecked />
        <input
          type="checkbox"
          id="flip_c1"
          checked={roundsMap.get("Round-1")}
          readOnly
        />
        <input
          type="checkbox"
          id="flip_c2"
          checked={roundsMap.get("Round-2")}
          readOnly
        />
        <input
          type="checkbox"
          id="flip_c3"
          checked={roundsMap.get("Round-3")}
          readOnly
        />
        <input
          type="checkbox"
          id="flip_c4"
          checked={roundsMap.get("Round-4")}
          readOnly
        />
        <input
          type="checkbox"
          id="flip_c5"
          checked={roundsMap.get("Round-5")}
          readOnly
        />
        <input
          type="checkbox"
          id="flip_c6"
          checked={roundsMap.get("Round-6")}
          readOnly
        />
        <input type="checkbox" id="flip_c7" />
        <div className="flip_flip-book">
          <div className="flip_flip" id="flip_p1">
            <div className="flip_back">
              <img className="flip_image flip_two" />
              <label className="flip_back-btn" htmlFor="flip_c1">
                पीछे
              </label>
            </div>
            <div className="flip_front">
              <img className="flip_image flip_one" />
              <label className="flip_next-btn" htmlFor="flip_c1">
                अगला
              </label>
            </div>
          </div>
          <div className="flip_flip" id="flip_p2">
            <div className="flip_back">
              <img className="flip_image flip_three" />
              <label className="flip_back-btn" htmlFor="flip_c2">
                पीछे
              </label>
            </div>
            <div className="flip_front">
              <br />
              <h1 className="flip_h1">बहुविकल्पीय राउण्ड</h1>
              <br />
              <p className="flip_p">
                5 प्रश्न प्रति टीम।
                <br />
                प्रत्येक सही प्रश्न पर 05 अंक निर्धारित समय प्रति प्रश्न 30
                सेकेण्ड।
                <br />
                गलत पर कोई अंक नहीं।
                <br />
                अधिकतम 25 अंक।
              </p>
              <Link
                className="flip_link"
                to="/mcq"
                onClick={() => {
                  this.setTeamNum(1);
                }}
                disabled={sessionStorage.getItem("roundClear") ? true : false}
              >
                दौर 1 शुरू करे
              </Link>
              <label className="flip_next-btn" htmlFor="flip_c2">
                अगला
              </label>
            </div>
          </div>
          <div className="flip_flip" id="flip_p3">
            <div className="flip_back">
              <img className="flip_image flip_four" />
              <label className="flip_back-btn" htmlFor="flip_c3">
                पीछे
              </label>
            </div>
            <div className="flip_front">
              <br />
              <h1 className="flip_h1">विजुअल राउण्ड</h1>
              <br />
              <p className="flip_p">
                03 विजुअल स्लाइड दिखाई जाएंगी।
                <br />
                कुल 07 प्रश्न पूछे जाएंगे।
                <br />
                प्रत्येक प्रश्न की समय सीमा 30 सैकेण्ड।
                <br />
                अधिकतम 70 अंक।
              </p>
              <Link className="flip_link" to="/">
                दौर 2 शुरू करे
              </Link>
              <label className="flip_next-btn" htmlFor="flip_c3">
                अगला
              </label>
            </div>
          </div>
          <div className="flip_flip" id="flip_p4">
            <div className="flip_back">
              <img className="flip_image flip_five" />
              <label className="flip_back-btn" htmlFor="flip_c4">
                पीछे
              </label>
            </div>
            <div className="flip_front">
              <br />
              <h1 className="flip_h1">एक्सटेम्पोर राउण्ड</h1>
              <br />
              <p className="flip_p">
                दो विषयों में से किसी एक विषय पर तीन प्रतिभागीयों में एक
                प्रतिभागी 02 मिनट का भाषण देगा।
                <br />
                निर्धारित 10 अंक।
              </p>
              <Link className="flip_link" to="/">
                दौर 3 शुरू करे
              </Link>
              <label className="flip_next-btn" htmlFor="flip_c4">
                अगला
              </label>
            </div>
          </div>
          <div className="flip_flip" id="flip_p5">
            <div className="flip_back">
              <img className="flip_image flip_six" />
              <label className="flip_back-btn" htmlFor="flip_c5">
                पीछे
              </label>
            </div>
            <div className="flip_front">
              <br />
              <h1 className="flip_h1">वीडियो राउण्ड</h1>
              <br />
              <p className="flip_p">
                वीडियो क्लिप 02 मिनट प्रति टीम।
                <br />
                03 प्रश्न प्रत्येक क्लिप के साथ प्रति 30 सैकेण्ड।
                <br />
                10 अंक प्रति प्रश्न, अधिकतम 30 अंक।
              </p>
              <Link className="flip_link" to="/">
                दौर 4 शुरू करे
              </Link>
              <label className="flip_next-btn" htmlFor="flip_c5">
                अगला
              </label>
            </div>
          </div>
          <div className="flip_flip" id="flip_p6">
            <div className="flip_back">
              <img className="flip_image flip_seven" />
              <label className="flip_back-btn" htmlFor="flip_c6">
                पीछे
              </label>
            </div>
            <div className="flip_front">
              <br />
              <h1 className="flip_h1">रैपिड फायर राउण्ड</h1>
              <br />
              <p className="flip_p">
                10 लघु उत्तरीय प्रश्न प्रति टीम, प्रति प्रश्न के लिए 10 अंक तथा
                निर्धारित समय 10 प्रश्न 60 सैकेण्ड में उत्तर दें अन्यथा पास
                करें।
                <br />
                अधिकतम 100 अंक।
              </p>
              <Link className="flip_link" to="/">
                दौर 5 शुरू करे
              </Link>
              <label className="flip_next-btn" htmlFor="flip_c6">
                अगला
              </label>
            </div>
          </div>
          <div className="flip_flip" id="flip_p7">
            <div className="flip_back">
              <img className="flip_image flip_eight" />
              <label className="flip_back-btn" htmlFor="flip_c7">
                पीछे
              </label>
            </div>
            <div className="flip_front">
              <br />
              <h1 className="flip_h1">बजर राउण्ड</h1>
              <br />
              <p className="flip_p">
                10 प्रश्न पूछे जाएंगे।
                <br />
                जो पहले बजर दबाएगा उसे उत्तर देना होगा।
                <br />
                प्रति प्रश्न 10 अंक, समय 30 सैकेण्ड, गलत उत्तर देने पर 5 अंक
                काटे जाएंगे।
                <br />
                अधिकतम 100 अंक।
              </p>
              <Link className="flip_link" to="/">
                दौर 6 शुरू करे
              </Link>
              <label className="flip_next-btn" htmlFor="flip_c7">
                अगला
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FlipBook;
