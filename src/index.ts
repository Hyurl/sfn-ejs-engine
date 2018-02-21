import * as fs from "fs";
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
        });
    }
}