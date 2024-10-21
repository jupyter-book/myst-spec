import type { Parent, PhrasingContent } from 'mdast';
import type { FlowContent } from './flow';

export interface AdmonitionTitle extends Parent {
  type: 'admonitionTitle';
  children: PhrasingContent[];
}
export interface Admonition extends Parent {
  type: 'admonition';
  kind?:
    | 'attention'
    | 'caution'
    | 'danger'
    | 'error'
    | 'hint'
    | 'important'
    | 'note'
    | 'seealso'
    | 'tip'
    | 'warning';
  class?: string;
  children: (FlowContent | AdmonitionTitle)[];
}
