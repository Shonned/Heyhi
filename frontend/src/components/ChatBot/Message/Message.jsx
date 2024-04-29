import './Message.css'

const getContentClassName = (content) => {
    return content.length <= 50 ? 'content short-content' : 'content';
};

const MessageBot = ({ content }) => {
    return (
        <div className="message message-bot">
            <div className="user">Bot</div>
            <div className={getContentClassName(content)}>{content}</div>
        </div>
    );
};

const MessageUser = ({ content }) => {
    return (
        <div className="message message-user">
            <div className="user">You</div>
            <div className={getContentClassName(content)}>{content}</div>
        </div>
    );
};

export { MessageBot, MessageUser };