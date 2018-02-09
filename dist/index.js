"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const ejs = require("ejs");
const _module = require("sfn/dist/core/tools/TemplateEngine");
const TemplateEngine = _module.TemplateEngine;
class EjsEngine extends TemplateEngine {
    renderFile(filename, vars = {}) {
        return new Promise((resolve, reject) => {
            let Class = this.constructor;
            if (Class._caches[filename] instanceof Function) {
                try {
                    resolve(Class._caches[filename](vars));
                }
                catch (err) {
                    reject(err);
                }
            }
            else {
                let options = Object.assign({}, this.options);
                delete options.cache;
                delete options.encoding;
                fs.readFile(filename, this.options.encoding, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        Class._caches[filename] = ejs.compile(data, options);
                        try {
                            resolve(Class._caches[filename](vars));
                        }
                        catch (err) {
                            reject(err);
                        }
                    }
                });
            }
        });
    }
}
EjsEngine._caches = {};
exports.EjsEngine = EjsEngine;
//# sourceMappingURL=index.js.map