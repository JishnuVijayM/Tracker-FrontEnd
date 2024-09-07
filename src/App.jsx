import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';
import './App.css';
import Layout from './Pages/Layout';
import Register from './Pages/Register';
import Login from './Pages/Login';
import { Toaster } from 'react-hot-toast';

function App() {

    return (
        <Router>
            <Toaster />
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Login />} />
                <Route path="/home*" element={<Layout />} />
            </Routes>
        </Router>
    );
}

export default App;
