import { Agreement } from './types';
import { PlaceHolderImages } from './placeholder-images';

export const DUMMY_AGREEMENTS: Agreement[] = [
  {
    id: 'agr-1',
    title: 'Freelance Design Services',
    description: 'Agreement for UI/UX design services for the new mobile app.',
    type: 'Service',
    status: 'pending',
    parties: [
      { uid: 'user-1', name: 'Alex Doe', email: 'alex.doe@example.com', role: 'creator', status: 'signed' },
      { uid: 'user-2', name: 'Bob Smith', email: 'bob.smith@example.com', role: 'counter-party', status: 'pending' },
    ],
    createdAt: '2024-07-20T10:00:00Z',
    updatedAt: '2024-07-20T10:05:00Z',
  },
  {
    id: 'agr-2',
    title: 'Apartment Lease Agreement',
    description: '12-month lease for apartment #4B.',
    type: 'Lease',
    status: 'executed',
    parties: [
      { uid: 'user-1', name: 'Alex Doe', email: 'alex.doe@example.com', role: 'counter-party', status: 'signed' },
      { uid: 'user-3', name: 'Charlie Brown', email: 'charlie.brown@example.com', role: 'creator', status: 'signed' },
    ],
    createdAt: '2024-07-15T14:30:00Z',
    updatedAt: '2024-07-16T09:00:00Z',
  },
  {
    id: 'agr-3',
    title: 'Project Alpha NDA',
    description: 'Non-Disclosure Agreement for a confidential project.',
    type: 'NDA',
    status: 'partial',
    parties: [
      { uid: 'user-4', name: 'Diana Prince', email: 'diana.prince@example.com', role: 'creator', status: 'signed' },
      { uid: 'user-1', name: 'Alex Doe', email: 'alex.doe@example.com', role: 'counter-party', status: 'pending' },
    ],
    createdAt: '2024-07-18T11:00:00Z',
    updatedAt: '2024-07-18T11:00:00Z',
  },
  {
    id: 'agr-4',
    title: 'Personal Loan',
    description: 'Loan of $5,000 to be repaid in 12 monthly installments.',
    type: 'Loan',
    status: 'expired',
    parties: [
      { uid: 'user-5', name: 'Eve Adams', email: 'eve.adams@example.com', role: 'creator', status: 'signed' },
      { uid: 'user-1', name: 'Alex Doe', email: 'alex.doe@example.com', role: 'counter-party', status: 'pending' },
    ],
    createdAt: '2024-06-01T09:00:00Z',
    updatedAt: '2024-06-01T09:00:00Z',
  },
];

export const AGREEMENT_TYPES = [
    'Loan',
    'Service',
    'Partnership',
    'NDA',
    'Lease',
    'Custom'
];
