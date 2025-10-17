export interface FAQ {
  id: string;
  q: string;
  a: string;
}

export interface WhyUs {
  id: string;
  title: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  slug?: string;
  image_url?: string;
  display_order?: number;
  created_at: string;
  updated_at: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  discount_price?: number;
  currency: string;
  image_url?: string;
  available: boolean;
  prep_time_minutes?: number; // Added this field
  category_id: string;
  categories?: Category; // Joined category data from Supabase
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  total?: number;
  pagination?: {
    limit: number;
    offset: number;
    total: number;
    pages: number;
  };
}

export interface CreateMenuItemRequest {
  name: string;
  description?: string;
  price: number;
  discount_price?: number;
  currency?: string;
  image_url?: string;
  available?: boolean;
  prep_time_minutes?: number; // Added this field
  category_id: string;
}

export interface UpdateMenuItemRequest {
  name?: string;
  description?: string;
  price?: number;
  discount_price?: number;
  currency?: string;
  image_url?: string;
  available?: boolean;
  prep_time_minutes?: number; // Added this field
  category_id?: string;
}

export interface BulkUpdateRequest {
  ids: string[];
  updates: Partial<UpdateMenuItemRequest>;
}

export interface BulkDeleteRequest {
  ids: string[];
}

export interface MenuFilters {
  category_id?: string;
  available?: boolean;
  featured?: boolean;
  tags?: string;
  currency?: string;
  min_price?: number;
  max_price?: number;
  max_prep_time?: number; // Filter by preparation time
  search?: string;
  limit?: number;
  offset?: number;
  sort?: 'name' | 'price' | 'prep_time_minutes' | 'created_at' | 'updated_at';
  order?: 'asc' | 'desc';
}
