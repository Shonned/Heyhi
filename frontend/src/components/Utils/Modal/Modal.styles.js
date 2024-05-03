import styled from 'styled-components';

export const StyledModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 9999;
`;

export const ModalContainer = styled.div`
  position: relative;
  width: 450px;
  height: 550px;
  color: var(--white);
  background: var(--background-color);
  border: 1px solid rgba(255, 255, 255, .125);
  border-radius: 15px;
  animation-duration: 350ms;
  overflow: hidden;
`;

export const AnimatedModalContainer = styled(ModalContainer)`
  animation: .3s fadeInUp;
`;

export const ModalHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 20px 20px 0;
  background: var(--background-color);
  border-radius: 15px 15px 0 0;
`;

export const ModalClose = styled.div`
  display: flex;
  margin-left: auto;
  padding: 7px;
  background: var(--grey-color);
  border-radius: 50%;
  transition: all .3s;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(.95);
  }
`;

export const ModalBody = styled.div`
  margin-top: 60px;
  padding: 20px 20px 150px;
  height: 100%;
  overflow-y: scroll;
`;

export const ModalSubmit = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 15px 20px;
  width: 100%;
  background: var(--background-color);
`;