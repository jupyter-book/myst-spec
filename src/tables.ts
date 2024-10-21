import type { Parent, PhrasingContent } from 'mdast';

export interface TableCell extends Parent {
  type: 'tableCell';
  align?: 'left' | 'center' | 'right';
  children: PhrasingContent[];
}

export interface TableRow extends Parent {
  type: 'tableRow';
  children: TableCell[];
}

export interface Table extends Parent {
  type: 'table';
  align?: 'left' | 'center' | 'right';
  children: TableRow[];
}
