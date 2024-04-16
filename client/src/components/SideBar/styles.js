import styled from "styled-components";
import COLORS from "../../constants/color";

export const Sidebar = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: ${COLORS.SECONDARY};
  border-radius: 40px;
`;
