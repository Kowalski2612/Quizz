import "./App.css";
import { Routes, Route } from "react-router-dom";
// import { Routes, Route, Link } from 'react-router-dom';
import Home from "./page/header";
import Dev1 from "./page/dev1";
import Import from "./page/import";

function App() {
    return (
        //  <div className="App">
        //     <nav>
        //         <ul>
        //             <li>
        //                 <Link to="/dev1">Dev 1</Link>
        //             </li>
        //             <li>
        //                 <Link to="/js">JS</Link>
        //             </li>
        //         </ul>
        //     </nav>
        //     <Routes>
        //         <Route path="/dev1" element={<Home />} />
        //         <Route path="/js" element={<Dev1 />} />
        //     </Routes>
        //  </div>
        <div>
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/dev1" element={<Dev1 />} />
                <Route path="/import" element={<Import />} />
            </Routes>
        </div>
        // <Home />
    );
}

export default App;
