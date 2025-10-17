import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { 
  MenuItem, 
  ApiResponse, 
  UpdateMenuItemRequest 
} from '@/types/content';

// Local helper types (just to avoid `any`)
type UpdatableFields = {
  name?: string;
  description?: string | null;
  price?: number;
  discount_price?: number | null;
  currency?: string;
  image_url?: string | null;
  available?: boolean;
  prep_time_minutes?: number | null;
  category_id?: string;
};

type PatchFields = Pick<UpdatableFields, 'available' | 'discount_price' | 'prep_time_minutes'>;

// READ - GET /api/menu/[id] - Get single menu item
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<MenuItem>>> {
  try {
    const { data, error } = await supabase
      .from('menu_items')
      .select(`
        *,
        categories:category_id (
          id,
          name
        )
      `)
      .eq('id', params.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, error: 'Menu item not found' },
          { status: 404 }
        );
      }
      
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch menu item' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data as MenuItem
    });

  } catch (error) {
    console.error('Error fetching menu item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch menu item' },
      { status: 500 }
    );
  }
}

// UPDATE - PUT /api/menu/[id] - Update single menu item
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<MenuItem>>> {
  try {
    const body: UpdateMenuItemRequest = await request.json();
    const { 
      name, 
      description, 
      price, 
      discount_price, 
      currency, 
      image_url, 
      available, 
      prep_time_minutes, 
      category_id 
    } = body;

    // Build update object with only provided fields
    const updateData: UpdatableFields & { updated_at: string } = {
      updated_at: new Date().toISOString()
    };

    if (name !== undefined) {
      if (name.trim().length === 0) {
        return NextResponse.json(
          { success: false, error: 'Name cannot be empty' },
          { status: 400 }
        );
      }
      updateData.name = name.trim();
    }

    if (description !== undefined) updateData.description = description?.trim() || null;
    
    if (price !== undefined) {
      if (price <= 0) {
        return NextResponse.json(
          { success: false, error: 'Price must be greater than 0' },
          { status: 400 }
        );
      }
      updateData.price = parseFloat(price.toString());
    }

    if (discount_price !== undefined) {
      if (discount_price !== null) {
        if (discount_price < 0) {
          return NextResponse.json(
            { success: false, error: 'Discount price cannot be negative' },
            { status: 400 }
          );
        }
        // Check if discount price is less than regular price
        if (price !== undefined && discount_price >= price) {
          return NextResponse.json(
            { success: false, error: 'Discount price must be less than regular price' },
            { status: 400 }
          );
        }
        updateData.discount_price = parseFloat(discount_price.toString());
      } else {
        updateData.discount_price = null;
      }
    }

    if (currency !== undefined) updateData.currency = currency;
    if (image_url !== undefined) updateData.image_url = image_url;
    if (available !== undefined) updateData.available = available;
    
    if (prep_time_minutes !== undefined) {
      if (prep_time_minutes !== null && prep_time_minutes < 0) {
        return NextResponse.json(
          { success: false, error: 'Preparation time cannot be negative' },
          { status: 400 }
        );
      }
      updateData.prep_time_minutes = prep_time_minutes;
    }

    if (category_id !== undefined) {
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
      updateData.category_id = category_id;
    }

    // Update menu item
    const { data, error } = await supabase
      .from('menu_items')
      .update(updateData)
      .eq('id', params.id)
      .select(`
        *,
        categories:category_id (
          id,
          name
        )
      `)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, error: 'Menu item not found' },
          { status: 404 }
        );
      }
      
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to update menu item' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data as MenuItem,
      message: 'Menu item updated successfully'
    });

  } catch (error) {
    console.error('Error updating menu item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update menu item' },
      { status: 500 }
    );
  }
}

// PARTIAL UPDATE - PATCH /api/menu/[id] - Partial update (quick toggles)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<MenuItem>>> {
  try {
    const body = await request.json();
    
    // Only allow specific fields for PATCH operations
    const allowedFields = ['available', 'discount_price', 'prep_time_minutes'] as const;
    const updateData: PatchFields & { updated_at: string } = {
      updated_at: new Date().toISOString()
    };

    // Only include allowed fields that are provided
    Object.keys(body).forEach(key => {
      if (allowedFields.includes(key as (typeof allowedFields)[number])) {
        // @ts-expect-error index is narrowed by includes check
        updateData[key] = body[key];
      }
    });

    if (Object.keys(updateData).length === 1) { // Only updated_at
      return NextResponse.json(
        { success: false, error: 'No valid fields provided for update' },
        { status: 400 }
      );
    }

    // Validate discount_price if provided
    if (updateData.discount_price !== undefined && updateData.discount_price !== null) {
      if (updateData.discount_price < 0) {
        return NextResponse.json(
          { success: false, error: 'Discount price cannot be negative' },
          { status: 400 }
        );
      }
    }

    // Validate prep_time_minutes if provided
    if (updateData.prep_time_minutes !== undefined && updateData.prep_time_minutes !== null) {
      if (updateData.prep_time_minutes < 0) {
        return NextResponse.json(
          { success: false, error: 'Preparation time cannot be negative' },
          { status: 400 }
        );
      }
    }

    const { data, error } = await supabase
      .from('menu_items')
      .update(updateData)
      .eq('id', params.id)
      .select(`
        *,
        categories:category_id (
          id,
          name
        )
      `)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, error: 'Menu item not found' },
          { status: 404 }
        );
      }
      
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to update menu item' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data as MenuItem,
      message: 'Menu item updated successfully'
    });

  } catch (error) {
    console.error('Error updating menu item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update menu item' },
      { status: 500 }
    );
  }
}

// DELETE - DELETE /api/menu/[id] - Delete single menu item
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse<ApiResponse<MenuItem>>> {
  try {
    // First check if menu item exists
    const { data: existingItem, error: checkError } = await supabase
      .from('menu_items')
      .select('id, name')
      .eq('id', params.id)
      .single();

    if (checkError) {
      if (checkError.code === 'PGRST116') {
        return NextResponse.json(
          { success: false, error: 'Menu item not found' },
          { status: 404 }
        );
      }
      throw checkError;
    }

    // Delete the menu item
    const { data, error } = await supabase
      .from('menu_items')
      .delete()
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to delete menu item' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data as MenuItem,
      message: `Menu item "${existingItem.name}" deleted successfully`
    });

  } catch (error) {
    console.error('Error deleting menu item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete menu item' },
      { status: 500 }
    );
  }
}
