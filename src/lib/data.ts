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
    mode: 'corporate',
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
    mode: 'corporate',
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
    mode: 'corporate',
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
    mode: 'corporate',
  },
  {
    id: 'agr-5',
    title: 'Pizza Friday Repayment',
    description: 'I, Bob, promise to pay Alex back $25 for the pizza we shared last Friday. I will pay this back by the end of the day tomorrow.',
    type: 'Paying back a friend 💰',
    status: 'executed',
    parties: [
      { uid: 'user-1', name: 'Alex Doe', email: 'alex.doe@example.com', role: 'creator', status: 'signed' },
      { uid: 'user-2', name: 'Bob Smith', email: 'bob.smith@example.com', role: 'counter-party', status: 'signed' },
    ],
    createdAt: '2024-07-21T12:00:00Z',
    updatedAt: '2024-07-21T12:05:00Z',
    mode: 'casual',
  },
  {
    id: 'agr-6',
    title: 'Gym Buddy Pact',
    description: 'We, Diana and Charlie, promise to go to the gym together three times a week (Mon, Wed, Fri) for the next month to keep each other motivated.',
    type: 'Workout buddy pact 💪',
    status: 'pending',
    parties: [
      { uid: 'user-4', name: 'Diana Prince', email: 'diana.prince@example.com', role: 'creator', status: 'signed' },
      { uid: 'user-3', name: 'Charlie Brown', email: 'charlie.brown@example.com', role: 'counter-party', status: 'pending' },
    ],
    createdAt: '2024-07-22T08:00:00Z',
    updatedAt: '2024-07-22T08:00:00Z',
    mode: 'casual',
  },
  {
    id: 'agr-7',
    title: 'Our Moving In Together Pact',
    description: 'We agree to split rent 50/50. John will handle utilities, and Sarah will handle groceries. We will alternate cleaning the kitchen and bathroom weekly. This is our exciting first step together!',
    type: 'Living Together',
    status: 'pending',
    parties: [
      { uid: 'user-1', name: 'Sarah', email: 'sarah@example.com', role: 'creator', status: 'signed' },
      { uid: 'user-2', name: 'John', email: 'john@example.com', role: 'counter-party', status: 'pending' },
    ],
    createdAt: '2024-07-25T18:00:00Z',
    updatedAt: '2024-07-25T18:00:00Z',
    mode: 'relationship',
  },
  {
    id: 'agr-8',
    title: 'Financial Goals for 2024',
    description: 'We commit to saving $500 each month for our vacation fund. We will have monthly check-ins on the 1st to review our budget and progress towards our shared goals.',
    type: 'Money & Finances',
    status: 'executed',
    parties: [
      { uid: 'user-1', name: 'Sarah', email: 'sarah@example.com', role: 'creator', status: 'signed' },
      { uid: 'user-2', name: 'John', email: 'john@example.com', role: 'counter-party', status: 'signed' },
    ],
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T11:00:00Z',
    mode: 'relationship',
  },
  {
    id: 'agr-9',
    title: 'Social Media Boundaries',
    description: 'We agree to ask for consent before posting photos of each other on social media. We will maintain a united and positive front online, and discuss any concerns privately.',
    type: 'Social Life & Boundaries',
    status: 'partial',
    parties: [
      { uid: 'user-1', name: 'Sarah', email: 'sarah@example.com', role: 'creator', status: 'signed' },
      { uid: 'user-2', name: 'John', email: 'john@example.com', role: 'counter-party', status: 'pending' },
    ],
    createdAt: '2024-05-10T15:00:00Z',
    updatedAt: '2024-05-10T15:00:00Z',
    mode: 'relationship',
  },
  {
    id: 'agr-10',
    title: 'Old Holiday Plans 2023',
    description: 'This was our agreement for splitting holidays in 2023. We agreed to spend Thanksgiving with one family and Christmas with the other. This has now expired and needs a new version for 2024.',
    type: 'Family & In-Laws',
    status: 'expired',
    parties: [
      { uid: 'user-1', name: 'Sarah', email: 'sarah@example.com', role: 'creator', status: 'signed' },
      { uid: 'user-2', name: 'John', email: 'john@example.com', role: 'counter-party', status: 'signed' },
    ],
    createdAt: '2023-11-01T12:00:00Z',
    updatedAt: '2023-12-31T23:59:59Z',
    mode: 'relationship',
  }
];

export const AGREEMENT_TYPES = [
    'Loan',
    'Service',
    'Partnership',
    'NDA',
    'Lease',
    'Custom'
];
