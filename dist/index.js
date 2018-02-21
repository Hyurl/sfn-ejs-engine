"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ejs = require("ejs");
const _module = require("sfn/dist/core/tools/TemplateEngine");
const TemplateEngine = _module.TemplateEngine;
class EjsEngine extends TemplateEngine {
    renderFile(filename, vars = {}) {
        return new Promise((resolve, reject) => {
            ejs.renderFile(filename, vars, this.options, (err, contents) => {
                err ? reject(err) : resolve(contents);
            });
        });
    }
}
exports.EjsEngine = EjsEngine;
//# sourceMappingURL=index.js.map