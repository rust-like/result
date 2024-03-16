"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Result_1 = require("../structures/Result");
const try_async_1 = require("./try_async");
const match_1 = require("./match");
function default_1(result_promises) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, match_1.default)(yield (0, try_async_1.default)(() => __awaiter(this, void 0, void 0, function* () { return yield Promise.all(result_promises); })))(results => {
            for (const result of results)
                if (!result.ok())
                    return (0, Result_1.Err)();
            return (0, Result_1.Ok)();
        }, () => (0, Result_1.Err)());
    });
}
exports.default = default_1;
