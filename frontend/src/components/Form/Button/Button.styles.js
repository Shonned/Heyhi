import styled from 'styled-components';

export const StyledButton = styled.button`
  font-family: var(--font-family), sans-serif;
  font-size: var(--font-size-base);
  line-height: var(--line-height-base);
  border: none;
  cursor: pointer;

  &.button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 15px;
    font-size: 15px;
    font-weight: 500;
    color: white;
    background: var(--primary-color);
    border-radius: 25px;
    transition: all .3s;

    &:active {
      transform: scale(.98);
    }

    span:not(.loader) {
      margin-left: 7px;
    }
  }
`;

export const Loader = styled.span`
  width: 23px;
  height: 23px;
  border: 2.5px solid #FFF;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;