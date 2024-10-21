import type { Parent, Image, Table } from 'mdast';
import type { Enumerated } from './enumerated';
import type { FlowContent } from './flow';

export interface Caption extends Parent {
  type: 'caption';
  children: FlowContent[];
}

export interface Legend extends Parent {
  type: 'legend';
  children: FlowContent[];
}

export interface Container extends Parent, Partial<Enumerated> {
  type: 'container';
  kind: 'figure' | 'table';
  class?: string;
  children: (Caption | Legend | Image | Table)[];
}
