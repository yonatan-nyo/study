import React, { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
const WS_URL = "ws://127.0.0.1:8080";

export default function App() {
  // Public API that will echo messages sent to it back to the client
  const [socketUrl, setSocketUrl] = useState<string>(WS_URL);
  const [messageHistory, setMessageHistory] = useState<string[]>([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage]);

  const handleClickChangeSocketUrl = useCallback(() => setSocketUrl(WS_URL), []);

  const handleClickSendMessage = useCallback(() => sendMessage("Hello"), [sendMessage]);

  const connectionStatus: Record<ReadyState, string> = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  };

  return (
    <div>
      <button onClick={handleClickChangeSocketUrl}>Click Me to change Socket Url</button>
      <button onClick={handleClickSendMessage} disabled={readyState !== ReadyState.OPEN}>
        Click Me to send 'Hello'
      </button>
      <span>The WebSocket is currently {connectionStatus[readyState]}</span>
      {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
      <ul>
        {messageHistory.map((message, idx) => (
          <span key={idx}>{message ? message.data : null}</span>
        ))}
      </ul>
    </div>
  );
}
