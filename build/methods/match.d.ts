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
import Result from '../structures/Result';
/**
 * Given a `Result` produces a function to handle the two variants and return a value.
 * @example
 * function fail() {
 * 	return Err("this always fails");
 * }
 *
 * const outcome = match(fail())(
 * 	() => "worked", // do this if the result is Ok.
 * 	reason => `failed because ${reason}.` // do this if the result is Err.
 * )
 *
 * // Expected output: failed because this always fails.
 * console.log(outcome);
 * @param result Result to match.
 */
declare const _default: <T, E>(result: Result<T, E>) => <R>(ok: (data: T) => R, err: (data: E) => R) => R;
export default _default;
