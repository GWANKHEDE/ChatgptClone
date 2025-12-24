import axios from 'axios';
import { GROQ_API_KEY, GROQ_MODEL } from '@env';

const BASE_URL = 'https://api.groq.com/openai/v1/chat/completions';

export const sendMessageToGroq = async (messages) => {
    if (!GROQ_API_KEY || GROQ_API_KEY === 'your_groq_api_key_here') {
        throw new Error('Invalid or missing GROQ_API_KEY. Please ensure your .env file is correct and the server is restarted.');
    }

    try {
        const response = await axios.post(
            BASE_URL,
            {
                model: GROQ_MODEL || 'llama3-8b-8192',
                messages,
            },
            {
                headers: {
                    'Authorization': `Bearer ${GROQ_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data.choices[0].message;
    } catch (error) {
        if (error.response) {
            console.error('Groq API Error:', error.response.data);
            throw new Error(error.response.data.error?.message || 'Failed to fetch response from Groq');
        } else if (error.request) {
            console.error('Network Error:', error.request);
            throw new Error('Network error. Please check your internet connection.');
        } else {
            console.error('Error:', error.message);
            throw new Error(error.message);
        }
    }
};
