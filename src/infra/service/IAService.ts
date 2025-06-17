import { GoogleGenAI } from '@google/genai';
import { IaServiceInterface } from './interface/IaServiceInterface';

export class OpenIAService implements IaServiceInterface {
  private readonly openAI = new GoogleGenAI({ apiKey: process.env.OPEN_AI_KEY });

  async improveText(originalText: string): Promise<string> {
    const prompt = `Melhore a clareza e a gramática do seguinte laudo médico sem alterar o conteúdo técnico, trazer resposta única:\n\n"${originalText}"`;

    const response = await this.openAI.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    const improved = response.text;
    return improved?.trim() || '';
  }
}
