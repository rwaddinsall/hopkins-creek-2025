interface Props {
  endpoint: string;
  query?: Record<string, string>;
  wrappedByKey?: string;
  wrappedByList?: boolean;
}

/**
 * Fetches data from the Strapi API
 * @param endpoint - The endpoint to fetch from
 * @param query - The query parameters to add to the url
 * @param wrappedByKey - The key to unwrap the response from
 * @param wrappedByList - If the response is a list, unwrap it
 * @returns
 */
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
  
  // Check if the response is ok (status 200-299)
  if (!res.ok) {
    // For 404 errors on API endpoints, return empty data instead of throwing
    if (res.status === 404) {
      console.warn(`Strapi API returned 404 for ${endpoint} - returning empty data`);
      return (wrappedByList ? [] : null) as T;
    }
    throw new Error(`Strapi API error: ${res.status} ${res.statusText}`);
  }
  
  let data = await res.json();

  // Check for Strapi error format
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

export async function fetchStrapiData(endpoint: string) {
  try {
    // Build full Strapi API URL using server-side STRAPI_URL env var
    const apiUrl = new URL(`${import.meta.env.STRAPI_URL}/api/${endpoint}`);
    const response = await fetch(apiUrl.toString());
    if (!response.ok) {
      throw new Error(`Failed to fetch data from Strapi: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}