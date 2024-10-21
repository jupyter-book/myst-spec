import type { Association, Literal } from 'mdast';
import type { Enumerated } from './enumerated';

/**
 * Math node for presenting numbered equations.
 */
export interface Math extends Partial<Association>, Partial<Enumerated>, Literal {
  /**
   * Node type of myst math.
   */
  type: 'math';
}

/**
 * Fragment of math, similar to InlineCode, using role {math}.
 */
export interface InlineMath extends Literal {
  /**
   * Node type of myst inlineMath.
   */
  type: 'inlineMath';
}
