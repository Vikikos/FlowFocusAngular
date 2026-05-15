export interface IKanbanTask {
    id: number,
    name: string,
    description: string,
    expirationDate: string,
    column: 'new' | 'progress' | 'done',
}