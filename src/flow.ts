import type { Blockquote, Code, Heading, Html, List, ThematicBreak, RootContent } from 'mdast';
export interface FlowContentMap {
  blockQuote: Blockquote;
  code: Code;
  heading: Heading;
  html: Html;
  list: List;
  thematicBreak: ThematicBreak;
  rootContent: RootContent;
}

export type FlowContent = FlowContentMap[keyof FlowContentMap];
