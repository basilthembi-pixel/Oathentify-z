import { CreateUserData, CreateUserVariables, GetAgreementData, GetAgreementVariables, SignAgreementData, SignAgreementVariables, ListAgreementsData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, CreateUserVariables>): UseDataConnectMutationResult<CreateUserData, CreateUserVariables>;

export function useGetAgreement(vars: GetAgreementVariables, options?: useDataConnectQueryOptions<GetAgreementData>): UseDataConnectQueryResult<GetAgreementData, GetAgreementVariables>;
export function useGetAgreement(dc: DataConnect, vars: GetAgreementVariables, options?: useDataConnectQueryOptions<GetAgreementData>): UseDataConnectQueryResult<GetAgreementData, GetAgreementVariables>;

export function useSignAgreement(options?: useDataConnectMutationOptions<SignAgreementData, FirebaseError, SignAgreementVariables>): UseDataConnectMutationResult<SignAgreementData, SignAgreementVariables>;
export function useSignAgreement(dc: DataConnect, options?: useDataConnectMutationOptions<SignAgreementData, FirebaseError, SignAgreementVariables>): UseDataConnectMutationResult<SignAgreementData, SignAgreementVariables>;

export function useListAgreements(options?: useDataConnectQueryOptions<ListAgreementsData>): UseDataConnectQueryResult<ListAgreementsData, undefined>;
export function useListAgreements(dc: DataConnect, options?: useDataConnectQueryOptions<ListAgreementsData>): UseDataConnectQueryResult<ListAgreementsData, undefined>;
