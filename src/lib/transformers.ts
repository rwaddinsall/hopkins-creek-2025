import type { StrapiAccordion, AccordionItem } from "../types/strapi";

export const transformAccordionData = (accordions: StrapiAccordion[]): AccordionItem[] => {
  return accordions
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
    .map(acc => ({
      title: acc.heading,
      content: acc.details,
    }));
};

export const generateGroupName = (prefix: string, id: number | string, index: number): string => {
  return `${prefix}-${id || index}`;
};

export const hasContent = <T extends { length: number }>(data: T | null | undefined): data is T => {
  return Boolean(data && data.length > 0);
};
