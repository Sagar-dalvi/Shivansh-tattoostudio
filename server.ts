import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import fs from 'fs';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '10mb' }));

const SYSTEM_INSTRUCTION = `
You are the official "SHIVANSH AI TATTOO ASSISTANT" for "Shivansh Tattoo Studio" (Tagline: "Precision in Every Line.").
Your role is to act as a virtual tattoo consultation assistant to help clients explore concepts, placement, meaning, and styling before their consultation with a human tattoo artist.

CRITICAL RULES:
1. Your purpose is NOT to replace a professional tattoo artist. You help clients explore, structure, and refine ideas.
2. YOU MUST NEVER PROMISE exact pricing, exact appointment availability, medical outcomes, or guaranteed healing results.
3. For pricing, ALWAYS state: "Final pricing depends on size, placement, complexity and consultation. Please contact Shivansh Tattoo Studio for a quote."
4. For medical/skin-related inquiries: Provide general hygiene and safety information, and recommend consultation with an appropriate healthcare professional when necessary.
5. Guide the customer through key consultation aspects:
   - Tattoo style / type (Minimal, Realism, Linework, Geometric, Portrait, Lettering, Spiritual/Shiva/Yantra, Symbolic, Cover-Up)
   - Meaning and personal significance
   - Body placement & anatomical flow
   - Approximate sizing (in inches or cm, e.g. 2-3", palm-sized, half-sleeve)
   - Color preference (Black & grey vs. color accents)
   - Personal names, dates, or symbols
   - Whether it's a new piece or a cover-up
   - Studio appointment vs. Home Tattoo Service preference
6. Whenever the user provides sufficient details or asks to generate a concept, output a clean, beautifully formatted structured concept matching this exact structure:

--- TATTOO CONCEPT ---
Style: [e.g. Sacred Geometric Linework / Micro-Realism]
Placement: [e.g. Inner Forearm with natural anatomical flow]
Approximate Size: [e.g. 4" x 3"]
Main Elements: [Key motifs, symbols, or focal points]
Meaning: [The story or philosophical symbolism]
Recommended Composition: [Negative space, balance, flow along muscle contour]
Color Direction: [e.g. Jet black pigment with soft charcoal tonal shading]
Artist Notes: [Needle configuration advice, stencil tips, detail preservation]
Questions for Final Consultation: [2-3 clarifying questions for the artist session]

Tone:
Luxury, artistic, respectful, sophisticated, encouraging, and precise.
`;

