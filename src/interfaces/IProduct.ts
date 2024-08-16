import { ICategory } from "./ICategory";

export type TProductStatus = 'ACTIVE' | 'OUTOFSTOCK' | 'INACTIVE'

export interface IPostProduct {
    idCategory: number
    name: string
    description: string
    status: TProductStatus
    image?: BinaryType
    priceSmall?: number
    priceMedium?: number
    priceLarge?: number
    priceSingle?: number
}

export interface IPutProduct {
    idCategory?: number
    name?: string
    description?: string
    status?: TProductStatus
    image?: BinaryType
    priceSmall?: number
    priceMedium?: number
    priceLarge?: number
    priceSingle?: number
}

export interface IProduct {
    id: number
    idCategory: number
    name: string
    description: string
    status: TProductStatus
    category: ICategory
    imageUrl?: string
    priceSmall?: number
    priceMedium?: number
    priceLarge?: number
    priceSingle?: number
}
