import { useDropzone } from "react-dropzone";
import {
  Dropbox,
  Input,
  InputWrapper,
  FileUploadedNote,
  Chat,
  Chats,
  IMG,
  Form,
} from "./styles";
import { sendPDF, askQuestion } from "../../utils/requests";
import { useState } from "react";
import up from "../../assets/up.svg";

const NewChat = () => {
  const [uploaded, setUploaded] = useState("");
  const [chats, setChats] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setLoading] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [] },
    onDrop: async (acceptedFiles) => {
      const target = acceptedFiles[0];

      const response = await sendPDF(target);
      const data = await response.json();

      if (response.status == 200) {
        setUploaded(target.name);

        setChats([...chats, { role: "model", message: data.reply }]);
      }
    },

    maxFiles: 1,
  });

  const onSubmit = async (ev) => {
    ev.preventDefault();

    setLoading(true);
    setLoading(true);

    const response = await askQuestion(query, uploaded);
    const data = await response.json();

    if (response.status == 200) {
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
      {/* Dropbox starts */}
      {uploaded === "" ? (
        <Dropbox {...getRootProps()} dragged={isDragActive}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the PDF file here ...</p>
          ) : (
            <p>Drag 'n' drop a PDF file here, or click to select a PDF file</p>
          )}
        </Dropbox>
      ) : (
        <FileUploadedNote>
          Querying <b>{uploaded}</b>
        </FileUploadedNote>
      )}

      {/* Dropbox ends */}

      {/* Chat Starts */}
      <Chats>
        {chats.map((el) => (
          <Chat role={el.role}>{el.message}</Chat>
        ))}
        {isLoading && <Chat role="user">{query}</Chat>}
      </Chats>
      {/* Chat Ends */}

      {uploaded !== "" && (
        <InputWrapper>
          <Form action="#" onSubmit={onSubmit}>
            <Input
              type="text"
              placeholder="Enter your question"
              value={!isLoading ? query : ""}
              disabled={isLoading}
              onChange={(ev) => {
                setQuery(ev.target.value);
              }}
            />
            <input type="submit" style={{ display: "none" }} />
            <IMG src={up} onClick={uploaded !== "" && onSubmit} />
          </Form>
        </InputWrapper>
      )}
    </>
  );
};

export default NewChat;
