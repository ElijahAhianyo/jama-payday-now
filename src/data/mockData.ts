
export interface User {
  id: string;
  nationalServiceId: string;
  name: string;
  position: string;
  institution: string;
  startDate: string;
  endDate: string;
  photoUrl: string;
  region: string;
  district: string;
  contact: string;
}

export interface PaymentMonth {
  id: number;
  month: string;
  year: number;
  amount: number;
  status: 'unpaid' | 'pending' | 'paid' | 'requested';
  dueDate: string;
}

export const users: { [id: string]: User } = {
  'NS12345': {
    id: '1',
    nationalServiceId: 'NS12345',
    name: 'Kwame Mensah',
    position: 'Teaching Assistant',
    institution: 'University of Ghana',
    startDate: '2023-09-01',
    endDate: '2024-08-31',
    photoUrl: '/placeholder.svg',
    region: 'Greater Accra',
    district: 'Accra Metropolitan',
    contact: '023-456-7890'
  },
  'NS67890': {
    id: '2',
    nationalServiceId: 'NS67890',
    name: 'Abena Owusu',
    position: 'Administrative Assistant',
    institution: 'Ghana Health Service',
    startDate: '2023-09-01',
    endDate: '2024-08-31',
    photoUrl: '/placeholder.svg',
    region: 'Ashanti',
    district: 'Kumasi Metropolitan',
    contact: '054-321-9876'
  }
};

export const paymentMonths: { [id: string]: PaymentMonth[] } = {
  '1': [
    { id: 1, month: 'September', year: 2023, amount: 559, status: 'paid', dueDate: '2023-10-15' },
    { id: 2, month: 'October', year: 2023, amount: 559, status: 'paid', dueDate: '2023-11-15' },
    { id: 3, month: 'November', year: 2023, amount: 559, status: 'unpaid', dueDate: '2023-12-15' },
    { id: 4, month: 'December', year: 2023, amount: 559, status: 'unpaid', dueDate: '2024-01-15' },
    { id: 5, month: 'January', year: 2024, amount: 559, status: 'unpaid', dueDate: '2024-02-15' },
    { id: 6, month: 'February', year: 2024, amount: 559, status: 'requested', dueDate: '2024-03-15' }
  ],
  '2': [
    { id: 1, month: 'September', year: 2023, amount: 559, status: 'paid', dueDate: '2023-10-15' },
    { id: 2, month: 'October', year: 2023, amount: 559, status: 'paid', dueDate: '2023-11-15' },
    { id: 3, month: 'November', year: 2023, amount: 559, status: 'paid', dueDate: '2023-12-15' },
    { id: 4, month: 'December', year: 2023, amount: 559, status: 'pending', dueDate: '2024-01-15' },
    { id: 5, month: 'January', year: 2024, amount: 559, status: 'unpaid', dueDate: '2024-02-15' },
    { id: 6, month: 'February', year: 2024, amount: 559, status: 'unpaid', dueDate: '2024-03-15' }
  ]
};
