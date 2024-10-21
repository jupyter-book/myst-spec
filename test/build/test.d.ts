import type { Literal } from 'mdast';
interface Toml extends Literal {
    type: 'toml';
}
declare module 'mdast' {
    interface RootContentMap {
        toml: Toml;
    }
    interface FrontmatterContentMap {
        toml: Toml;
    }
}
declare module 'mdast' {
    interface Data {
        someField?: string | undefined;
    }
    interface InlineCodeData {
        someOtherField?: number | undefined;
    }
}
export {};
//# sourceMappingURL=test.d.ts.map