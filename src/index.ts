//import type { InlineMath } from './math';
import type { Role } from './roles';
import type { BlockBreak, Block } from './blocks';

declare module 'mdast' {
  interface Node {
    // Referencing semantics
    identifier?: string;
    html_id?: string;
  }

  interface PhrasingContentMap {
    // Extend MDAST to use our types
    //inlineMath: InlineMath;
    mystRole: Role;
    //subscriptStatic: SubscriptStatic;
    //superscriptStatic: SuperscriptStatic;
    //underlineStatic: UnderlineStatic;
  }

  interface RootContentMap {
    mystRole: Role;
    block: Block;
    blockBreak: BlockBreak;
  }
}

export type * from 'mdast';
export type * from './roles';
export type * from './blocks';
export type * from './flow';
