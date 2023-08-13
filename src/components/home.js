import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style/home.css";
const Home = () => {
  const [option1, setOption1] = useState([]);
  const [option2, setOption2] = useState([]);
  const [answer1, setAnswer1] = useState([]);
  const [answer2, setAnswer2] = useState([]);

  // const getAllQuiz=async()=>{
  //   await axios.get("http://localhost:5000/api/getAll").then((result) => {
  //     console.log(result.data['drinks'])
  //     setDrinks(result.data['drinks'])
  //   }).catch((err) => {
  //       console.log(err)
  //   });
  // }

  // useEffect(()=>{
  //     getAllQuiz();
  // },[])

  let selectedOptions = [0, 0];
    
  function updateProgressBar(option, player) {
    selectedOptions[player - 1] = option;
    const progressBarPlayer1 = document.getElementById('progressBarPlayer1');
    const progressBarPlayer2 = document.getElementById('progressBarPlayer2');
    
    const totalSelectedOptions = selectedOptions.reduce((total, value) => total + value, 0);
    const progressRatioPlayer1 = selectedOptions[0] / totalSelectedOptions;
    const progressRatioPlayer2 = selectedOptions[1] / totalSelectedOptions;
    
    progressBarPlayer1.style.width = (progressRatioPlayer1 * 100) + '%';
    progressBarPlayer2.style.width = (progressRatioPlayer2 * 100) + '%';
  }
    
  return (
    <div>
      <center>
        <p>Pilih Mana</p>
        <table>
          <td>
            <li>
              <button class="button-glitch" role="button">
                A
              </button>
            </li>
          </td>
          <td>
            <li>
              <button class="button-glitch" role="button">
                B
              </button>
            </li>
          </td>
        </table>
        <div class="progress-bar-container">
      <div class="progress-bar" id="progressBarPlayer1" style={{width: 55}}></div>
      <div class="progress-bar" id="progressBarPlayer2" style={{width: 45}}></div>
    </div>
      </center>
    </div>
  );
};

export default Home;
