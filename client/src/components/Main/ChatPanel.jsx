import { Chat, Chats } from "./styles";

const ChatPanel = ({ chats, isLoading, query }) => {
  return (
    <Chats>
      {chats.map((el) => (
        <Chat role={el.role}>{el.message}</Chat>
      ))}
      {isLoading && <Chat role="user">{query}</Chat>}
    </Chats>
  );
};

export default ChatPanel;
