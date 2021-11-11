import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header";
import Preview from "./Components/Preview";
import Main from "./Components/Main";

function App() {
  return (
    <>
      <Header></Header>
      <Preview></Preview>
      <Main></Main>
    </>
  );
}

export default App;
