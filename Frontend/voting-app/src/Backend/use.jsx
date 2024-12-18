// import { useNavigate } from "react-router-dom";
// import Authservice from "./auth";
// const useAuthService = () => {
//   const navigate = useNavigate();

//   const authService = new Authservice();

//   // Wrap request method to handle redirects
//   const requestWithRedirect = async (...args) => {
//     try {
//       return await authService.request(...args);
//     } catch (error) {
//       if (
//         error.message.includes("No token found") ||
//         error.message.includes("net::ERR_CONNECTION_REFUSED") ||
//         error.message.includes("401")
//       ) {
//         navigate("/");
//       }
//       throw error;
//     }
//   };

//   return { request: requestWithRedirect };
// };

// export default useAuthService;
