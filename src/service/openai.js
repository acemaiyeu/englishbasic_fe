import axios from "axios";

// const API_KEY = CHAT_GPT_key; // thay bằng key thật

let conversation = [
  // { role: "system", content: "Bạn tên là Bà xã nhỏ giờ hãy đóng vai như bà xã tui đi" }
];

export const chatWithGPT = async (message) => {
  try {
    let API_KEY = localStorage.getItem("CHAT_GPT_KEY");
    let str_convert = message.split(message);

    let key = str_convert[0];
    let value = str_convert[1];
    let reply = "No call api";
    if(key === "question" || key === "vocabulary" || key === "subject"){
        if(key === "question"){
         conversation.push({role: "system", content: "Tạo cho tôi bảng dữ liệu excel gồm các cột sau: lesson_detail_id, question_id, question, option_a, option_b, option_c, option_d, answer_correct, type. Với lesson_detail_id và question_id để trống, question là câu hỏi (ví dụ: Nghĩa của love là gì? đây là ví dụ không dùng câu này), option_a, option_b, option_c, option_d là các câu trả lời sẵn cho câu hỏi trên, answer_correct là câu trả lời đúng, ví dụ option_a là câu trả lời đúng thì answer_correct là 1 cứ thế tăng lên, type là dạng câu hỏi (nếu dạng câu hỏi là trắc nghiệm thì type là CHOOSE, còn tự luận là WRITE, với câu tự luận hay trắc nghiệm thì các option đều có câu trả lời"})
        }
        if(key === "vocabulary"){
            conversation.push({role: "system", content: "Tạo cho tôi bảng dữ liệu excel gồm các cột sau: lesson_detail_id, question_id, question, option_a, option_b, option_c, option_d, answer_correct, type. Với lesson_detail_id và question_id để trống, question là câu hỏi (ví dụ: Nghĩa của love là gì? đây là ví dụ không dùng câu này), option_a, option_b, option_c, option_d là các câu trả lời sẵn cho câu hỏi trên, answer_correct là câu trả lời đúng, ví dụ option_a là câu trả lời đúng thì answer_correct là 1 cứ thế tăng lên, type là dạng câu hỏi (nếu dạng câu hỏi là trắc nghiệm thì type là CHOOSE, còn tự luận là WRITE, với câu tự luận hay trắc nghiệm thì các option đều có câu trả lời"})
        }
        if(key === "subject"){
            conversation.push({role: "system", content: "Tạo cho tôi bảng dữ liệu excel gồm các cột sau: lesson_detail_id, question_id, question, option_a, option_b, option_c, option_d, answer_correct, type. Với lesson_detail_id và question_id để trống, question là câu hỏi (ví dụ: Nghĩa của love là gì? đây là ví dụ không dùng câu này), option_a, option_b, option_c, option_d là các câu trả lời sẵn cho câu hỏi trên, answer_correct là câu trả lời đúng, ví dụ option_a là câu trả lời đúng thì answer_correct là 1 cứ thế tăng lên, type là dạng câu hỏi (nếu dạng câu hỏi là trắc nghiệm thì type là CHOOSE, còn tự luận là WRITE, với câu tự luận hay trắc nghiệm thì các option đều có câu trả lời"})
        }
        conversation.push({role: "system", content: `Đây là từ vựng tôi muốn xuất ${value}. Giờ thì không hỏi gì cả chỉ xuất dữ liệu theo từ vựng tôi muốn`})
        
    // push tin nhắn mới của user vào lịch sử
          conversation.push({ role: "user", content: message });

          const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
              model: "gpt-4o-mini",
              messages: conversation,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`,
              },
            }
          );
          reply = response.data.choices[0].message.content;

          // lưu câu trả lời của AI vào lịch sử
          conversation.push({ role: "assistant", content: reply });
    }
    return reply;
  } catch (error) {
    console.error("Error calling OpenAI API:", error.response?.data || error);
    return "Xin lỗi, có lỗi xảy ra!";
  }
};
