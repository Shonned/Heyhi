import styled from 'styled-components';

export const HistoryContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 25%;
  margin-left: 65px;

  @media screen and (max-width: 800px) {
    display: none;
  }
`;

export const HistoryContent = styled.div`
  height: 100%;
  padding-top: 100px;
`;

export const HistoryHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 15px;
`;

export const SearchBar = styled.div`
  margin-top: 10px;
`;

export const HistoryMessages = styled.div`
  height: 100%;
  padding: 15px;
  overflow-y: scroll;
`;

export const HistoryMessage = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 10px 15px;
  border-radius: 10px;
  color: var(--light-grey-color);
  font-size: 15px;
  transition: all .3s;
  cursor: pointer;

  &.active,
  &:hover {
    background: var(--grey-color);
  }

  &:not(:first-child) {
    margin-top: 10px;
  }
`;

export const Time = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3px;
  font-size: 11px;

  span {
    margin-right: 5px;
    font-size: 15px;
  }
`;