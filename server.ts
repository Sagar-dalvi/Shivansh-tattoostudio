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

// AI Consultation Endpoint
app.post('/api/ai-consult', async (req: Request, res: Response) => {
  try {
    const { messages, userImage, consultationForm } = req.body;
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
      const recent = messages.slice(-8);
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

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const reply = response.text || 'Thank you for sharing your concept. Our artists will craft it with precision.';
      return res.json({ success: true, reply });
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
    // Even if remote Gemini network error occurs, return graceful response
    return res.json({
      success: true,
      reply: `Welcome to Shivansh Tattoo Studio. “Precision in Every Line.”\n\nYour concept has been noted for our consultation team.\n\n--- TATTOO CONCEPT ---\nStyle: Custom Precision Linework\nPlacement: As requested\nApproximate Size: Scaled to anatomical contour\nMain Elements: Bespoke geometric linework and personal symbolism\nMeaning: Client narrative\nRecommended Composition: Balanced negative space and clean skin flow\nColor Direction: Deep obsidian pigment\nArtist Notes: Stencil calibration during in-person or home consultation\nQuestions for Final Consultation: Exact size scaling on skin.\n\n*Final pricing depends on size, placement, complexity and consultation. Please contact Shivansh Tattoo Studio for a quote.*`,
    });
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
