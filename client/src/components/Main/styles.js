import styled from "styled-components";
import COLORS from "../../constants/color";

export const Main = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Dropbox = styled.section`
  background: ${(props) => (props.dragged ? COLORS.SECONDARY : "gray")};
  color: ${COLORS.TEXT};
  padding: 25px;
  width: 80%;
  text-align: center;
  margin: 0 auto;
  border-radius: 40px;
  cursor: pointer;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 20px;
  font-size: 16px;
  outline: none;
  background: ${COLORS.PRIMARY};
  color: white;
  outline: none;
  transition: border 0.2s;

  &:focus {
    border-radius: 10px;
    box-shadow: 0 0 5px rgba(30, 144, 255, 0.5);
  }
`;

export const InputWrapper = styled.div`
  padding: 20px;
`;

export const FileUploadedNote = styled.div`
  background: gray;
  padding: 25px;
  width: 80%;
  text-align: center;
  margin: 0 auto;
  border-radius: 40px;
`;

export const Chat = styled.div`
  width: 70%;
  background: ${(props) =>
    props.role === "model" ? COLORS.SECONDARY : "#808080"};
  color: ${COLORS.TEXT};
  padding: 8px;
  border-radius: 4px;
  align-self: ${(props) =>
    props.role === "model" ? "flex-start" : "flex-end"};
  margin: 8px 0;
  float: ${(props) => (props.role === "model" ? "left" : "right")};
`;

export const Chats = styled.div`
  overflow: auto;
  margin: 20px;
`;

export const InputForm = styled.form`
  display: flex;
`;

export const IMG = styled.img`
  width: 40px;
`;

export const Form = styled.form`
  display: flex;
`;
