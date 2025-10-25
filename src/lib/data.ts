import { Agreement } from './types';
import { PlaceHolderImages } from './placeholder-images';

export const DUMMY_AGREEMENTS: Agreement[] = [
  {
    id: 'agr-1',
    title: 'Freelance Design Services',
    description: 'This Agreement is made and entered into as of the effective date by and between the Client and the Designer. The Client hereby engages the Designer to provide design services as outlined in Exhibit A. The Designer agrees to provide such services in a professional and timely manner. The Client agrees to pay the Designer the fees as set forth in Exhibit B. This Agreement constitutes the entire agreement between the parties.',
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
    description: 'This Lease Agreement is entered into between Landlord and Tenant for the lease of the property located at 123 Main St, Anytown, USA. The term of this lease shall be for 12 months, beginning on August 1, 2024. Rent shall be $1,500 per month, due on the 1st of each month. A security deposit of $1,500 is required. Tenant shall not make any alterations to the premises without prior written consent of the Landlord.',
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
    description: 'This Non-Disclosure Agreement is to protect the "Confidential Information" (as defined below) which may be disclosed by the Disclosing Party to the Receiving Party in connection with the potential business relationship between the parties. The Receiving Party shall use the Confidential Information solely for the purpose of evaluating the potential business relationship and shall not disclose the Confidential Information to any third party without the prior written consent of the Disclosing Party.',
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
    description: 'This Loan Agreement is made between the Lender and the Borrower. The Lender agrees to loan the Borrower the principal sum of $5,000. The Borrower agrees to repay the principal sum, plus interest at a rate of 5% per annum, in 12 equal monthly installments. The first payment shall be due on July 1, 2024.',
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
