// todo
import "./App.css";
import { LngContextProvider } from "./new-user/context/LngContext";
import { NameContextProvider } from "./new-user/context/NameContext";
import UserButton from "./new-user/UserButton.js";
import Assistant from "./components/Assistant";

// todo
import "bootstrap/dist/css/bootstrap.css";
import "antd/dist/antd.min.css";

// todo
function App() {
  return (
    <div className="mx-auto" style={{ width: "65%" }}>
      <LngContextProvider>
        <NameContextProvider>
          <UserButton />
          <Assistant />
        </NameContextProvider>
      </LngContextProvider>
    </div>
  );
}

// todo
export default App;
