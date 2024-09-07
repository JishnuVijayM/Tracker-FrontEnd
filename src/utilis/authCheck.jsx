// // RouteGuard.js
// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const RouteGuard = ({ children }) => {
//     const navigate = useNavigate();

//     useEffect(() => {
//         const checkAuth = () => {
//             const token = localStorage.getItem('TOKEN');
//             if (!token) {
//                 navigate('/login');
//             }
//         };

//         // Initial check
//         checkAuth();

//         // Event listener for storage changes
//         window.addEventListener('storage', checkAuth);

//         // Cleanup event listener
//         return () => {
//             window.removeEventListener('storage', checkAuth);
//         };
//     }, [navigate]);

//     return children;
// };

// export default RouteGuard;
