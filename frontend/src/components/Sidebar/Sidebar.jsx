import './Sidebar.css';

const Sidebar = ({onOpenModal}) => {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo"></div>
            <ul className="sidebar-items">
                <li className="sidebar-item active">
                    <a href="#" className="sidebar-link">
                        <span className="material-symbols-rounded">
                            chat
                        </span>
                    </a>
                </li>
                <li className="sidebar-item" onClick={() => onOpenModal('settings')}>
                    <a href="#" className="sidebar-link">
                        <span className="material-symbols-rounded">
                            settings
                        </span>
                    </a>
                </li>
                <li className="sidebar-item sidebar-user" onClick={() => onOpenModal('login')}>
                    <span className="material-symbols-rounded">
                        person
                    </span>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
