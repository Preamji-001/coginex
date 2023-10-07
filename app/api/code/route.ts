import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

import { Translate } from '@google-cloud/translate';

// Replace with your Google Cloud API credentials file path and target language
const credentialsFilePath = 'credentials.json';
const targetLanguage = 'ta'; // Tamil language code

// Create a Translate client with your API credentials
const translate = new Translate({
  keyFilename: credentialsFilePath,
});

// Function to translate text from English to Tamil
async function translateToTamil(text: string): Promise<string> {
  try {
    // Translate the text
    const [translation] = await translate.translate(text, targetLanguage);

    // Return the translated text
    return translation;
  } catch (error) {
    console.error('Error translating text:', error);
    throw error;
  }
}
// const englishText = 'Hello, world!';
// translateToTamil(englishText)
//   .then((tamilText) => {
//     console.log(`English: ${englishText}`);
//     console.log(`Tamil: ${tamilText}`);
//   })
//   .catch((error) => {
//     console.error('Translation error:', error);
//   });

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const instructionMessage: ChatCompletionRequestMessage = {
  role: "system",
  content: "You are a code generator. You must answer only in markdown code. Use comments for explanations"
}

export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",

      messages: [instructionMessage, ...messages]
    });

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.log('[CONVERSATION_ERROR]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};