import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style/home.css";

const Home = () => {
  const [option1, setOption1] = useState([]);
  const [option2, setOption2] = useState([]);
  var [option1Total, setOption1Total] = useState(0);
  var [option2Total, setOption2Total] = useState(0);
  const [displayOption1,setDisplayOption1]=useState("");
  const [displayOption2,setDisplayOption2]=useState("");

  const getAllQuiz = async () => {
    await axios
      .get("http://localhost:5000/api/getAll")
      .then((result) => {
          console.log(result.data)
        for(var i=0;i<result.data.length;i++){
          option1.push(result.data[i]["option1"])
          option2.push(result.data[i]["option2"])
        }
        setDisplayOption1(option1[0]);
        setDisplayOption2(option2[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllQuiz();
    countDown();
  }, []);

  ///////////Progress Bar
  function updateProgressBar(option, player) {
    const progressBarPlayer1 = document.getElementById("progressBarPlayer1");
    const progressBarPlayer2 = document.getElementById("progressBarPlayer2");
    var totalSelectedOptions=option1Total+option2Total;
  
    const progressRatioPlayer1 = option1Total / totalSelectedOptions;
    const progressRatioPlayer2 = option2Total / totalSelectedOptions;

    progressBarPlayer1.style.width = progressRatioPlayer1 * 100 + "%";
    progressBarPlayer2.style.width = progressRatioPlayer2 * 100 + "%";
  }
  //////////////////////

  //////////////////Countdown
  const countDown= async()=>{
    var batas=120;
    var counter=0;
        for(var i=batas;i>=0;i--){  
          if(i==0){
            i=batas;
            counter++;
            if(counter>=option1.length){
              counter=0;
            }
            setDisplayOption1(option1[counter]);
            setDisplayOption2(option2[counter]);
          }
          document.getElementById("timer").innerHTML=i;
          await delay(1000);
        }
  }

  const delay = ms => new Promise(
      resolve => setTimeout(resolve, ms)
    );

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
          <td  id="kolom2">
            <button class="button-glitch2" role="button">
            <span> B.{displayOption2} </span>
            </button>
          </td>
        </table>

        <div class="progress-bar-container">
          <div
            class="progress-bar1"
            id="progressBarPlayer1"
            style={{ width: "20%" }}
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
            style={{ width: "80%" }}
          ></div>
        </div>

        <div id="timer"></div>
      </center>
    </div>
  );
};

export default Home;
