import type { Parent, PhrasingContent } from 'mdast';

export interface Subscript extends Parent {
  type: 'subscript';
  children: PhrasingContent[];
}

export interface Superscript extends Parent {
  type: 'superscript';
  children: PhrasingContent[];
}

export interface Underline extends Parent {
  type: 'underline';
  children: PhrasingContent[];
}
