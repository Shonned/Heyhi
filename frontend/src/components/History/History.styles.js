import styled from 'styled-components';

export const HistoryContainer = styled.div`
    position: relative;
    height: 100vh;
    width: 25%;
    margin-left: 70px;

    @media screen and (max-width: 800px) {
        display: none;
    }
`;

export const HistoryContent = styled.div`
    height: 100%;
    padding-top: 40px;
    
    l-ring {
        margin: 15px;
    }
`;

export const HistoryHeader = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 15px;
    background: var(--background-color);
    z-index: 2;
`;

export const SearchBar = styled.div`
    margin-top: 10px;
`;

export const HistoryMessages = styled.div`
    height: 100%;
    padding: 25px 15px 15px;
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
    animation-duration: .6s;
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

export const HistoryNotLogged = styled.div`
    position: relative;
    height: 100%;
`;

export const HistoryNotLoggedContent = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    flex-direction: column;
    
    span {
        color: var(--light-grey-color);
        text-align: center;
        font-size: 13px;
        font-weight: 500;
    }
`;