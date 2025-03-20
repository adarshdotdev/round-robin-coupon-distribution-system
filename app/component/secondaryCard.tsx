import React from "react";
import styled from "styled-components";

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <StyledWrapper>
      <div className="m2">
        <span>{children}</span>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .m2 {
    position: relative;
    min-width: 20vmin; /* Reduced size */
    min-height: 20vmin; /* Reduced size */
    background: linear-gradient(135deg, #1e1e24 10%, #050505 60%);
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    border-radius: 4px;
    animation: gradient-shift 5s ease-in-out infinite; /* Faster animation */
    background-size: 200% 200%; /* Gradient shift */
  }

  .m2 .logo {
    display: inline-block;
    vertical-align: baseline;
    user-select: none;
    font-size: 5vmin; /* Smaller font size */
    color: white;
    background-image: linear-gradient(to right, #626262, #fff);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    font-weight: bold;
  }

  .m2 .logo svg {
    margin-right: -1vmin;
    width: 5vmin; /* Smaller SVG size */
    height: 5vmin; /* Smaller SVG size */
  }

  .m2::before,
  .m2::after {
    --size: 5px; /* Reduced glow size */
    content: "";
    position: absolute;
    top: calc(var(--size) / -2);
    left: calc(var(--size) / -2);
    width: calc(100% + var(--size));
    height: calc(100% + var(--size));
    background: radial-gradient(circle at 0 0, hsl(27deg 93% 60%), transparent),
      radial-gradient(circle at 100% 0, #00a6ff, transparent),
      radial-gradient(circle at 0 100%, #ff0056, transparent),
      radial-gradient(circle at 100% 100%, #6500ff, transparent);
  }

  .m2::after {
    --size: 2px; /* Reduced inner glow size */
    z-index: -1;
  }

  .m2::before {
    --size: 10px; /* Reduced outer glow size */
    z-index: -2;
    filter: blur(2vmin); /* Reduced blur */
    animation: blur-animation 3s ease-in-out alternate infinite; /* Faster blur animation */
  }

  /* Faster blur animation */
  @keyframes blur-animation {
    to {
      filter: blur(3vmin);
      transform: scale(1.05);
    }
  }

  /* Faster gradient animation */
  @keyframes gradient-shift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

export default Card;
