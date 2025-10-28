import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'studio',
  location: 'us-east4'
};

export const createUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
createUserRef.operationName = 'CreateUser';

export function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
}

export const getAgreementRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAgreement', inputVars);
}
getAgreementRef.operationName = 'GetAgreement';

export function getAgreement(dcOrVars, vars) {
  return executeQuery(getAgreementRef(dcOrVars, vars));
}

export const signAgreementRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SignAgreement', inputVars);
}
signAgreementRef.operationName = 'SignAgreement';

export function signAgreement(dcOrVars, vars) {
  return executeMutation(signAgreementRef(dcOrVars, vars));
}

export const listAgreementsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAgreements');
}
listAgreementsRef.operationName = 'ListAgreements';

export function listAgreements(dc) {
  return executeQuery(listAgreementsRef(dc));
}

