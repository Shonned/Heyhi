import './Message.css'

const getContentClassName = (content) => {
    return content.length <= 50 ? 'content short-content' : 'content';
};

const MessageBot = ({ content, options }) => {
    return (
        <div className="message message-bot">
            <div className="user">Bot</div>
            <div className="content-flex">
                <div className={getContentClassName(content)}>{content}</div>
                {options && (
                    <div className="options">
                        {options.map((option, index) => (
                            <div key={index} className="option">
                                <span>{option}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const MessageUser = ({ content, options }) => {
    return (
        <div className="message message-user">
            <div className="user">You</div>
            <div className="content-flex">
                <div className={getContentClassName(content)}>{content}</div>
            </div>
        </div>
    );
};

export { MessageBot, MessageUser };