import type { Node, Parent } from 'mdast';
import type { FlowContent } from './flow';

export interface BlockBreak extends Node {
  type: 'blockBreak';
  meta: string;
}

export interface Block extends Parent {
  type: 'block';
  meta: BlockBreak['meta'];
  children: FlowContent[];
}
