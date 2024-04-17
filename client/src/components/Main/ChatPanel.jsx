import { Chat, Chats } from "./styles";

/**
 *
 * @param {object[]} props.chats - The array containing all chat messages
 * @param {bool} props.isLoading - true if waiting for response
 * @param {bool} props.query - The current query
 *
 */
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
