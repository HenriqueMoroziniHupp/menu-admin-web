import { ICategory } from "./ICategory";

export type TProductStatus = 'ACTIVE' | 'OUTOFSTOCK' | 'INACTIVE'

export interface IProduct {
    id?: number
    idCategory?: number
    name?: string
    description?: string
    status?: TProductStatus
    category?: ICategory
    imageUrl?: string
    image?: File
    priceSmall?: number
    priceMedium?: number
    priceLarge?: number
    priceSingle?: number
}

export interface IProdByCat {
    id: number,
    name: string,
    status: string,
    products: IProduct[]
}
