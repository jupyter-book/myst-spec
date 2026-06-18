import type { AlignType } from 'mdast';
import type { Role } from './roles';
import type { BlockBreak, Block } from './blocks';
import type { AdmonitionTitle, Admonition } from './admonitions';
import type { Abbreviation } from './abbreviations';
import type { Comment } from './comments';
import type { InlineMath, Math } from './math';
import type { Directive } from './directives';
import type { CrossReference, Target } from './references';
import type { Subscript, Superscript, Underline } from './styles';
import type { Caption, Container, Legend } from './containers';

declare module 'mdast' {
  // Extend Association to include HTML ID
  interface Association {
    html_id?: string;
  }

  // All nodes are referenceable now
  interface Blockquote extends Partial<Association> {}
  interface Break extends Partial<Association> {}
  interface Code extends Partial<Association> {
    class?: string;
    showLineNumbers?: boolean;
    startingLineNumber?: number;
    emphasizeLines?: number[];
  }
  interface Delete extends Partial<Association> {}
  interface Emphasis extends Partial<Association> {}
  interface Heading extends Partial<Association> {}
  interface Html extends Partial<Association> {}
  interface Image extends Partial<Association> {
    class?: string;
    align?: 'left' | 'center' | 'right';
    /**
     * Image width in pixels or percentage.
     */
    width?: string;
  }
  interface InlineCode extends Partial<Association> {}
  interface List extends Partial<Association> {}
  interface ListItem extends Partial<Association> {}
  interface Paragraph extends Partial<Association> {}
  interface Root extends Partial<Association> {}
  interface Strong extends Partial<Association> {}
  interface Table extends Partial<Association> {}
  interface TableRow extends Partial<Association> {}
  interface TableCell extends Partial<Association> {
    header?: boolean;
    /**
     * Alignment of content within cell.
     */
    align?: AlignType | undefined | null;
  }
  interface Text extends Partial<Association> {}
  interface ThematicBreak extends Partial<Association> {}

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
    mystComment: Comment;
    mystDirective: Directive;
    math: Math;
    inlineMath: InlineMath;
    subscript: Subscript;
    superscript: Superscript;
    underline: Underline;
    crossReference: CrossReference;
    mystTarget: Target;
    container: Container;
    caption: Caption;
    legend: Legend;
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
