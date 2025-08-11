import { productsApi } from '@/lib/api'

export interface Product {
  id: number
  name: string
  category: string
  price: number
  status: "In Stock" | "Low Stock" | "Out of Stock"
  image?: string
  specs?: string
  description?: string
  features?: string[]
  technical_specs?: Record<string, any>
  brand?: string
  model?: string
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  return await productsApi.getAll(category)
}

export async function getProductById(id: number): Promise<Product | undefined> {
  try {
    return await productsApi.getById(id)
  } catch {
    return undefined
  }
}

export async function getAllCategories(): Promise<string[]> {
  const products = await productsApi.getAll()
  return [...new Set(products.map((product: Product) => product.category))] as string[]
}