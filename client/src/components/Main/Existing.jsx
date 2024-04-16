import { getFiles, selectFile, askQuestion } from "../../utils/requests";
import Dropdown from "../Dropdown";
import ChatPanel from "./ChatPanel";
import InputPanel from "./InputPanel";
import { useState, useEffect } from "react";

const Existing = () => {
  const [options, setOptions] = useState([]);
  const [uploaded, setUploaded] = useState("");
  const [chats, setChats] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  const requestForFiles = async () => {
    const response = await getFiles();
    const data = await response.json();

    setOptions(data.files);
  };

  useEffect(() => {
    requestForFiles();
  }, []);

  const onDropdownChange = async (selected) => {
    setUploaded(selected);

    const response = await selectFile(selected);
    const data = await response.json();

    if (response.status === 200) {
      setChats([...chats, { role: "model", message: data.reply }]);
    }
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();

    setLoading(true);

    const response = await askQuestion(query, uploaded);
    const data = await response.json();

    if (response.status === 200) {
      setChats([
        ...chats,
        { role: "user", message: query },
        { role: "model", message: data.answer },
      ]);
    }
    setQuery("");
    setLoading(false);
  };

  console.log(chats);

  return (
    <>
      <Dropdown
        value={uploaded}
        onChange={onDropdownChange}
        options={options}
        placeholder="Choose an option..."
      />

      <ChatPanel chats={chats} query={query} isLoading={isLoading} />

      {uploaded !== "" && (
        <InputPanel
          isLoading={isLoading}
          onSubmit={onSubmit}
          query={query}
          uploaded={uploaded}
          setQuery={setQuery}
        />
      )}
    </>
  );
};

export default Existing;
