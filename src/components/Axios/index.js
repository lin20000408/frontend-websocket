import axios from "axios";

export async function axiosPost(url, args) {
  try {
    const response = await axios.post(url, args);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("An error has occurred");
    }
  } catch (error) {
    console.error("An error has occurred:", error);
    throw error; // 重新抛出错误，以便在调用处进一步处理
  }
}

export async function axiosGet(url) {
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("An error has occurred");
    }
  } catch (error) {
    console.error("An error has occurred:", error);
    throw error; // 重新抛出错误，以便在调用处进一步处理
  }
}

export async function axiosPut(url, args) {
  try {
    const response = await axios.put(url, args);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error("An error has occurred");
    }
  } catch (error) {
    console.error("An error has occurred:", error);
    throw error; // 重新抛出错误，以便在调用处进一步处理
  }
}

export async function axiosDelete(url) {
  try {
    const response = await axios.delete(url);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error("An error has occurred");
    }
  } catch (error) {
    console.error("An error has occurred:", error);
    throw error; // 重新抛出错误，以便在调用处进一步处理
  }
}
