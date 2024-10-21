import type { Parent, PhrasingContent } from 'mdast';

export interface Abbreviation extends Parent {
  type: 'abbreviation';
  children: PhrasingContent[];
  title?: string;
}
