import type { Parent, PhrasingContent } from 'mdast';

/**
 * One cell of table.
 */
export interface TableCell extends Parent {
  /**
   * Node type of myst tableCell.
   */
  type: 'tableCell';
  /**
   * Alignment of content within cell.
   */
  align?: 'left' | 'center' | 'right';
  children: PhrasingContent[];
}

/**
 * One row of table containing cells.
 */
export interface TableRow extends Parent {
  /**
   * Node type of myst tableRow.
   */
  type: 'tableRow';
  children: TableCell[];
}

/**
 * Two-dimensional table data.
 */
export interface Table extends Parent {
  /**
   * Node type of myst table.
   */
  type: 'table';
  align?: 'left' | 'center' | 'right';
  children: TableRow[];
}
