import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_KEY || '',
});

export const getEntries = async (contentType: string) => {
  try {
    const entries = await client.getEntries({
      content_type: contentType,
    });
    return entries.items;
  } catch (error) {
    console.error(`Error fetching entries for ${contentType}:`, error);
    return [];
  }
};

export const getEntryById = async (id: string) => {
  try {
    const entry = await client.getEntry(id);
    return entry;
  } catch (error) {
    console.error(`Error fetching entry with ID ${id}:`, error);
    return null;
  }
};
