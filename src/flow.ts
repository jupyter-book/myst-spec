import type {
  Blockquote,
  Code,
  Heading,
  Html,
  List,
  ThematicBreak,
  RootContent,
  Paragraph,
  Definition,
  FootnoteDefinition,
} from 'mdast';
import type { Math } from './math';
import type { Admonition } from './admonitions';
import type { Comment } from './comments';
import type { Container } from './containers';
import type { Directive } from './directives';
import type { Target } from './references';

export interface FlowContentMap {
  blockQuote: Blockquote;
  code: Code;
  heading: Heading;
  html: Html;
  list: List;
  thematicBreak: ThematicBreak;
  paragraph: Paragraph;
  definition: Definition;
  footnoteDefinition: FootnoteDefinition;

  math: Math;
  admonition: Admonition;
  mystComment: Comment;
  directive: Directive;
  mystTarget: Target;
  container: Container;
}

export type FlowContent = FlowContentMap[keyof FlowContentMap];
