import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const tokeContext = createContext();

export default function TokenContextProvider(props) {
  let [token, setToken] = useState(null);

  function saveUserData() {
    let encodedToken = localStorage.getItem('token');
    let decodedToken = jwtDecode(encodedToken);
    console.log(decodedToken);
    setToken(decodedToken);
  }

  const contextValue = {
    token,
    setToken,
    saveUserData,
  };
  
  return (
    <tokeContext.Provider value={contextValue}>
      {props.children}
    </tokeContext.Provider>
  );
}


// import { createContext, useState } from "react";
// import { jwtDecode } from "jwt-decode";

// export const tokeContext = createContext();

// export default function TokenContextProvider(props) {
//   let [token, setToken] = useState(null);
//   let [isAdmin, setIsAdmin] = useState(false); // New state to store admin status

//   // function saveUserData() {
//   //   let encodedToken = localStorage.getItem('token');
//   //   let decodedToken = jwtDecode(encodedToken);
//   //   console.log(decodedToken);
//   //   setToken(decodedToken);

//   //   // Check if the user has the 'admin' role
//   //   if (decodedToken && decodedToken.role === 'admin') {
//   //     setIsAdmin(true);
//   //   } else {
//   //     setIsAdmin(false);
//   //   }
//   // }

//   const contextValue = {
//     token,
//     setToken,
//     saveUserData,
//     isAdmin,
//   };

//   return (
//     <tokeContext.Provider value={contextValue}>
//       {props.children}
//     </tokeContext.Provider>
//   );
// }
