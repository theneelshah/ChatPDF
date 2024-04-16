import { Input, InputWrapper, IMG, Form } from "./styles";
import up from "../../assets/up.svg";

const InputPanel = ({ onSubmit, uploaded, isLoading, query, setQuery }) => {
  return (
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
  );
};

export default InputPanel;
