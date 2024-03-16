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

const config = require('../../config.json');
const showHelpLink =
	process.env.RESULTJS_NO_HELP_LINK ||
	process.argv.some(arg => arg == '--resultjs-no-help-link');
/**
 * Result-specific error.
 */
export default class ResultError extends Error {
	public static unwrap() {
		return new this("Cannot unwrap an error variant.", '01')
	}
	public static unwrap_err() {
		return new this("Could not unwrap err, result was ok.", '02')
	}

	constructor(message: string, code: string) {
		super(message + (showHelpLink ? '' : ' Read more here: ' +  config.host + config.errorPath.replace(/{code}/g, code)))
	}
}
