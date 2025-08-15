export const generateSlug = (title: string, id?: string): string => {
  // Create a slug from the title
  const baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters except hyphens and spaces
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens

  // Add ID suffix if provided for uniqueness
  return id ? `${baseSlug}-${id.slice(-8)}` : baseSlug;
};

export const extractIdFromSlug = (slug: string): string | null => {
  // Extract the last 8 characters after the last hyphen (assumed to be part of the ID)
  const parts = slug.split('-');
  const lastPart = parts[parts.length - 1];
  
  // If the last part looks like an ID fragment (8 characters), return it
  if (lastPart && lastPart.length === 8) {
    return lastPart;
  }
  
  return null;
};

export const slugToTitle = (slug: string): string => {
  // Convert slug back to a readable title
  return slug
    .split('-')
    .slice(0, -1) // Remove the ID part
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Alias for compatibility
export const createSlug = generateSlug;