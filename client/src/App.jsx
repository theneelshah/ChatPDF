import "./App.scss";
import { Wrapper } from "./styles";
import Main, { NewChat } from "./components/Main";
import SideBar from "./components/SideBar";
import { useState } from "react";

const App = () => {
  const [newChat, setNewChat] = useState(true);

  const _renderMainPage = () => {
    if (newChat)
      return (
        <Main>
          <NewChat />
        </Main>
      );

    return <Main>Existing</Main>;
  };

  return (
    <Wrapper>
      <SideBar newChat={newChat} setNewChat={setNewChat} />
      {_renderMainPage()}
    </Wrapper>
  );
};

export default App;
