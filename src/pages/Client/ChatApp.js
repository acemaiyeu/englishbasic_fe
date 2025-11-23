// import React, { useEffect, useState } from "react";
// import Echo from "laravel-echo";
// import Pusher from "pusher-js";

// window.Pusher = Pusher;

// // 👉 Khởi tạo Echo TRƯỚC
// const echo = new Echo({
//   broadcaster: "pusher",
//   key: "mykey",        // trùng với Laravel .env
//   cluster: "mt1",
//   wsHost: "127.0.0.1",
//   wsPort: 6001,
//   forceTLS: false,
//   disableStats: true,
//   enabledTransports: ["ws", "wss"],
// });

// const ChatApp = () => {
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState("");
//   const user = "Huy";

//   useEffect(() => {
//     const channel = echo.channel("chat");

//     channel.listen("MessageSent", (e) => {
//       console.log("📩 Nhận realtime:", e);
//       setMessages((prev) => [...prev, `${e.user}: ${e.message}`]);
//     });

//     echo.connector.pusher.connection.bind("connected", () => {
//       console.log("✅ Đã kết nối websocket!");
//     });

//     return () => {
//       echo.disconnect();
//     };
//   }, []);

//   const sendMessage = async () => {
//     await fetch("http://127.0.0.1:8000/api/send-message", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ user, message: text }),
//     });
//     setMessages((prev) => [...prev, `${user}: ${text}`]);
//     setText("");
//   };

//   return (
//     <div className="p-4">
//       <h2>💬 Chat Realtime</h2>
//       <div
//         style={{
//           height: "200px",
//           border: "1px solid #ccc",
//           overflowY: "auto",
//           marginBottom: "1rem",
//         }}
//       >
//         {messages.map((msg, i) => (
//           <div key={i}>{msg}</div>
//         ))}
//       </div>
//       <input
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Nhập tin nhắn..."
//       />
//       <button onClick={sendMessage}>Gửi</button>
//     </div>
//   );
// };

// export default ChatApp;
