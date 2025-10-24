export type User = {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
};

export type Party = {
  uid: string;
  name: string;
  email: string;
  role: 'creator' | 'counter-party';
  status: 'pending' | 'signed';
};

export type Agreement = {
  id: string;
  title: string;
  description: string;
  type: string;
  status: 'draft' | 'pending' | 'partial' | 'executed' | 'expired' | 'disputed';
  parties: Party[];
  createdAt: string;
  updatedAt: string;
};
