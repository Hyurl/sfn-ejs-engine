import * as fs from "fs";
import * as ejs from "ejs";
import { TemplateEngine, TemplateOptions } from "sfn";

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
    private static _caches: { [filename: string]: Function } = {};

    renderFile(filename: string, vars: { [name: string]: any } = {}): Promise<string> {
        return new Promise((resolve, reject) => {
            let Class = <typeof EjsEngine>this.constructor;
            if (Class._caches[filename] instanceof Function) {
                try {
                    resolve(Class._caches[filename](vars));
                } catch (err) {
                    reject(err);
                }
            } else {
                let options = Object.assign({}, this.options);
                delete options.cache;
                delete options.encoding;

                fs.readFile(filename, this.options.encoding, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        Class._caches[filename] = ejs.compile(data, options);
                        try {
                            resolve(Class._caches[filename](vars));
                        } catch (err) {
                            reject(err);
                        }
                    }
                });
            }
        });
    }
}