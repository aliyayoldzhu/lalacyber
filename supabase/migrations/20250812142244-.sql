-- Add is_selected column to cart_items table for checkout selection
ALTER TABLE public.cart_items 
ADD COLUMN is_selected boolean NOT NULL DEFAULT true;