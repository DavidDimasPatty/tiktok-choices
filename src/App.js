import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Home from './components/home';

function App() {
  return (
    <Router>
    <Routes>
                  <Route exact path="/" element={<Home/>}></Route>
    </Routes>
 </Router>
  );
}

export default App;
