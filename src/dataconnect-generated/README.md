# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetAgreement*](#getagreement)
  - [*ListAgreements*](#listagreements)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*SignAgreement*](#signagreement)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetAgreement
You can execute the `GetAgreement` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getAgreement(vars: GetAgreementVariables): QueryPromise<GetAgreementData, GetAgreementVariables>;

interface GetAgreementRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAgreementVariables): QueryRef<GetAgreementData, GetAgreementVariables>;
}
export const getAgreementRef: GetAgreementRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAgreement(dc: DataConnect, vars: GetAgreementVariables): QueryPromise<GetAgreementData, GetAgreementVariables>;

interface GetAgreementRef {
  ...
  (dc: DataConnect, vars: GetAgreementVariables): QueryRef<GetAgreementData, GetAgreementVariables>;
}
export const getAgreementRef: GetAgreementRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAgreementRef:
```typescript
const name = getAgreementRef.operationName;
console.log(name);
```

### Variables
The `GetAgreement` query requires an argument of type `GetAgreementVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetAgreementVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetAgreement` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAgreementData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetAgreement`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAgreement, GetAgreementVariables } from '@dataconnect/generated';

// The `GetAgreement` query requires an argument of type `GetAgreementVariables`:
const getAgreementVars: GetAgreementVariables = {
  id: ..., 
};

// Call the `getAgreement()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAgreement(getAgreementVars);
// Variables can be defined inline as well.
const { data } = await getAgreement({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAgreement(dataConnect, getAgreementVars);

console.log(data.agreement);

// Or, you can use the `Promise` API.
getAgreement(getAgreementVars).then((response) => {
  const data = response.data;
  console.log(data.agreement);
});
```

### Using `GetAgreement`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAgreementRef, GetAgreementVariables } from '@dataconnect/generated';

// The `GetAgreement` query requires an argument of type `GetAgreementVariables`:
const getAgreementVars: GetAgreementVariables = {
  id: ..., 
};

// Call the `getAgreementRef()` function to get a reference to the query.
const ref = getAgreementRef(getAgreementVars);
// Variables can be defined inline as well.
const ref = getAgreementRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAgreementRef(dataConnect, getAgreementVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.agreement);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.agreement);
});
```

## ListAgreements
You can execute the `ListAgreements` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAgreements(): QueryPromise<ListAgreementsData, undefined>;

interface ListAgreementsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAgreementsData, undefined>;
}
export const listAgreementsRef: ListAgreementsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAgreements(dc: DataConnect): QueryPromise<ListAgreementsData, undefined>;

interface ListAgreementsRef {
  ...
  (dc: DataConnect): QueryRef<ListAgreementsData, undefined>;
}
export const listAgreementsRef: ListAgreementsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAgreementsRef:
```typescript
const name = listAgreementsRef.operationName;
console.log(name);
```

### Variables
The `ListAgreements` query has no variables.
### Return Type
Recall that executing the `ListAgreements` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAgreementsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListAgreementsData {
  agreements: ({
    id: UUIDString;
    title: string;
    status: string;
    createdAt: TimestampString;
    updatedAt?: TimestampString | null;
  } & Agreement_Key)[];
}
```
### Using `ListAgreements`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAgreements } from '@dataconnect/generated';


// Call the `listAgreements()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAgreements();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAgreements(dataConnect);

console.log(data.agreements);

// Or, you can use the `Promise` API.
listAgreements().then((response) => {
  const data = response.data;
  console.log(data.agreements);
});
```

### Using `ListAgreements`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAgreementsRef } from '@dataconnect/generated';


// Call the `listAgreementsRef()` function to get a reference to the query.
const ref = listAgreementsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAgreementsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.agreements);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.agreements);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation requires an argument of type `CreateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateUserVariables {
  email: string;
  displayName?: string | null;
}
```
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  email: ..., 
  displayName: ..., // optional
};

// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser(createUserVars);
// Variables can be defined inline as well.
const { data } = await createUser({ email: ..., displayName: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect, createUserVars);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser(createUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  email: ..., 
  displayName: ..., // optional
};

// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef(createUserVars);
// Variables can be defined inline as well.
const ref = createUserRef({ email: ..., displayName: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect, createUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## SignAgreement
You can execute the `SignAgreement` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
signAgreement(vars: SignAgreementVariables): MutationPromise<SignAgreementData, SignAgreementVariables>;

interface SignAgreementRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SignAgreementVariables): MutationRef<SignAgreementData, SignAgreementVariables>;
}
export const signAgreementRef: SignAgreementRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
signAgreement(dc: DataConnect, vars: SignAgreementVariables): MutationPromise<SignAgreementData, SignAgreementVariables>;

interface SignAgreementRef {
  ...
  (dc: DataConnect, vars: SignAgreementVariables): MutationRef<SignAgreementData, SignAgreementVariables>;
}
export const signAgreementRef: SignAgreementRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the signAgreementRef:
```typescript
const name = signAgreementRef.operationName;
console.log(name);
```

### Variables
The `SignAgreement` mutation requires an argument of type `SignAgreementVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SignAgreementVariables {
  partyId: UUIDString;
  signatureData: string;
  ipAddress: string;
}
```
### Return Type
Recall that executing the `SignAgreement` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SignAgreementData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SignAgreementData {
  signatureEvent_insert: SignatureEvent_Key;
}
```
### Using `SignAgreement`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, signAgreement, SignAgreementVariables } from '@dataconnect/generated';

// The `SignAgreement` mutation requires an argument of type `SignAgreementVariables`:
const signAgreementVars: SignAgreementVariables = {
  partyId: ..., 
  signatureData: ..., 
  ipAddress: ..., 
};

// Call the `signAgreement()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await signAgreement(signAgreementVars);
// Variables can be defined inline as well.
const { data } = await signAgreement({ partyId: ..., signatureData: ..., ipAddress: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await signAgreement(dataConnect, signAgreementVars);

console.log(data.signatureEvent_insert);

// Or, you can use the `Promise` API.
signAgreement(signAgreementVars).then((response) => {
  const data = response.data;
  console.log(data.signatureEvent_insert);
});
```

### Using `SignAgreement`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, signAgreementRef, SignAgreementVariables } from '@dataconnect/generated';

// The `SignAgreement` mutation requires an argument of type `SignAgreementVariables`:
const signAgreementVars: SignAgreementVariables = {
  partyId: ..., 
  signatureData: ..., 
  ipAddress: ..., 
};

// Call the `signAgreementRef()` function to get a reference to the mutation.
const ref = signAgreementRef(signAgreementVars);
// Variables can be defined inline as well.
const ref = signAgreementRef({ partyId: ..., signatureData: ..., ipAddress: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = signAgreementRef(dataConnect, signAgreementVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.signatureEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.signatureEvent_insert);
});
```

