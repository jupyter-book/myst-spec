import type { Parent, Image, Table } from 'mdast';
import type { Enumerated } from './enumerated';
import type { FlowContent } from './flow';

/**
 * Caption for container content.
 */
export interface Caption extends Parent {
  /**
   * Node type of myst caption.
   */
  type: 'caption';
  children: FlowContent[];
}

/**
 * Legend for container content.
 */
export interface Legend extends Parent {
  /**
   * Node type of myst legend.
   */
  type: 'legend';
  children: FlowContent[];
}

/**
 * Top-level container node to provide association and numbering to child content.
 */
export interface Container extends Parent, Partial<Enumerated> {
  /**
   * Node type of myst container.
   */
  type: 'container';
  /**
   * Kind of container contents.
   */
  kind: 'figure' | 'table';
  /**
   * Any custom class information.
   */
  class?: string;
  children: (Caption | Legend | Image | Table)[];
}
