import type { Blockquote, Code, Heading, Html, List, ThematicBreak, RootContent } from 'mdast';
import type { Math } from './math';
import type { Admonition } from './admonitions';
import type { Comment } from './comments';
import type { Directive } from './directives';
import type { Target } from './references';

export interface FlowContentMap {
  blockQuote: Blockquote;
  code: Code;
  heading: Heading;
  html: Html;
  list: List;
  thematicBreak: ThematicBreak;
  rootContent: RootContent;
  math: Math;
  comment: Comment;
  directive: Directive;
  admonition: Admonition;
  mystTarget: Target;
}

export type FlowContent = FlowContentMap[keyof FlowContentMap];
