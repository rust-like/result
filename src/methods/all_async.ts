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
import try_async from './try_async';
import match from './match';

export default async function (result_promises: Promise<Result<any, any>>[]): Promise<Result<void, void>> {
	return match(
		await try_async(async () => await Promise.all(result_promises))
	)(
		results => {
			for(const result of results)
				if(!result.ok()) return Err();
			return Ok();
		},
		() => Err()
	);
}
