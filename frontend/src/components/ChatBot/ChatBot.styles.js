import styled from 'styled-components';
import Button from "../Form/Button/Button.jsx";

export const ChatbotContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 75%;
  padding: 25px;

  @media screen and (max-width: 800px) {
    margin-left: 50px;
    width: 100%;
  }

  @media screen and (max-width: 400px) {
    display: flex;
    flex-direction: column;
    margin-left: 0;
    max-height: 100%;
    padding: 25px 25px 65px 25px;
  }
`;

export const ChatbotContent = styled.div`
  position: relative;
  height: 100%;
  padding: 20px;
  background: var(--foreground-color);
  border-radius: 25px;
  overflow-y: auto;

  @media screen and (max-width: 400px) {
    border-radius: 25px 25px 0 0;
  }
`;

export const ChatbotMessages = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 90px;
  overflow-y: auto;
`;

export const ChatbotForm = styled.div`
    position: sticky;
    bottom: 25px;
    left: 0;
    display: flex;
    align-items: center;
    padding: 10px 15px;
    border-radius: 0 0 25px 25px;
    background: var(--foreground-color);

    .file-group {
        position: absolute;
        top: 50%;
        left: 30px;
        transform: translateY(-50%);
        color: white;
        z-index: 2;
    }

    input {
        padding: 14px 15px;

        &:focus {
            border: 2px solid var(--light-grey-color);
        }
    }

    @media screen and (max-width: 400px) {
        position: relative;
    }
`;

export const StyledChatbotButton = styled(Button)`
    &.file {
        position: absolute;
        top: 50%;
        left: 24px;
        transform: translateY(-50%);
        z-index: 2;
    }

    &.send {
        position: absolute;
        top: 50%;
        right: 24px;
        transform: translateY(-50%);
    }
`;