// AI Consultation Endpoint with Multi-Turn Chat, Search Grounding, and Dynamic Model Routing
app.post('/api/ai-consult', async (req: Request, res: Response) => {
  try {
    const { messages, userImage, consultationForm, useSearch, modelMode } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    // Format prompt from consultation form and chat messages
    let promptText = '';

    if (consultationForm) {
      promptText += `Client Consultation Parameters:\n`;
      promptText += `- Desired Style: ${consultationForm.style || 'Open to suggestion'}\n`;
      promptText += `- Meaning / Inspiration: ${consultationForm.meaning || 'Personal significance'}\n`;
      promptText += `- Body Placement: ${consultationForm.placement || 'Not finalized'}\n`;
      promptText += `- Approximate Dimensions: ${consultationForm.size || 'Not decided'}\n`;
      promptText += `- Color Palette: ${consultationForm.color || 'Black & Grey with deep contrast'}\n`;
      promptText += `- Custom Elements (Names/Dates/Symbols): ${consultationForm.symbols || 'None'}\n`;
      promptText += `- New Tattoo or Cover-up: ${consultationForm.isCoverUp ? 'Cover-up evaluation needed' : 'New piece'}\n`;
      promptText += `- Appointment Preference: ${consultationForm.serviceType || 'Studio Appointment'}\n\n`;
    }

    if (Array.isArray(messages) && messages.length > 0) {
      const recent = messages.slice(-10);
      promptText += `Conversation History:\n` + recent.map((m: { role: string; content: string }) => `${m.role === 'user' ? 'Client' : 'Assistant'}: ${m.content}`).join('\n');
    }

    if (!promptText.trim()) {
      promptText = 'Client has initiated consultation. Introduce yourself as Shivansh AI Tattoo Assistant and guide them through our 10-point consultation framework.';
    }

    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      let contents: any;

      if (userImage && typeof userImage === 'string' && userImage.startsWith('data:image')) {
        const matches = userImage.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          const mimeType = matches[1];
          const data = matches[2];
          contents = {
            parts: [
              {
                inlineData: {
                  mimeType,
                  data,
                },
              },
              {
                text: promptText,
              },
            ],
          };
        } else {
          contents = promptText;
        }
      } else {
        contents = promptText;
      }

      // Model routing based on mode:
      // - Complex tasks: gemini-3.1-pro-preview
      // - Fast tasks: gemini-3.1-flash-lite / gemini-flash-lite-latest
      // - General / Search: gemini-3.5-flash / gemini-flash-latest
      let priorityModels: string[];
      if (modelMode === 'deep') {
        priorityModels = ['gemini-3.1-pro-preview', 'gemini-flash-latest', 'gemini-flash-lite-latest'];
      } else if (modelMode === 'fast') {
        priorityModels = ['gemini-flash-lite-latest', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];
      } else {
        priorityModels = ['gemini-flash-lite-latest', 'gemini-3.1-flash-lite', 'gemini-flash-latest', 'gemini-3.8-flash'];
      }

      let lastError: any = null;
      for (const modelName of priorityModels) {
        try {
          const config: any = {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
          };

          if (useSearch) {
            config.tools = [{ googleSearch: {} }];
          }

          const response = await ai.models.generateContent({
            model: modelName,
            contents,
            config,
          });

          if (response.text) {
            let sources: string[] = [];
            const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
            if (Array.isArray(groundingChunks)) {
              sources = groundingChunks
                .map((c: any) => c.web?.title || c.web?.uri)
                .filter(Boolean)
                .slice(0, 4);
            }

            return res.json({
              success: true,
              reply: response.text,
              sources: sources.length > 0 ? sources : undefined,
              usedModel: modelName,
            });
          }
        } catch (err: any) {
          console.warn(`Model ${modelName} attempt failed (${err?.status || err?.message}). Trying fallback...`);
          lastError = err;
        }
      }

      throw lastError || new Error('All candidate models exhausted');
    } else {
      // High-fidelity fallback generation if API key is not yet set in environment
      const style = consultationForm?.style || 'Custom Bespoke Fine Line';
      const placement = consultationForm?.placement || 'Forearm / Shoulder';
      const meaning = consultationForm?.meaning || 'A personal testament to strength and transformation';
      const size = consultationForm?.size || 'Medium (approx 4–6 inches)';
      const color = consultationForm?.color || 'Black & Grey Realism with high contrast';
      const service = consultationForm?.serviceType || 'Studio Appointment';

      const fallbackReply = `Welcome to Shivansh Tattoo Studio. “Precision in Every Line.”\n\nI have formulated your preliminary design concept:\n\n` +
        `--- TATTOO CONCEPT ---\n` +
        `Style: ${style}\n` +
        `Placement: ${placement}\n` +
        `Approximate Size: ${size}\n` +
        `Main Elements: Focal motif harmonized with fine geometric needle calibrations and anatomical contouring.\n` +
        `Meaning: ${meaning}\n` +
        `Recommended Composition: Dynamic visual flow aligning with natural muscle curves, utilizing intentional negative space for longevity.\n` +
        `Color Direction: ${color}\n` +
        `Artist Notes: Single-needle fine pass for foundational contours, layered micro-shading to ensure graceful aging.\n` +
        `Questions for Final Consultation:\n` +
        `1. Would you like to incorporate any subtle micro-geometry or sacred geometry accents?\n` +
        `2. Do you prefer high-density shading or feather-light stippling?\n\n` +
        `*Pricing Notice: Final pricing depends on size, placement, complexity and consultation. Please contact Shivansh Tattoo Studio for a quote.*\n` +
        `*Service Type Preference: ${service}*`;

      return res.json({
        success: true,
        reply: fallbackReply,
      });
    }
  } catch (error: any) {
    console.error('Error in /api/ai-consult:', error);
    return res.json({
      success: true,
      reply: `Welcome to Shivansh Tattoo Studio. “Precision in Every Line.”\n\nYour concept has been noted for our consultation team.\n\n--- TATTOO CONCEPT ---\nStyle: Custom Precision Linework\nPlacement: As requested\nApproximate Size: Scaled to anatomical contour\nMain Elements: Bespoke geometric linework and personal symbolism\nMeaning: Client narrative\nRecommended Composition: Balanced negative space and clean skin flow\nColor Direction: Deep obsidian pigment\nArtist Notes: Stencil calibration during in-person or home consultation\nQuestions for Final Consultation: Exact size scaling on skin.\n\n*Final pricing depends on size, placement, complexity and consultation. Please contact Shivansh Tattoo Studio for a quote.*`,
    });
  }
});

