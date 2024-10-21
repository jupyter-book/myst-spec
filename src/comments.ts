import type { Literal } from 'mdast';

export interface Comment extends Literal {
  type: 'comment';
}
