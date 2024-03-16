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

import Result, { Ok, Err } from '../structures/Result';

/**
 *
 */
export default async <T, E extends Error>(fn: () => Promise<T>): Promise<Result<T, E>> => {
	try {
		return Ok<T, E>(await fn());
	} catch(e) {
		return Err<T, E>(e);
	}
}
