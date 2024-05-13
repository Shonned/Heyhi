import styled from 'styled-components';

export const Message = styled.div`
  display: flex;
  margin-bottom: 15px;
  animation-duration: .7s;

  &.message-user {
    flex-direction: row-reverse;
    justify-content: flex-start;
  }
`;

export const User = styled.div`
  min-width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--primary-color);
`;

export const Content = styled.div`
  max-width: 300px;
  padding: 8px 15px;
  font-size: 15px;
  color: var(--white);
  background: var(--background-color);
  border: 1px solid var(--grey-color);
  border-radius: 3px 15px 15px 15px;

  &.short-content,
  &.option {
    border-radius: 25px;
  }
`;

export const ContentFlex = styled.div`
  margin-left: 15px;

  ${Message}.message-user & {
    margin: 0 15px 0 0;
  }
`;

export const Options = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Option = styled.div`
  max-width: 300px;
  padding: 8px 15px;
  font-size: 15px;
  color: var(--white);
  background: var(--background-color);
  border: 1px solid var(--grey-color);
  border-radius: 25px;
  cursor: pointer;

  &.selected {
    background: var(--primary-color);
  }

  &:first-child {
    margin-top: 10px;
  }

  &:not(:first-child) {
    margin-top: 7px;
  }

  span {
    display: flex;
    align-content: center;
  }

  .icon {
    margin-right: 7px;
  }
`;