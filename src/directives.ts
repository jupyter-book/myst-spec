import type { Parent, Literal, PhrasingContent } from 'mdast';
import type { FlowContent } from './flow';

export interface Directive extends Parent, Literal {
  type: 'mystDirective';
  name: string;
  args?: string;
  options?: Record<string, any>;
  value: string;
  children: (FlowContent | PhrasingContent)[];
}
