import { useContext } from "react";
import Header from "../Components/Header";
import Main from "../Components/Main";
import Preview from "../Components/Preview";
import UserContext from "./../util/UserContext";
import { Spinner } from "react-bootstrap";

function Homepage() {
  const [user] = useContext(UserContext);
  return user !== undefined ? (
    <>
      <Header></Header>
      <Preview></Preview>
      <Main></Main>
    </>
  ) : (
    <div className="spinner-container">
      <Spinner className="post-loading-spinner" animation="border" />
    </div>
  );
}

export default Homepage;
