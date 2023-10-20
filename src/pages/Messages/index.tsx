import { useEffect, useState } from "react";
import "./style.scss";

const Messages = () => {
    const [messages, setMessages] = useState<any[]>([]);

    useEffect(() => {
        fetch("https://dummyjson.com/quotes?limit=10")
            .then((res) => res.json())
            .then((data) => setMessages(data.quotes));
    }, []);

    return (
        <div className="messages">
            {messages.map((message) => (
                <div key={message.id} className="message">
                    <h3>{message.author}</h3>
                    <p>{message.quote}</p>
                </div>
            ))}
        </div>
    );
};

export default Messages;
