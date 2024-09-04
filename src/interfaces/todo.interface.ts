

export enum Status {
    'ToDo' = 'To Do',
    'InProgress' = 'In Progress',
    'Done' = 'Done'
}


export interface Todo {
    id: string;
    name: string;
    description: string;
    status: Status;
    dueDate: string;
}