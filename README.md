# Sfn-Ejs-Engine

**Ejs template engine for sfn framework.**

This module is internally included by [sfn](https://github.com/hyurl/sfn), so 
you don't need to download it before using it. And this is the default 
template engine that **sfn** uses, if no engine is specified, ejs will be used
by default.

For more information about **ejs**, please visit 
[https://www.npmjs.com/package/ejs](https://www.npmjs.com/package/ejs).

## Example

```typescript
import { HttpController, route } from "sfn";
import { EjsEngine } from "sfn-ejs-engine";

const engine = new EjsEngine();

export default class extends HttpController {
    engine = engine;

    @route.get("/ejs-test")
    index() {
        return this.view("ejs-test.ejs");
    }
}
```

## API

### `new EjsEngine(options?: EjsOptions)`

Interface `EjsOptions` includes:

- `compileDebug: boolean` When `false` no debug instrumentation is compiled.
- `delimiter: string` Character to use with angle brackets for open/close.
- `debug: boolean` Output generated function body.
- `strict: boolean` When `true`, generated function is in strict mode.
- `rmWhitespace: boolean` Remove all safe-to-remove whitespace, including 
    leading and trailing whitespace.