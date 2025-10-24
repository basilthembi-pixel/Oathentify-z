'use server';

/**
 * @fileOverview AI-powered agreement term suggestion flow.
 *
 * - suggestAgreementTerms - A function that suggests relevant agreement terms based on the agreement type.
 * - SuggestAgreementTermsInput - The input type for the suggestAgreementTerms function.
 * - SuggestAgreementTermsOutput - The return type for the suggestAgreementTerms function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestAgreementTermsInputSchema = z.object({
  agreementType: z
    .string()
    .describe('The type of agreement for which terms are to be suggested.'),
});
export type SuggestAgreementTermsInput = z.infer<typeof SuggestAgreementTermsInputSchema>;

const SuggestAgreementTermsOutputSchema = z.object({
  suggestedTerms: z
    .string()
    .describe('AI suggested terms for the selected agreement type.'),
});
export type SuggestAgreementTermsOutput = z.infer<typeof SuggestAgreementTermsOutputSchema>;

export async function suggestAgreementTerms(
  input: SuggestAgreementTermsInput
): Promise<SuggestAgreementTermsOutput> {
  return suggestAgreementTermsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestAgreementTermsPrompt',
  input: {schema: SuggestAgreementTermsInputSchema},
  output: {schema: SuggestAgreementTermsOutputSchema},
  prompt: `You are an AI assistant specialized in suggesting terms for various types of agreements. Based on the provided agreement type, suggest relevant and comprehensive terms.

Agreement Type: {{{agreementType}}}

Suggested Terms:`,
});

const suggestAgreementTermsFlow = ai.defineFlow(
  {
    name: 'suggestAgreementTermsFlow',
    inputSchema: SuggestAgreementTermsInputSchema,
    outputSchema: SuggestAgreementTermsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
