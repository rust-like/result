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
import ResultError from './ResultError';

export default class Result<T, E> {
	public static Ok<R, E>(data: R): Result<R, E>;
	public static Ok<R extends void, E>(): Result<R, E>;
	public static Ok<R, E>(data?: R) {
		return new Result<R, E>(true, data);
	}
	public static Err<R, E>(data: E): Result<R, E>;
	public static Err<R, E extends void>(): Result<R, E>;
	public static Err<R, E>(data?: E): Result<R, E> {
		return new Result<R, E>(false, data);
	}

	private readonly [status]: boolean;
	private readonly [data]: T | E;

	private constructor(state: boolean, _data: T | E) {
		this[status] = state;
		this[data] = _data;
	}
	public unwrap(): T {
		if(this[status]) return this[data] as T;
		else throw ResultError.unwrap();
	}
	public unwrap_or(_default: T): T {
		return this[status]
			? this[data] as T
			: _default
	}
	public unwrap_err(): E {
		if(!this[status]) return this[data] as E;
		else throw ResultError.unwrap_err();
	}
	public match<R>(ok: (data: T) => R, err: (data: E) => R): R {
		return (this[status] ? ok : err)(this[data] as any);
	}
	/**
	 * @experimental
	 */
	public if_ok(fn: (result?: T) => void): this {
		if(this[status]) fn(this[data] as T);

		return this;
	}
	/**
	 * @experimental
	 */
	public if_err(fn: (error?: E) => void): this {
		if(!this[status]) fn(this[data] as E);

		return this;
	}
	public ok(): boolean {
		return this[status];
	}
	/**
	 * @experimental
	 */
	public get_data(): T | E {
		return this[data];
	}
// testing
	// alias
	public or(_default: T): T {
		return this.unwrap_or(_default);
	}
}

const Ok = Result.Ok;
const Err = Result.Err;

export {
	Ok,
	Err
}
