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

        &.danger {
            background: #F44336;
        }
        
        &:active {
            transform: scale(.98);
        }

        span:not(.loader) {
            margin-left: 7px;
        }
    }
`;

export const ButtonServiceIcon = styled.span`
    display: flex;
    margin-right: 5px;
    font-size: 20px;
`;