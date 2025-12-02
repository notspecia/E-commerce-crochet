import type MessageContact from "@/models/MessageContact.model";
import { API_BASE_URL } from "@/utils/costants";


export const PostMessageContact = async (messageContact: MessageContact): Promise<MessageContact> => {
    const response = await fetch(`${API_BASE_URL}/api/message-contacts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            data: messageContact, // Strapi 5 vuole sempre data: {}
        }),
    });

    if (!response.ok) {
        throw new Error("Errore nell'invio del messaggio di contatti, riprova più tardi :(");
    }

    const jsonResponse = await response.json();
    return jsonResponse.data;
};