import type { Parent, PhrasingContent } from 'mdast';

export type AlignType = 'left' | 'center' | 'right';

export interface TableCell extends Parent {
  type: 'tableCell';
  align?: AlignType;
  children: PhrasingContent[];
}

export interface TableRow extends Parent {
  type: 'tableRow';
  children: TableCell[];
}

export interface Table extends Parent {
  type: 'table';
  align?: AlignType;
  children: TableRow[];
}
