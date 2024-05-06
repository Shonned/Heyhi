import {
    StyledSidebar,
    StyledSidebarItem,
    StyledSidebarItems,
    StyledSidebarLink,
    StyledSidebarLogo
} from "./Sidebar.styles.js";
import {FaUser} from "react-icons/fa6";
import {RiMessage3Fill} from "react-icons/ri";
import {IoMdSettings} from "react-icons/io";

const Sidebar = (props) => {
    return (
        <StyledSidebar>
            <StyledSidebarLogo/>
            <StyledSidebarItems>
                <StyledSidebarItem className="active">
                    <StyledSidebarLink href="#">
                        <RiMessage3Fill/>
                    </StyledSidebarLink>
                </StyledSidebarItem>
                {props.user && (
                    <StyledSidebarItem onClick={() => props.onOpenModal('settings')}>
                        <StyledSidebarLink href="#">
                            <IoMdSettings/>
                        </StyledSidebarLink>
                    </StyledSidebarItem>
                )}
                {!props.user && (
                    <StyledSidebarItem className="sidebar-user" onClick={() => props.onOpenModal('login')}>
                        <FaUser/>
                    </StyledSidebarItem>
                )}
            </StyledSidebarItems>
        </StyledSidebar>
    );
};

export default Sidebar;