import { Sidebar } from "./styles";
import Switch from "../Switch";

const SideBar = ({ newChat, setNewChat }) => {
  return (
    <Sidebar>
      <h1>Use Existing PDF</h1>
      <Switch
        isOn={newChat}
        onColor="#E09F3E"
        handleToggle={() => {
          setNewChat(!newChat);
        }}
      />
      <h1>Upload New PDF</h1>
    </Sidebar>
  );
};

export default SideBar;
