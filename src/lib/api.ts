import type { MenuItem, ApiResponse, MenuFilters, CreateMenuItemRequest, UpdateMenuItemRequest, BulkUpdateRequest, BulkDeleteRequest, Category } from '@/types/content';

const API_BASE = '/api';

export const menuApi = {
  // Get all menu items with filters
  getAll: async (filters?: MenuFilters): Promise<ApiResponse<MenuItem[]>> => {
    try {
      const params = new URLSearchParams();
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, value.toString());
          }
        });
      }

      const url = `${API_BASE}/menu${params.toString() ? `?${params.toString()}` : ''}`;
      const response = await fetch(url, {
        cache: 'no-store' // Fresh data each time
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching menu items:', error);
      return { 
        success: false, 
        error: 'Failed to fetch menu items',
        data: []
      };
    }
  },

  // Get single menu item by ID
  getById: async (id: string): Promise<ApiResponse<MenuItem>> => {
    try {
      const response = await fetch(`${API_BASE}/menu/${id}`, {
        cache: 'no-store'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching menu item:', error);
      return { 
        success: false, 
        error: 'Failed to fetch menu item' 
      };
    }
  },

  // Create new menu item
  create: async (menuItem: CreateMenuItemRequest): Promise<ApiResponse<MenuItem>> => {
    try {
      const response = await fetch(`${API_BASE}/menu`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(menuItem),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating menu item:', error);
      return { 
        success: false, 
        error: 'Failed to create menu item' 
      };
    }
  },

  // Update single menu item
  update: async (id: string, updates: UpdateMenuItemRequest): Promise<ApiResponse<MenuItem>> => {
    try {
      const response = await fetch(`${API_BASE}/menu/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating menu item:', error);
      return { 
        success: false, 
        error: 'Failed to update menu item' 
      };
    }
  },

  // Bulk update menu items
  bulkUpdate: async (bulkUpdate: BulkUpdateRequest): Promise<ApiResponse<MenuItem[]>> => {
    try {
      const response = await fetch(`${API_BASE}/menu`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bulkUpdate),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error bulk updating menu items:', error);
      return { 
        success: false, 
        error: 'Failed to bulk update menu items',
        data: []
      };
    }
  },

  // Delete single menu item
  delete: async (id: string): Promise<ApiResponse<MenuItem>> => {
    try {
      const response = await fetch(`${API_BASE}/menu/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error deleting menu item:', error);
      return { 
        success: false, 
        error: 'Failed to delete menu item' 
      };
    }
  },

  // Bulk delete menu items
  bulkDelete: async (bulkDelete: BulkDeleteRequest): Promise<ApiResponse<MenuItem[]>> => {
    try {
      const response = await fetch(`${API_BASE}/menu`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bulkDelete),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error bulk deleting menu items:', error);
      return { 
        success: false, 
        error: 'Failed to bulk delete menu items',
        data: []
      };
    }
  }
};

// Add categories API
export const categoriesApi = {
  // Get all categories
  getAll: async (): Promise<ApiResponse<Category[]>> => {
    try {
      const response = await fetch(`${API_BASE}/categories`, {
        cache: 'no-store'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      return { 
        success: false, 
        error: 'Failed to fetch categories',
        data: []
      };
    }
  }
};