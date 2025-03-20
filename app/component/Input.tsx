import React from "react";
import styled from "styled-components";

const Input = ({
  setCode,
  value,
}: {
  setCode: (value: string) => void;
  value: string;
}) => {
  return (
    <StyledWrapper>
      <input
        placeholder="Type Coupon Code"
        className="input"
        name="text"
        required
        type="text"
        value={value}
        onChange={(e) => setCode(e.target.value)}
      />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .input {
    color: white;
    width: 300px;
    border: 2px solid #8707ff;
    border-radius: 10px;
    padding: 10px 25px;
    background: transparent;
  }

  .input:active {
    box-shadow: 2px 2px 15px #8707ff inset;
  }
`;

export default Input;
