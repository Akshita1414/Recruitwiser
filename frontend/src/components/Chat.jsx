import React, { useEffect } from 'react';

const ChatBot = () => {
  useEffect(() => {
    // Dynamically load the Dialogflow script
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return (
    <div>
      {/* Embedding Dialogflow Messenger */}
      <df-messenger
        intent="WELCOME"
        chat-title="recruitbot"
        agent-id="789c6f2b-0efc-450b-aaa0-525ffe29f308"
        language-code="en"
      ></df-messenger>
    </div>
  );
};

export default ChatBot;
