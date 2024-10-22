import type { Node, Parent } from 'mdast';
import type { FlowContent } from './flow';

/**
 * Top-level break in the myst document, breaking it into Blocks.
 */
export interface BlockBreak extends Node {
  /**
   * Node type of myst block break.
   */
  type: 'blockBreak';
  /**
   * Block metadata. Conventionally this is a stringified JSON dictionary but it may be any arbitrary string.
   */
  meta?: string;
}

/**
 * Top-level content blocks or cells the myst document, delimited by BlockBreaks.
 */
export interface Block extends Parent {
  /**
   * Node type of myst block.
   */
  type: 'block';
  /**
   * Block metadata from preceding break; conventionally, a stringified JSON dictionary but may be any arbitrary string.
   */
  meta?: BlockBreak['meta'];
  /**
   * Top-level children of myst document.
   */
  children: FlowContent[];
}
