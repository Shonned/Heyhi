import {
    StyledSidebar,
    StyledSidebarItem,
    StyledSidebarItems,
    StyledSidebarLink,
    StyledSidebarLogo
} from "./Sidebar.styles.js";

const Sidebar = ({onOpenModal}) => {
    return (
        <StyledSidebar>
            <StyledSidebarLogo/>
            <StyledSidebarItems>
                <StyledSidebarItem className="active">
                    <StyledSidebarLink href="#">
                        <span className="material-symbols-rounded">
                          chat
                        </span>
                    </StyledSidebarLink>
                </StyledSidebarItem>
                <StyledSidebarItem onClick={() => onOpenModal('settings')}>
                    <StyledSidebarLink href="#">
                        <span className="material-symbols-rounded">
                          settings
                        </span>
                    </StyledSidebarLink>
                </StyledSidebarItem>
                <StyledSidebarItem className="sidebar-user" onClick={() => onOpenModal('register')}>
                      <span className="material-symbols-rounded">
                        person
                      </span>
                </StyledSidebarItem>
            </StyledSidebarItems>
        </StyledSidebar>
    );
};

export default Sidebar;