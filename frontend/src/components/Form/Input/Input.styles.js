import styled from 'styled-components';

export const InputGroup = styled.div`
    position: relative;
    width: 100%;
`;

export const InputLabel = styled.label`
    position: absolute;
    top: 11px;
    left: 17px;
    width: 75%;
    background: var(--background-color);
    color: var(--light-grey-color);
    font-size: 13px;
    font-weight: 500;
    transition: all .3s;
    z-index: 2;
    cursor: pointer;
`;

export const InputLabelIcon = styled.label`
    position: absolute;
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
    display: flex;
    z-index: 1;
    color: var(--light-grey-color);
`;

export const TextInput = styled.input`
    position: relative;
    width: 100%;
    padding: 10px 15px;
    font-size: 15px;
    border-radius: 25px;
    background: var(--background-color);
    color: var(--white);
    border: 2px solid var(--grey-color);
    cursor: pointer;

    &:focus {
        outline: var(--primary-color);
        border: 2px solid var(--primary-color);
    }

    &:focus + ${InputLabel},
    &:not(:placeholder-shown) + ${InputLabel} {
        top: -10px;
        left: 10px;
        padding: 2px 8px;
        width: auto;
        color: var(--primary-color);
        border-radius: 15px;
    }

    &:not(:focus) + ${InputLabel} {
        color: var(--light-grey-color);
    }

    ${InputGroup}.input-group-form & {
        padding: 12px 13px;
        border-radius: 6px;
    }

    ${InputLabelIcon} + & {
        padding: 10px 13px 10px 40px;
    }
`;

export const InputFileGroup = styled.div `
`;

export const FileInput = styled.input `
    display: none;
`;

export const InputFileLabel = styled.label `
    position: relative;
    display: flex;
    cursor: pointer;
`;