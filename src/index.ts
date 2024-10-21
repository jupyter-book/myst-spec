import type { Role } from './roles';
import type { BlockBreak, Block } from './blocks';
import type { AdmonitionTitle, Admonition } from './admonitions';
import type { Abbreviation } from './abbreviations';
import type { Comment } from './comments';
import type { InlineMath, Math } from './math';
import type { Directive } from './directives';
import type { CrossReference, Target } from './references';
import type { Subscript, Superscript, Underline } from './styles';

declare module 'mdast' {
  // Extend Association to include HTML ID
  interface Association {
    html_id?: string;
  }

  // All nodes are referenceable now
  interface Node extends Partial<Association> {}

  interface PhrasingContentMap {
    inlineMath: InlineMath;
    mystRole: Role;
    subscript: Subscript;
    superscript: Superscript;
    underline: Underline;
    crossReference: CrossReference;
    abbreviation: Abbreviation;
  }

  interface RootContentMap {
    mystRole: Role;
    block: Block;
    blockBreak: BlockBreak;
    admonition: Admonition;
    admonitionTitle: AdmonitionTitle;
    abbreviation: Abbreviation;
    comment: Comment;
    mystDirective: Directive;
    math: Math;
    inlineMath: InlineMath;
    subscript: Subscript;
    superscript: Superscript;
    underline: Underline;
    crossReference: CrossReference;
    mystTarget: Target;
  }
}

export type * from 'mdast';
export type * from './roles';
export type * from './blocks';
export type * from './admonitions';
export type * from './abbreviations';
export type * from './comments';
export type * from './math';
export type * from './directives';
export type * from './references';
export type * from './styles';
