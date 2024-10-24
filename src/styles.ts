import type { Parent, PhrasingContent } from 'mdast';

/**
 * Subscript content, using role `{subscript}`.
 */
export interface Subscript extends Parent {
  /**
   * Node type of myst subscript.
   */
  type: 'subscript';
  children: PhrasingContent[];
}

/**
 * Superscript content, using role `{superscript}`.
 */
export interface Superscript extends Parent {
  /**
   * Node type of myst superscript.
   */
  type: 'superscript';
  children: PhrasingContent[];
}

/**
 * Underline content, using role `{underline}`.
 */
export interface Underline extends Parent {
  /**
   * Node type of myst underline.
   */
  type: 'underline';
  children: PhrasingContent[];
}
