"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const ejs = require("ejs");
const sfn_1 = require("sfn");
class EjsEngine extends sfn_1.TemplateEngine {
    renderFile(filename, vars = {}) {
        return new Promise((resolve, reject) => {
            ejs.renderFile(filename, vars, this.options, (err, contents) => {
                err ? reject(err) : resolve(contents);
            });
        }).then((contents) => {
            let matches = contents.match(/^<!--\s*layout:\s*(\S+?)\s*-->/);
            if (matches) {
                let layoutFile = matches[1], ext = path.extname(layoutFile);
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
exports.EjsEngine = EjsEngine;
//# sourceMappingURL=index.js.map