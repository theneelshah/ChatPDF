import styled from "styled-components";
import COLORS from "./constants/color";

export const Wrapper = styled.div`
  display: flex;
  height: calc(100vh - 40px);
  width: calc(100% - 40px);
  background-color: ${COLORS.PRIMARY};
  padding: 20px;
  color: ${COLORS.TEXT};
`;
