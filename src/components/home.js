import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style/home.css";
import io from "socket.io-client";

const Home = () => {
  const [option1, setOption1] = useState([]);
  const [option2, setOption2] = useState([]);
  const [option1Total, setOption1Total] = useState(0);
  const [option2Total, setOption2Total] = useState(0);
  const [displayOption1, setDisplayOption1] = useState("");
  const [displayOption2, setDisplayOption2] = useState("");
  const [option1Ratio, setOption1Ratio] = useState(50);
  const [option2Ratio, setOption2Ratio] = useState(50);


  const getAllQuiz = async () => {
    await axios
      .get("http://localhost:5000/api/getAll")
      .then((result) => {
        console.log(result.data);
        for (var i = 0; i < result.data.length; i++) {
          option1.push(result.data[i]["option1"]);
          option2.push(result.data[i]["option2"]);
        }
        setDisplayOption1(option1[0]);
        setDisplayOption2(option2[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const socket = io.connect("http://localhost:5000");
    socket.on("message", (data) => {
      if (String(data.data).includes("A") || String(data.data).includes("a")) {
        setOption1Total((option1Total) => option1Total + 1);
        updateProgressBar();
        console.log("A")
        console.log(data.data);
      }
      if (
        String(data.data).toString().includes("B") ||
        String(data.data).includes("b")
      ) {
        setOption2Total((option2Total) => option2Total + 1);
        updateProgressBar();
        console.log("B")
        console.log(data.data);
      }
    });

    getAllQuiz();
    countDown();
  }, []);

  ///////////Progress Bar
  function updateProgressBar() {
    var totalSelectedOptions = option1Total + option2Total;

    const progressRatioPlayer1 = option1Total / totalSelectedOptions;
    const progressRatioPlayer2 = option2Total / totalSelectedOptions;

    setOption1Ratio(progressRatioPlayer1 * 100);
    setOption2Ratio(progressRatioPlayer2 * 100);
  }


  //////////////////////

  //////////////////Countdown
  const countDown = async () => {
    var batas = 120;
    var counter = 0;
    for (var i = batas; i >= 0; i--) {
      if (i == 0) {
        i = batas;
        counter++;
        if (counter >= option1.length) {
          counter = 0;
        }
        setDisplayOption1(option1[counter]);
        setDisplayOption2(option2[counter]);
      }
      document.getElementById("timer").innerHTML = i;
      await delay(1000);
    }
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  //////////////////////

  return (
    <div>
      <center>
        <p id="judul">The Choices</p>
        <table id="tabel">
          <td id="kolom1">
            <button class="button-glitch" role="button">
              <span>A.{displayOption1}</span>
            </button>
          </td>
          <td id="kolom2">
            <button class="button-glitch2" role="button">
              <span> B.{displayOption2} </span>
            </button>
          </td>
        </table>

        <div class="progress-bar-container">
          <div
            class="progress-bar1"
            id="progressBarPlayer1"
            style={{ width: "" + option1Ratio + "%" }}
          ></div>

          <center>
            <div class="fire">
              <div class="fire-left">
                <div class="main-fire"></div>
                <div class="particle-fire"></div>
              </div>
              <div class="fire-center">
                <div class="main-fire"></div>
                <div class="particle-fire"></div>
              </div>
              <div class="fire-right">
                <div class="main-fire"></div>
                <div class="particle-fire"></div>
              </div>
              <div class="fire-bottom">
                <div class="main-fire"></div>
              </div>
            </div>
          </center>

          <div
            class="progress-bar2"
            id="progressBarPlayer2"
            style={{ width: "" + option2Ratio + "%" }}
          ></div>
        </div>

        <div id="timer"></div>
      </center>
    </div>
  );
};

export default Home;
