import { OpenAI } from 'openai';
import { IaServiceInterface } from './interface/IaServiceInterface';


export class OpenIAService implements IaServiceInterface {
    private readonly openAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    async improveText(originalText: string): Promise<string> {
        const prompt = `Melhore a clareza e a gramática do seguinte laudo médico sem alterar o conteúdo técnico:\n\n"${originalText}"`;

        const response = await this.openAI.chat.completions.create({
            model: 'gpt-4o-mini',
            store: true,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
        });

        const improved = response.choices[0].message.content;
        return improved?.trim() || '';
    }
}