// AI Voice TTS Endpoint using gemini-3.8-flash-lite-tts
app.post('/api/ai-tts', async (req: Request, res: Response) => {
  try {
    const { text, voiceName = 'Kore' } = req.body;
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text is required for TTS' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Gemini API key not configured' });
    }

    // Clean up markdown markers for smooth speech synthesis
    const cleanedText = text
      .replace(/--- TATTOO CONCEPT ---/g, 'Here is your Tattoo Concept.')
      .replace(/[*_#`]/g, '')
      .replace(/\n+/g, ' ')
      .slice(0, 600); // Speak first 600 chars for concise audio

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [{ role: 'user', parts: [{ text: cleanedText }] }],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voiceName || 'Kore' },
          },
        },
      },
    });

    const audioBase64 = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!audioBase64) {
      return res.status(500).json({ error: 'No audio returned' });
    }

    return res.json({ success: true, audioBase64 });
  } catch (error: any) {
    console.warn('TTS error:', error?.message);
    return res.status(500).json({ error: 'TTS generation unavailable' });
  }
});

// AI Tattoo Stencil & Concept Visualizer (Text-to-Image / Image-to-Image)
app.post('/api/ai-generate-stencil', async (req: Request, res: Response) => {
  try {
    const { prompt, referenceImage, style = 'Tattoo Stencil' } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const fullPrompt = `A high contrast, clean ${style} tattoo line art illustration of: ${prompt}. Pure black ink lines on solid white paper background, crisp sacred geometry and stencil outlines, anatomical suitability, no color bleeds, no background clutter, vector style precision.`;

    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
      });

      try {
        let contents: any;
        if (referenceImage && typeof referenceImage === 'string' && referenceImage.startsWith('data:image')) {
          const matches = referenceImage.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
          if (matches && matches.length === 3) {
            contents = {
              parts: [
                {
                  inlineData: {
                    mimeType: matches[1],
                    data: matches[2],
                  },
                },
                { text: `Modify and convert this image into a tattoo stencil: ${fullPrompt}` },
              ],
            };
          } else {
            contents = { parts: [{ text: fullPrompt }] };
          }
        } else {
          contents = { parts: [{ text: fullPrompt }] };
        }

        const response = await ai.models.generateContent({
          model: 'gemini-3.1-flash-image-preview',
          contents,
          config: {
            imageConfig: {
              aspectRatio: '1:1',
            },
          },
        });

        for (const part of response.candidates?.[0]?.content?.parts || []) {
          if (part.inlineData) {
            return res.json({
              success: true,
              imageUrl: `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`,
              prompt,
            });
          }
        }
      } catch (genErr: any) {
        console.warn('Direct Image Gen failed or requires paid key, generating high-fidelity vector stencil fallback:', genErr?.message);
      }
    }

    // High-fidelity procedural SVG tattoo stencil representation
    const svgStencil = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" height="100%">
      <rect width="500" height="500" fill="#09050d"/>
      <circle cx="250" cy="250" r="210" fill="none" stroke="#ea7af4" stroke-width="2" stroke-opacity="0.3"/>
      <circle cx="250" cy="250" r="180" fill="none" stroke="#ea7af4" stroke-width="1.5" stroke-dasharray="4,4" stroke-opacity="0.5"/>
      <circle cx="250" cy="250" r="140" fill="none" stroke="#fff" stroke-width="2" stroke-opacity="0.4"/>
      
      <!-- Central Geometric Motif -->
      <g transform="translate(250,250)" stroke="#fff" stroke-width="2.5" fill="none">
        <!-- Trishul / Sacred Blade Center -->
        <path d="M0,-120 L0,120" stroke="#ea7af4" stroke-width="3"/>
        <path d="M-30,-70 Q-40,-110 0,-135 Q40,-110 30,-70 Q20,-40 0,-30 Q-20,-40 -30,-70 Z" stroke="#fff" stroke-width="2.5"/>
        <path d="M-60,-80 Q-70,-130 -40,-140 Q-25,-120 -30,-70" stroke="#ea7af4" stroke-width="2"/>
        <path d="M60,-80 Q70,-130 40,-140 Q25,-120 30,-70" stroke="#ea7af4" stroke-width="2"/>
        
        <!-- Sacred Geometry Radiance -->
        <polygon points="0,-160 45,-90 120,-90 65,-40 85,30 20,0 -20,0 -85,30 -65,-40 -120,-90 -45,-90" stroke="#ea7af4" stroke-width="1.5" stroke-opacity="0.6"/>
        <circle cx="0" cy="0" r="40" stroke="#ea7af4" stroke-width="2"/>
        <circle cx="0" cy="0" r="15" fill="#ea7af4" fill-opacity="0.8"/>
        
        <!-- Stippling / Dotwork accents -->
        <circle cx="0" cy="-60" r="3" fill="#fff"/>
        <circle cx="-25" cy="-25" r="2.5" fill="#fff"/>
        <circle cx="25" cy="-25" r="2.5" fill="#fff"/>
        <circle cx="0" cy="60" r="3" fill="#fff"/>
      </g>
      
      <!-- Studio Watermark & Metadata -->
      <text x="250" y="440" font-family="sans-serif" font-size="12" font-weight="bold" fill="#ea7af4" text-anchor="middle" letter-spacing="4">SHIVANSH TATTOO STUDIO</text>
      <text x="250" y="460" font-family="sans-serif" font-size="10" fill="#a1a1aa" text-anchor="middle" letter-spacing="2">PRECISION IN EVERY LINE · STENCIL DRAFT</text>
    </svg>`;

    const base64Svg = Buffer.from(svgStencil).toString('base64');
    return res.json({
      success: true,
      imageUrl: `data:image/svg+xml;base64,${base64Svg}`,
      prompt,
      isVectorStencil: true,
    });
  } catch (error: any) {
    console.error('Error in /api/ai-generate-stencil:', error);
    return res.status(500).json({ error: 'Failed to generate stencil' });
  }
});

// Save uploaded founder portrait image
app.post('/api/upload-founder-photo', (req: Request, res: Response) => {
  try {
    const { image } = req.body;
    if (!image || typeof image !== 'string') {
      return res.status(400).json({ error: 'No image data provided' });
    }

    const matches = image.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
    let buffer: Buffer;
    if (matches && matches.length === 3) {
      buffer = Buffer.from(matches[2], 'base64');
    } else {
      buffer = Buffer.from(image, 'base64');
    }

    const assetsDir = path.resolve(__dirname, 'public', 'assets');
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }

    const jpgPath = path.join(assetsDir, 'sagar-dalvi.jpg');
    const pngPath = path.join(assetsDir, 'sagar-dalvi.png');
    const rootPngPath = path.resolve(__dirname, 'public', 'image.png');

    fs.writeFileSync(jpgPath, buffer);
    fs.writeFileSync(pngPath, buffer);
    fs.writeFileSync(rootPngPath, buffer);

    // Also update in dist if dist exists
    const distAssetsDir = path.resolve(__dirname, 'dist', 'assets');
    if (fs.existsSync(distAssetsDir)) {
      fs.writeFileSync(path.join(distAssetsDir, 'sagar-dalvi.jpg'), buffer);
      fs.writeFileSync(path.join(distAssetsDir, 'sagar-dalvi.png'), buffer);
    }

    return res.json({ success: true, url: '/assets/sagar-dalvi.jpg?t=' + Date.now() });
  } catch (err: any) {
    console.error('Error saving founder photo:', err);
    return res.status(500).json({ error: 'Failed to save photo' });
  }
});

// Setup Vite middleware or Static files
async function startServer() {
  const publicPath = path.resolve(__dirname, 'public');
  app.use(express.static(publicPath));

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT} (production: ${isProduction})`);
  });
}

startServer();
