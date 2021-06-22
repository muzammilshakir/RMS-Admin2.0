import { isExpired, decodeToken } from "react-jwt";
const isAuthenticated = (token) => {
    if (token === undefined) { return false; }
    if (token === "NULL") {return false; }
    if (token === null) { return false; }
    console.log("Actual Token", token);
    console.log("Token", decodeToken(token), !isExpired(token));
    return !isExpired(token) ;
    
}
export default isAuthenticated ;