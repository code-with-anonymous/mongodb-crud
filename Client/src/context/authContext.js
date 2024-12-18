// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { API_URL } from "../config";

// const Auth = createContext();

// const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const checkAuth = async () => {
//     try {
//       const response = await axios.get(, {
//         withCredentials: true,
//       });
//       if (response.data.user) {
//         setIsLoggedIn(true);
//         setUser(response.data.user);
//       } else {
//         setIsLoggedIn(false);
//         setUser(null);
//       }
//     } catch (error) {
//       setIsLoggedIn(false);
//       setUser(null);
//     } finally {
//       setLoading(false); 
//     }
//   };
  
//   useEffect(() => {
//     checkAuth();
//   }, []);  

//   // Logout function
//   const logout = async () => {
//     try {
//       await axios.post(
//         ${API_URL}/api/auth/logout,
//         {},
//         { withCredentials: true }
//       );
//       setIsLoggedIn(false);
//       setUser(null);
//     } catch (error) {
//       console.log("Logout failed");
//     }
//   };

//   return (
//     <Auth.Provider value={{ isLoggedIn, user, setUser, setIsLoggedIn, logout, loading }}>
//         {children}
//     </Auth.Provider>

//   );
// };

// export const useAuthContext = () => useContext(Auth);
// export default AuthProvider;