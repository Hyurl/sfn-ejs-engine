import * as path from "path";
import * as ejs from "ejs";
import { TemplateEngine as Engine, TemplateOptions } from "sfn";

const _module = require("sfn/dist/core/tools/TemplateEngine");
const TemplateEngine: typeof Engine = _module.TemplateEngine;

export interface EjsOptions extends TemplateOptions {
    /** When `false` no debug instrumentation is compiled. */
    compileDebug?: boolean;
    /** Character to use with angle brackets for open/close. */
    delimiter?: string;
    /** Output generated function body. */
    debug?: boolean;
    /** When `true`, generated function is in strict mode. */
    strict?: boolean;
    /** 
     * Remove all safe-to-remove whitespace, including leading and trailing 
     * whitespace.
     */
    rmWhitespace?: boolean;
}

export class EjsEngine extends TemplateEngine {
    options: EjsOptions;

    renderFile(filename: string, vars: { [name: string]: any } = {}): Promise<string> {
        return new Promise((resolve, reject) => {
            ejs.renderFile(filename, vars, this.options, (err, contents) => {
                err ? reject(err) : resolve(contents);
            });
        }).then((contents: string) => {
            let matches = contents.match(/^<!--\s*layout:\s*(\S+?)\s*-->/);

            if (matches) {
                let layoutFile: string = matches[1],
                    ext: string = path.extname(layoutFile);

                if (!path.isAbsolute(layoutFile))
                    layoutFile = path.resolve(path.dirname(filename), layoutFile);

                if (!ext)
                    layoutFile += ".ejs";

                return this.renderFile(layoutFile, Object.assign({
                    $LayoutContents: contents.substring(matches[0].length).trimLeft()
                }, vars));
            }

            return contents;
        });
    }
}