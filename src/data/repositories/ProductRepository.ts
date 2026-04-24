import { supabase } from '../../lib/supabase';
import type { Product } from '../../domain/models/Product';

export interface IProductRepository {
  getProducts(): Promise<Product[]>;
  getActiveProducts(): Promise<Product[]>;
}

export class SupabaseProductRepository implements IProductRepository {
  private async mapToDomain(data: any[]): Promise<Product[]> {
    return data.map(item => ({
      id: item.id,
      title: item.title,
      category: item.category,
      price: item.price,
      imageUrl: item.image_url,
      link: item.link,
      fechaPublicacion: item.fecha_publicacion,
      isActive: item.is_active
    }));
  }

  async getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('fecha_publicacion', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      return [];
    }

    return this.mapToDomain(data);
  }

  async getActiveProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('fecha_publicacion', { ascending: false });

    if (error) {
      console.error('Error fetching active products:', error);
      return [];
    }

    return this.mapToDomain(data);
  }
}
