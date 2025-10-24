'use server';

import { suggestAgreementTerms } from '@/ai/flows/suggest-agreement-terms';
import { z } from 'zod';

const SuggestTermsStateSchema = z.object({
  suggestedTerms: z.string().optional(),
  error: z.string().optional(),
});

type SuggestTermsState = z.infer<typeof SuggestTermsStateSchema>;

export async function suggestTermsAction(
  prevState: SuggestTermsState,
  formData: FormData
): Promise<SuggestTermsState> {
  const agreementType = formData.get('agreementType') as string;

  if (!agreementType) {
    return { error: 'Agreement type is required to suggest terms.' };
  }

  try {
    const result = await suggestAgreementTerms({ agreementType });
    if (result.suggestedTerms) {
      return { suggestedTerms: result.suggestedTerms };
    }
    return { error: 'Could not generate suggestions. Please try again.' };
  } catch (e) {
    console.error(e);
    return { error: 'An unexpected error occurred while generating suggestions.' };
  }
}
