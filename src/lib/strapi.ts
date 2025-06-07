interface Props {
  endpoint: string;
  query?: Record<string, string>;
  wrappedByKey?: string;
  wrappedByList?: boolean;
}

export default async function fetchApi<T>({
  endpoint,
  query,
  wrappedByKey,
  wrappedByList,
}: Props): Promise<T> {
  if (endpoint.startsWith('/')) {
    endpoint = endpoint.slice(1);
  }

  const url = new URL(`${import.meta.env.STRAPI_URL}/api/${endpoint}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }
  
  const res = await fetch(url.toString());
  
  if (!res.ok) {
    if (res.status === 404) {
      console.warn(`Strapi API returned 404 for ${endpoint} - returning empty data`);
      return (wrappedByList ? [] : null) as T;
    }
    throw new Error(`Strapi API error: ${res.status} ${res.statusText}`);
  }
  
  let data = await res.json();

  if (data.error) {
    throw new Error(`Strapi error: ${data.error.message}`);
  }

  if (wrappedByKey) {
    data = data[wrappedByKey];
  }

  if (wrappedByList) {
    data = data[0];
  }

  return data as T;
}

export async function fetchArtists() {
  try {
    // Add pagination limit to get all artists
    const response = await fetch(`${import.meta.env.STRAPI_URL}/api/artists?sort=name:asc&pagination[limit]=100`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching artists:', error);
    throw error;
  }
}

export function formatArtistName(artist: import('../types/strapi').Artist): string {
  let name = artist.name;
  if (artist.isLive) name += " (live)";
  if (artist.country) name += ` (${artist.country})`;
  return name;
}