import type { Parent, Literal, PhrasingContent } from 'mdast';
import type { FlowContent } from './flow';

/**
 * Content block with predefined behavior.
 */
export interface Directive extends Parent, Literal {
  /**
   * Node type of myst mystDirective.
   */
  type: 'mystDirective';
  name: string;
  args?: string;
  options?: Record<string, any>;
  /**
   * body of the directive, excluding options.
   */
  value: string;
  /**
   * Parsed directive content.
   */
  children: (FlowContent | PhrasingContent)[];
}
