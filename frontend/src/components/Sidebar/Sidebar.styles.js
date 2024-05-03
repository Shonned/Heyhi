import styled from "styled-components";

export const StyledSidebar = styled.aside`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 65px;
    padding: 10px 0;
    background: var(--background-color);

    @media screen and (max-width: 400px) {
        top: auto;
        bottom: 0;
        display: flex;
        align-items: center;
        height: 60px;
        width: 100%;
        padding: 0;
        z-index: 3;
    }
`;

export const StyledSidebarLogo = styled.div`
    width: 50px;
    height: 50px;
    margin: auto auto 10px;
    background-image: url("https://i.ibb.co/N2rPbj7/heyhi-form.png");
    background-size: cover;
    background-position: center center;

    @media screen and (max-width: 400px) {
        display: none;
    }
`;

export const StyledSidebarItems = styled.ul`
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100%;
    list-style: none;

    @media screen and (max-width: 400px) {
        flex-direction: row;
        justify-content: space-around;
        width: 100%;
    }
`;

export const StyledSidebarItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  margin-top: 10px;
  background: transparent;
  border-radius: 10px;
  transition: all .3s;

  &.active,
  &:hover {
    background: var(--grey-color);
  }

  &:active {
    transform: scale(.90);
  }

  span {
    font-size: 27px;
    color: var(--light-grey-color);
  }

  &.active span,
  &:hover span {
    color: var(--white);
  }

  &.sidebar-user {
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    height: 45px;
    width: 45px;
    background: var(--grey-color);
    border-radius: 50%;
    cursor: pointer;

    @media screen and (max-width: 400px) {
      position: relative;
      bottom: inherit;
      left: inherit;
      transform: translate(0);
      background: transparent;
    }

    span {
      font-size: 30px;
      transition: all .3s;
    }

    &:active span {
      transform: scale(.9);
    }
  }
`;

export const StyledSidebarLink = styled.a`
  display: flex;
`;
