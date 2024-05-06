import styled from "styled-components";
import Button from "./Button/Button.jsx";

export const Form = styled.form`
    & > .input-group:not(:last-child) {
        margin-bottom: 15px;
    }
`;

export const AuthChoice = styled.div`
    .separator {
        position: relative;
        width: 100%;
        height: 2px;
        margin: 25px 0;
        background: var(--light-grey-color);
        
        span {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 0 10px;
            color: var(--light-grey-color);
            font-size: 12px;
            background: var(--background-color);
        }
    }
`;

export const ExternAuthServiceBtn = styled(Button)`
    &.google {
        background: white !important;
        color: var(--background-color);
    }
`;