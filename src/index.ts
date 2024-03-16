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

import Result, { Ok, Err } from './structures/Result';
import ResultError from './structures/ResultError';
import _try from './methods/try';
import try_async from './methods/try_async';
import match from './methods/match';
import all from './methods/all';
import all_async from './methods/all_async';

export {
	Result,
	ResultError,
	Ok,
	Err,
	_try as try,
	try_async,
	match,
	all,
	all_async
}
