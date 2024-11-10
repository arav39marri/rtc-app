import './App.css';
import { Routes , Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Book from './Components/Book';
import History from './Components/History';
import Notification from './Components/Notification';
import Footer from './Components/Footer';
import Createuser from './Components/Createuser';
function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        
         <Route path="/" element={<Home />} />
        <Route path="/Book" element={<Book />} />
        <Route path="/History" element={<History />} />
        <Route path="/Notification" element={<Notification />} />
        <Route path="/Createuser" element={<Createuser />}   ></Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
