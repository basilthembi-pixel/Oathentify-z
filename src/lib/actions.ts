'use server';

import { suggestAgreementTerms } from '@/ai/flows/suggest-agreement-terms';

interface SuggestTermsState {
  suggestedTerms?: string;
  error?: string;
}

export async function suggestTermsAction(
  prevState: SuggestTermsState,
): Promise<SuggestTermsState> {
  // This function is now simplified as we handle form data in the component.
  // It expects the agreementType to be passed in the prevState object.
  const { agreementType } = prevState as { agreementType: string };

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
