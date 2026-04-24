import type { Product } from '../models/Product';
import type { IProductRepository } from '../../data/repositories/ProductRepository';

export class GetActiveProductsUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(): Promise<Product[]> {
    return await this.productRepository.getActiveProducts();
  }
}
