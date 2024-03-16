"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Err = exports.Ok = void 0;
const symbols_1 = require("../symbols");
const ResultError_1 = require("./ResultError");
class Result {
    static Ok(data) {
        return new Result(true, data);
    }
    static Err(data) {
        return new Result(false, data);
    }
    constructor(state, _data) {
        this[symbols_1.status] = state;
        this[symbols_1.data] = _data;
    }
    unwrap() {
        if (this[symbols_1.status])
            return this[symbols_1.data];
        else
            throw ResultError_1.default.unwrap();
    }
    unwrap_or(_default) {
        return this[symbols_1.status]
            ? this[symbols_1.data]
            : _default;
    }
    unwrap_err() {
        if (!this[symbols_1.status])
            return this[symbols_1.data];
        else
            throw ResultError_1.default.unwrap_err();
    }
    match(ok, err) {
        return (this[symbols_1.status] ? ok : err)(this[symbols_1.data]);
    }
    if_ok(fn) {
        if (this[symbols_1.status])
            fn(this[symbols_1.data]);
        return this;
    }
    if_err(fn) {
        if (!this[symbols_1.status])
            fn(this[symbols_1.data]);
        return this;
    }
    ok() {
        return this[symbols_1.status];
    }
    get_data() {
        return this[symbols_1.data];
    }
    or(_default) {
        return this.unwrap_or(_default);
    }
}
exports.default = Result;
const Ok = Result.Ok;
exports.Ok = Ok;
const Err = Result.Err;
exports.Err = Err;
