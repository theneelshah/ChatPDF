import { Input, InputWrapper, IMG, Form } from "./styles";
import up from "../../assets/up.svg";

/**
 *
 * @param {func} props.onSubmit - function to be called when query is submitted
 * @param {bool} props.isLoading - true if waiting for response
 * @param {string} props.query - the current query
 * @param {func} props.onSubmit - set the query
 */
const InputPanel = ({ onSubmit, isLoading, query, setQuery }) => {
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
        <IMG src={up} onClick={onSubmit} />
      </Form>
    </InputWrapper>
  );
};

export default InputPanel;
