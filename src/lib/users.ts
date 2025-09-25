
export type Department = 'ADMIN' | 'PLANNING' | 'SPA/MKT' | 'IMPROVEMENT' | 'HQ/Control';

export type User = {
    id: string;
    name: string;
    email: string;
    role: 'Admin' | 'Manager' | 'Auditor';
    department: Department;
    avatarId: string;
};

export const users: User[] = [
    { id: 'USR-001', name: 'Olivia Martin', email: 'olivia.martin@email.com', role: 'Admin', department: 'ADMIN', avatarId: 'user-avatar-2' },
    { id: 'USR-002', name: 'Jackson Lee', email: 'jackson.lee@email.com', role: 'Manager', department: 'PLANNING', avatarId: 'user-avatar-3' },
    { id: 'USR-003', name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', role: 'Manager', department: 'SPA/MKT', avatarId: 'user-avatar-4' },
    { id: 'USR-004', name: 'William Kim', email: 'will@email.com', role: 'Auditor', department: 'IMPROVEMENT', avatarId: 'user-avatar-5' },
    { id: 'USR-005', name: 'Sofia Davis', email: 'sofia.davis@email.com', role: 'Auditor', department: 'HQ/Control', avatarId: 'user-avatar-6' },
  ];
  
