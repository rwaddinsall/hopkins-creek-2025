export interface PageHeader {
  id: number;
  title: string;
  subtitle?: string;
}

export interface StrapiAccordion {
  id: number;
  heading: string;
  details: string;
  displayOrder?: number;
}

export interface InfoSection {
  id: number;
  sectionTitle: string;
  sectionDetails: string;
  sectionId?: string;
  accordion?: StrapiAccordion[];
}

export interface InfoPageData {
  pageHeader: PageHeader[];
  infoSections: InfoSection[];
}

export interface SustainabilityPageData {
  pageHeader: PageHeader[];
  sustainabilitySections: InfoSection[];
}

export interface AccordionItem {
  title: string;
  content: string;
}

export interface Artist {
  id: number;
  name: string;
  isLive: boolean;
  country?: string;
  displayOrder: number;
}

export interface ArtistResponse {
  data: Artist[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
