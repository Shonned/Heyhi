import {
    StyledSidebar,
    StyledSidebarItem,
    StyledSidebarItems,
    StyledSidebarLink,
    StyledSidebarLogo
} from "./Sidebar.styles.js";

const Sidebar = (props) => {
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
                {props.user && (
                    <StyledSidebarItem onClick={() => props.onOpenModal('settings')}>
                        <StyledSidebarLink href="#">
                        <span className="material-symbols-rounded">
                          settings
                        </span>
                        </StyledSidebarLink>
                    </StyledSidebarItem>
                )}
                {!props.user && (
                    <StyledSidebarItem className="sidebar-user" onClick={() => props.onOpenModal('login')}>
                      <span className="material-symbols-rounded">
                        person
                      </span>
                    </StyledSidebarItem>
                )}
            </StyledSidebarItems>
        </StyledSidebar>
    );
};

export default Sidebar;