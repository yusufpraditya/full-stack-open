import styled from "styled-components";

const Button = styled.button`
  background-color: var(--primary);
  padding: 8px 12px;
  margin: 2px;
  border: none;
  border-radius: 8px;

  &:hover {
    cursor: pointer;
  }
`;

export default Button;
