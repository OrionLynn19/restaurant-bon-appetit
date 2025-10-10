import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { 
  MenuItem, 
  ApiResponse, 
  CreateMenuItemRequest,
  BulkUpdateRequest,
  BulkDeleteRequest,
  MenuFilters 
} from '@/types/content';

// CREATE - POST /api/menu
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse<MenuItem>>> {
  try {
    const body: CreateMenuItemRequest = await request.json();
    const { 
      name, 
      description, 
      price, 
      discount_price, 
      currency = 'THB', 
      image_url, 
      available = true, 
      prep_time_minutes,
      category_id 
    } = body;

    // Validation
    if (!name || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Name is required' },
        { status: 400 }
      );
    }

    if (!price || price <= 0) {
      return NextResponse.json(
        { success: false, error: 'Price must be greater than 0' },
        { status: 400 }
      );
    }

    if (!category_id) {
      return NextResponse.json(
        { success: false, error: 'Category ID is required' },
        { status: 400 }
      );
    }

    if (discount_price && discount_price < 0) {
      return NextResponse.json(
        { success: false, error: 'Discount price cannot be negative' },
        { status: 400 }
      );
    }

    if (discount_price && discount_price >= price) {
      return NextResponse.json(
        { success: false, error: 'Discount price must be less than regular price' },
        { status: 400 }
      );
    }

    if (prep_time_minutes && prep_time_minutes < 0) {
      return NextResponse.json(
        { success: false, error: 'Preparation time cannot be negative' },
        { status: 400 }
      );
    }

    // Check if category exists
    const { data: categoryExists, error: categoryError } = await supabase
      .from('categories')
      .select('id')
      .eq('id', category_id)
      .single();

    if (categoryError || !categoryExists) {
      return NextResponse.json(
        { success: false, error: 'Invalid category ID' },
        { status: 400 }
      );
    }

    // Create menu item - Only select columns that exist
    const { data, error } = await supabase
      .from('menu_items')
      .insert([{
        name: name.trim(),
        description: description?.trim() || null,
        price: parseFloat(price.toString()),
        discount_price: discount_price ? parseFloat(discount_price.toString()) : null,
        currency,
        image_url,
        available,
        prep_time_minutes,
        category_id
      }])
      .select(`
        *,
        categories:category_id (
          id,
          name
        )
      `)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to create menu item' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data as MenuItem,
      message: 'Menu item created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating menu item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create menu item' },
      { status: 500 }
    );
  }
}

// READ - GET /api/menu
export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<MenuItem[]>>> {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters with type safety
    const filters: MenuFilters = {
      category_id: searchParams.get('category_id') || undefined,
      available: searchParams.get('available') === 'true' ? true : searchParams.get('available') === 'false' ? false : undefined,
      currency: searchParams.get('currency') || undefined,
      min_price: searchParams.get('min_price') ? parseFloat(searchParams.get('min_price')!) : undefined,
      max_price: searchParams.get('max_price') ? parseFloat(searchParams.get('max_price')!) : undefined,
      max_prep_time: searchParams.get('max_prep_time') ? parseInt(searchParams.get('max_prep_time')!) : undefined,
      search: searchParams.get('search') || undefined,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined,
      offset: searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : undefined,
      sort: (searchParams.get('sort') as MenuFilters['sort']) || 'name',
      order: (searchParams.get('order') as MenuFilters['order']) || 'asc'
    };

    let query = supabase
      .from('menu_items')
      .select(`
        *,
        categories:category_id (
          id,
          name
        )
      `, { count: 'exact' });

    // Apply filters
    if (filters.category_id) {
      query = query.eq('category_id', filters.category_id);
    }

    if (filters.available !== undefined) {
      query = query.eq('available', filters.available);
    }

    if (filters.currency) {
      query = query.eq('currency', filters.currency);
    }

    if (filters.min_price !== undefined) {
      query = query.gte('price', filters.min_price);
    }

    if (filters.max_price !== undefined) {
      query = query.lte('price', filters.max_price);
    }

    if (filters.max_prep_time !== undefined) {
      query = query.lte('prep_time_minutes', filters.max_prep_time);
    }

    if (filters.search) {
      query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    // Sorting
    const validSortFields: Array<MenuFilters['sort']> = ['name', 'price', 'prep_time_minutes', 'created_at', 'updated_at'];
    const sortField = validSortFields.includes(filters.sort!) ? filters.sort! : 'name';
    const sortOrder = filters.order === 'desc' ? false : true;
    
    query = query.order(sortField, { ascending: sortOrder });

    // Pagination
    if (filters.limit) {
      const offsetNum = filters.offset || 0;
      query = query.range(offsetNum, offsetNum + filters.limit - 1);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch menu items' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: (data || []) as MenuItem[],
      total: count || 0,
      pagination: filters.limit ? {
        limit: filters.limit,
        offset: filters.offset || 0,
        total: count || 0,
        pages: Math.ceil((count || 0) / filters.limit)
      } : undefined
    });

  } catch (error) {
    console.error('Error fetching menu items:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch menu items' },
      { status: 500 }
    );
  }
}

// UPDATE - PUT /api/menu
export async function PUT(request: NextRequest): Promise<NextResponse<ApiResponse<MenuItem[]>>> {
  try {
    const body: BulkUpdateRequest = await request.json();
    const { ids, updates } = body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { success: false, error: 'IDs array is required' },
        { status: 400 }
      );
    }

    if (!updates || typeof updates !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Updates object is required' },
        { status: 400 }
      );
    }

    // Add updated_at timestamp
    const updateData = {
      ...updates,
      updated_at: new Date().toISOString()
    };

    // Validate price if provided
    if (updateData.price && updateData.price <= 0) {
      return NextResponse.json(
        { success: false, error: 'Price must be greater than 0' },
        { status: 400 }
      );
    }

    if (updateData.discount_price && updateData.discount_price < 0) {
      return NextResponse.json(
        { success: false, error: 'Discount price cannot be negative' },
        { status: 400 }
      );
    }

    if (updateData.prep_time_minutes && updateData.prep_time_minutes < 0) {
      return NextResponse.json(
        { success: false, error: 'Preparation time cannot be negative' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('menu_items')
      .update(updateData)
      .in('id', ids)
      .select(`
        *,
        categories:category_id (
          id,
          name
        )
      `);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to update menu items' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: (data || []) as MenuItem[],
      message: `${data?.length || 0} menu items updated successfully`
    });

  } catch (error) {
    console.error('Error updating menu items:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update menu items' },
      { status: 500 }
    );
  }
}

// DELETE - DELETE /api/menu
export async function DELETE(request: NextRequest): Promise<NextResponse<ApiResponse<MenuItem[]>>> {
  try {
    const body: BulkDeleteRequest = await request.json();
    const { ids } = body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { success: false, error: 'IDs array is required' },
        { status: 400 }
      );
    }

    // First get the items to be deleted for logging
    const { data: itemsToDelete, error: fetchError } = await supabase
      .from('menu_items')
      .select('id, name')
      .in('id', ids);

    if (fetchError) {
      console.error('Supabase error:', fetchError);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch menu items for deletion' },
        { status: 500 }
      );
    }

    if (!itemsToDelete || itemsToDelete.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No menu items found with provided IDs' },
        { status: 404 }
      );
    }

    // Delete the items
    const { data, error } = await supabase
      .from('menu_items')
      .delete()
      .in('id', ids)
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to delete menu items' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: (data || []) as MenuItem[],
      message: `${data?.length || 0} menu items deleted successfully`
    });

  } catch (error) {
    console.error('Error deleting menu items:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete menu items' },
      { status: 500 }
    );
  }
}