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

## Layout Support

By default, EJS doesn't support layout (A.K.A. template `extends`), but this 
module provides that ability for you.

If you wish to use a layout template in the target template, just add a 
comment with format `<!-- layout: filename -->` at first row and first column 
in the template, just like this:

```html
<!-- layout: ./layout -->
<p>
    This is the target template.
</p>
```

And in the layout template, use variable `$LayoutContents` to attach the 
target template, just like this (uses tag `<%-` instead of `<%=`):

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <%- $LayoutContents %>
</body>
</html>
```

And when the target template is being rendered, it would output the contents 
as the following one:

```html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <p>
        This is contents in a layout.
    </p>
</body>
</html>
```

Remember, this is just a trick in **sfn** framework, if you're using other 
frameworks, it wouldn't work, but you can still use the `include()` syntax to 
load relative templates, which suits most of the case already.