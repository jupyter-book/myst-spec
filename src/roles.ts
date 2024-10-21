import type { Parent, Literal, PhrasingContent } from 'mdast';

// Custom in-line behavior
export interface Role extends Literal, Parent {
  name: string;
  type: 'mystRole';
  value: string;
  children: PhrasingContent[];
}
