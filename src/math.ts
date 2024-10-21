import type { Association, Literal } from 'mdast';
import type { Enumerated } from './enumerated';

export interface Math extends Partial<Association>, Partial<Enumerated>, Literal {
  type: 'math';
}
export interface InlineMath extends Literal {
  type: 'inlineMath';
}
