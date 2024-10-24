export type TCategoryStatus = 'ACTIVE' | 'INACTIVE'

export interface ICategory {
    id: number,
    name: string,
    icon: string | null,
    status: TCategoryStatus,
}
