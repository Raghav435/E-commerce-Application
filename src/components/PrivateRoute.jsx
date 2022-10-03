import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import ListingPages from "../pages/ListingPages";
import { history } from "../store/Auth/history";

function PrivateRoute({ children }) {

  const  user = useSelector((state) => state.auth.user);
  console.log(user);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log(isLoggedIn);

  const { pathname } = useLocation();
  console.log({ pathname });


  // return (!isLoggedIn) ? (
  //   <ListingPages/>
  // ) : (
  //  <Navigate to="/login" state={{ from: pathname }} replace  />
  // )
}

export default PrivateRoute;
