import axios from "axios";

const api = axios.create({
    baseURL: 'https://localhost:7272/api/ChatAi/',
    timeout: 10000,
    headers: {'Content-Type': 'application/json'},
});

export type SendResponse = {
    rows?: any[];
    message?:string;
};

export async function sendMessage(message: string): Promise<SendResponse>{
    try{
        const {data} = await api.post<SendResponse>('/send', {message});
        return data;
    }catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const serverMessage = (error.response?.data as any)?.message;
      throw new Error(serverMessage ?? error.message);
    }
    throw error;
  }
}