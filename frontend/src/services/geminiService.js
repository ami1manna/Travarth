
const GEMINI_API_KEY = 'AIzaSyA88srZwqJVOE_F0x0Sus0BX_7zVJhGR8w'; 

// Using Gemini Flash API endpoint (update to the correct endpoint once available)
const GEMINI_FLASH_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

/**
 * Generates a response using Google's Gemini Flash API
 * 
 * @param {string} prompt - The prompt to send to Gemini Flash API
 * @returns {Promise<string>} - The generated response
 */
export const generateGeminiFlashResponse = async (prompt) => {
  try {
    const response = await fetch(`${GEMINI_FLASH_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.4,  // Lower temperature for more focused responses
          topK: 32,
          topP: 0.9,
          maxOutputTokens: 400,  // Shorter responses for faster generation
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Gemini API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    
    // Extract the generated text from the response
    const generatedText = data.candidates[0].content.parts[0].text;
    
    return generatedText;
  } catch (error) {
    console.error('Error calling Gemini Flash API:', error);
    throw error;
  }
};

/**
 * Stream responses from Gemini Flash API for more responsive UI
 * 
 * @param {string} prompt - The prompt to send to Gemini Flash API
 * @param {function} onChunkReceived - Callback function to handle text chunks as they arrive
 * @returns {Promise<string>} - The complete generated response
 */
export const streamGeminiFlashResponse = async (prompt, onChunkReceived) => {
  try {
    const response = await fetch(`${GEMINI_FLASH_API_URL}?key=${GEMINI_API_KEY}&alt=sse`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.4,
          topK: 32,
          topP: 0.9,
          maxOutputTokens: 400,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Gemini API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let completeResponse = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value, { stream: true });
      
      // Parse the SSE data
      const lines = chunk.split('\n');
      let textChunk = '';
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = JSON.parse(line.substring(6));
          if (data.candidates && data.candidates[0].content.parts[0].text) {
            textChunk += data.candidates[0].content.parts[0].text;
          }
        }
      }
      
      if (textChunk) {
        onChunkReceived(textChunk);
        completeResponse += textChunk;
      }
    }
    
    return completeResponse;
  } catch (error) {
    console.error('Error streaming from Gemini Flash API:', error);
    throw error;
  }
};

/**
 * Initialize the travel guide bot with specific context
 * 
 * @returns {Promise<string>} - The initialization response
 */
export const initializeTravelGuideBot = async () => {
  const systemPrompt = `
    You are a helpful travel guide assistant powered by Gemini Flash. Your job is to:
    - Provide accurate, concise information about travel destinations
    - Suggest key attractions, accommodations, and activities
    - Offer brief tips on local customs, transportation, and safety
    - Help with travel planning and quick itinerary suggestions
    - Be friendly, helpful, and very concise in your responses
    
    When responding about a destination:
    1. Include only the most essential attractions
    2. Mention best times to visit
    3. Provide 1-2 practical travel tips
    
    Keep responses very brief and focused - users appreciate quick, helpful information.
  `;
  
  return generateGeminiFlashResponse(systemPrompt);
};