'use server';

import { suggestAgreementTerms } from '@/ai/flows/suggest-agreement-terms';

interface SuggestTermsState {
  suggestedTerms?: string;
  error?: string;
}

interface SuggestTermsInput {
  agreementType: string;
}

export async function suggestTermsAction(
  input: SuggestTermsInput
): Promise<SuggestTermsState> {
  const { agreementType } = input;

  if (!agreementType) {
    return { error: 'Agreement type is required to suggest terms.' };
  }

  try {
    const result = await suggestAgreementTerms({ agreementType });
    if (result.suggestedTerms) {
      return { suggestedTerms: result.suggestedTerms };
    }
    return { error: 'Could not generate suggestions. Please try again.' };
  } catch (e: any) {
    console.error(e);
    return { error: e.message || 'An unexpected error occurred while generating suggestions.' };
  }
}
