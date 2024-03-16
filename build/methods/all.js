"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../structures/Result");
function all(results) {
    for (const result of results)
        if (!result.ok())
            return (0, Result_1.Err)();
    return (0, Result_1.Ok)();
}
exports.default = all;
