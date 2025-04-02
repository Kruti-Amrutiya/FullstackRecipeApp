import { message } from "antd";

export const getToken = async () => {
  try {
    const token = await localStorage.getItem("TOKEN");
    if (token !== null) {
      return "token " + token;
    }
  } catch (e) {
    return e;
  }
};

export const showError = (messageData, time = 10) => {  
  message.destroy();
  messageData &&
    message.error({
      content: messageData,
      className: "show-toast-message",
      time,
    });
};

export const showSuccess = (messageData, time = 10000) => {
  message.destroy();
  messageData &&
    message.success({
      content: messageData,
      className: "show-toast-message",
      time,
    });
};
