import styled from 'styled-components';

export const Message = styled.div`
    display: flex;
    margin-bottom: 15px;
    animation-duration: .7s;

    &.message-user {
        flex-direction: row-reverse;
        justify-content: flex-start;

        .message-content {
            border-radius: 15px 3px 15px 15px;
        }

        &.short-content,
        &.option {
            border-radius: 25px;
        }
    }
`;

export const User = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--dark-grey-color);
  border: 1px solid var(--grey-color);
  color: var(--background-color);
  font-size: 20px;
  font-weight: 500;
`;

export const Content = styled.div`
  max-width: 300px;
  padding: 8px 15px;
  font-size: 15px;
  color: var(--dark-grey-color);
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
  color: var(--dark-grey-color);
  background: var(--background-color);
  border: 1px solid var(--grey-color);
  border-radius: 25px;
  cursor: pointer;

  &.selected {
    background: var(--primary-color);
    color: var(--grey-color);
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