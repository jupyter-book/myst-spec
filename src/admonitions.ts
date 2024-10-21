import type { Parent, PhrasingContent } from 'mdast';
import type { FlowContent } from './flow';

export interface AdmonitionTitle extends Parent {
  type: 'admonitionTitle';
  children: PhrasingContent[];
}

export type AdmonitionKind =
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

export interface Admonition extends Parent {
  type: 'admonition';
  kind?: AdmonitionKind;
  class?: string;
  children: (FlowContent | AdmonitionTitle)[];
}
