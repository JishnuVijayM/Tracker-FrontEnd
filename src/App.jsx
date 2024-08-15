import './App.css'
import Navbar from './Components/Navbar'
import Login from './Pages/Login'
import Register from './Pages/Register'

function App() {

  return (
    <>
      <Navbar />
      <Login />
      <Register />
    </>
  )
}

export default App

// src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import AboutPage from './pages/AboutPage';
// import LoginPage from './pages/LoginPage';
// import NotFoundPage from './pages/NotFoundPage';
// import Navbar from './components/Navbar';

// const App = () => {
//   const isAuthenticated = !!localStorage.getItem('authToken'); // Check local storage for an auth token

//   return (
//     <Router>
//       {isAuthenticated ? (
//         <>
//           <Navbar />
//           <Switch>
//             <Route exact path="/" component={HomePage} />
//             <Route path="/about" component={AboutPage} />
//             <Route component={NotFoundPage} />
//           </Switch>
//         </>
//       ) : (
//         <Redirect to="/login" />
//       )}
//     </Router>
//   );
// };

// export default App;
