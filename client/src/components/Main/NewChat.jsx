import { useDropzone } from "react-dropzone";
import { Dropbox, FileUploadedNote } from "./styles";
import { sendPDF, askQuestion } from "../../utils/requests";
import { useState } from "react";
import ChatPanel from "./ChatPanel";
import InputPanel from "./InputPanel";

const NewChat = () => {
  const [uploaded, setUploaded] = useState("");
  const [chats, setChats] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [] },
    onDrop: async (acceptedFiles) => {
      const target = acceptedFiles[0];

      setUploading(true);

      const response = await sendPDF(target);
      const data = await response.json();

      if (response.status === 200) {
        setUploaded(target.name);

        setChats([...chats, { role: "model", message: data.reply }]);
      }

      setUploading(false);
    },

    maxFiles: 1,
  });

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
      {uploaded === "" ? (
        <Dropbox {...getRootProps()} dragged={isDragActive}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the PDF file here ...</p>
          ) : uploading ? (
            <p>Uploading....</p>
          ) : (
            <p>Drag 'n' drop a PDF file here, or click to select a PDF file</p>
          )}
        </Dropbox>
      ) : (
        <FileUploadedNote>
          Querying <b>{uploaded}</b>
        </FileUploadedNote>
      )}

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

export default NewChat;
