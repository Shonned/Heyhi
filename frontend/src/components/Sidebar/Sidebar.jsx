import {
    StyledSidebar,
    StyledSidebarItem,
    StyledSidebarItems,
    StyledSidebarLink,
    StyledSidebarLogo
} from "./Sidebar.styles.js";
import {useNavigate} from "react-router-dom";
import {FaUser} from "react-icons/fa6";
import {RiMessage3Fill} from "react-icons/ri";
import {IoMdSettings} from "react-icons/io";
import {FaPlus} from "react-icons/fa6";

const Sidebar = (props) => {
    const navigate = useNavigate();

    const redirectToHome = () => {
        navigate(`/`);
    }

    return (
        <StyledSidebar>
            <StyledSidebarLogo/>
            <StyledSidebarItems>
                <StyledSidebarItem>
                    <StyledSidebarLink onClick={() => redirectToHome()}>
                        <FaPlus/>
                    </StyledSidebarLink>
                </StyledSidebarItem>
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