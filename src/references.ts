import type { Association, Parent, PhrasingContent, Node } from 'mdast';

export interface Target extends Node {
  type: 'mystTarget';
  label?: string;
}

export interface CrossReference extends Association, Pick<Parent, 'children'> {
  type: 'crossReference';
  kind?: 'eq' | 'numref' | 'ref';
  children: PhrasingContent[];
}
