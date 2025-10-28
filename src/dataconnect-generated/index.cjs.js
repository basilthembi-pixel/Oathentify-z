const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'studio',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
createUserRef.operationName = 'CreateUser';
exports.createUserRef = createUserRef;

exports.createUser = function createUser(dcOrVars, vars) {
  return executeMutation(createUserRef(dcOrVars, vars));
};

const getAgreementRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAgreement', inputVars);
}
getAgreementRef.operationName = 'GetAgreement';
exports.getAgreementRef = getAgreementRef;

exports.getAgreement = function getAgreement(dcOrVars, vars) {
  return executeQuery(getAgreementRef(dcOrVars, vars));
};

const signAgreementRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SignAgreement', inputVars);
}
signAgreementRef.operationName = 'SignAgreement';
exports.signAgreementRef = signAgreementRef;

exports.signAgreement = function signAgreement(dcOrVars, vars) {
  return executeMutation(signAgreementRef(dcOrVars, vars));
};

const listAgreementsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAgreements');
}
listAgreementsRef.operationName = 'ListAgreements';
exports.listAgreementsRef = listAgreementsRef;

exports.listAgreements = function listAgreements(dc) {
  return executeQuery(listAgreementsRef(dc));
};
