/**
 * Copyright (c) 2024 Nala
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { status, data } from '../symbols';
export default class Result<T, E> {
    static Ok<R, E>(data: R): Result<R, E>;
    static Ok<R extends void, E>(): Result<R, E>;
    static Err<R, E>(data: E): Result<R, E>;
    static Err<R, E extends void>(): Result<R, E>;
    private readonly [status];
    private readonly [data];
    private constructor();
    unwrap(): T;
    unwrap_or(_default: T): T;
    unwrap_err(): E;
    match<R>(ok: (data: T) => R, err: (data: E) => R): R;
    /**
     * @experimental
     */
    if_ok(fn: (result?: T) => void): this;
    /**
     * @experimental
     */
    if_err(fn: (error?: E) => void): this;
    ok(): boolean;
    /**
     * @experimental
     */
    get_data(): T | E;
    or(_default: T): T;
}
declare const Ok: typeof Result.Ok;
declare const Err: typeof Result.Err;
export { Ok, Err };
