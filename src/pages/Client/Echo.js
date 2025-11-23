// import Echo from "laravel-echo";
// import Pusher from "pusher-js";

// window.Pusher = Pusher;

// useEffect(() => {
//   const channel = echo.channel("chat");

//   channel.listen("MessageSent", (e) => {
//     console.log("📩 Nhận realtime:", e);
//     setMessages((prev) => [...prev, `${e.user}: ${e.message}`]);
//   });

//   echo.connector.pusher.connection.bind("connected", () => {
//     console.log("✅ Đã kết nối websocket!");
//   });
// }, []);

// const echo = new Echo({
//   broadcaster: "pusher",
//   key: "mykey",        // cùng với .env của Laravel
//   cluster: "mt1",      // thêm dòng này
//   wsHost: "127.0.0.1", // địa chỉ backend
//   wsPort: 6001,
//   forceTLS: false,
//   disableStats: true,
//   enabledTransports: ["ws", "wss"], // thêm cho chắc
// });

// export default echo;
