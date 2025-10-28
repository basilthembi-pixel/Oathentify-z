import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Agreement_Key {
  id: UUIDString;
  __typename?: 'Agreement_Key';
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  email: string;
  displayName?: string | null;
}

export interface GetAgreementData {
  agreement?: {
    id: UUIDString;
    title: string;
    agreementText: string;
    status: string;
    createdAt: TimestampString;
    updatedAt?: TimestampString | null;
    creator: {
      id: UUIDString;
      email: string;
    } & User_Key;
      parties_on_agreement: ({
        id: UUIDString;
        name: string;
        email: string;
        role: string;
        signature?: string | null;
        signedAt?: TimestampString | null;
      } & Party_Key)[];
        signatureEvents_on_agreement: ({
          id: UUIDString;
          ipAddress?: string | null;
          signatureData: string;
          signedAt: TimestampString;
        } & SignatureEvent_Key)[];
  } & Agreement_Key;
}

export interface GetAgreementVariables {
  id: UUIDString;
}

export interface ListAgreementsData {
  agreements: ({
    id: UUIDString;
    title: string;
    status: string;
    createdAt: TimestampString;
    updatedAt?: TimestampString | null;
  } & Agreement_Key)[];
}

export interface Party_Key {
  id: UUIDString;
  __typename?: 'Party_Key';
}

export interface SignAgreementData {
  signatureEvent_insert: SignatureEvent_Key;
}

export interface SignAgreementVariables {
  partyId: UUIDString;
  signatureData: string;
  ipAddress: string;
}

export interface SignatureEvent_Key {
  id: UUIDString;
  __typename?: 'SignatureEvent_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface GetAgreementRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAgreementVariables): QueryRef<GetAgreementData, GetAgreementVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetAgreementVariables): QueryRef<GetAgreementData, GetAgreementVariables>;
  operationName: string;
}
export const getAgreementRef: GetAgreementRef;

export function getAgreement(vars: GetAgreementVariables): QueryPromise<GetAgreementData, GetAgreementVariables>;
export function getAgreement(dc: DataConnect, vars: GetAgreementVariables): QueryPromise<GetAgreementData, GetAgreementVariables>;

interface SignAgreementRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SignAgreementVariables): MutationRef<SignAgreementData, SignAgreementVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SignAgreementVariables): MutationRef<SignAgreementData, SignAgreementVariables>;
  operationName: string;
}
export const signAgreementRef: SignAgreementRef;

export function signAgreement(vars: SignAgreementVariables): MutationPromise<SignAgreementData, SignAgreementVariables>;
export function signAgreement(dc: DataConnect, vars: SignAgreementVariables): MutationPromise<SignAgreementData, SignAgreementVariables>;

interface ListAgreementsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAgreementsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAgreementsData, undefined>;
  operationName: string;
}
export const listAgreementsRef: ListAgreementsRef;

export function listAgreements(): QueryPromise<ListAgreementsData, undefined>;
export function listAgreements(dc: DataConnect): QueryPromise<ListAgreementsData, undefined>;

