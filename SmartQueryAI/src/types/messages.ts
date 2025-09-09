export type Sender = 'user' | 'bot';

export type Message = {
    id : string,
    text? : string,
    time: string,
    sender: Sender,
    rows? : Record<string, unknown>[];
}