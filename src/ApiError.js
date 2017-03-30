const ERROR_CODES = {
	UNKNOWN:             -1,
	HAS_NO_ERRORS:       0,
	TIMEOUT:             1,
	UNKNOW_API_METHOD:   2,
	ACCESS_DENIED:       3,
	INCORRECT_KEY:       4,
	SESSION_NOT_EXIST:   5,
	INCORRECT_TOKEN:     6,
	SESSION_HAS_EXPIRED: 7,
	INCORRECT_PARAMS:    101,
	INTERNAL_ERROR:      500
};

const ERROR_NAMES = invert(ERROR_CODES);

class ApiError {
	/**
	 * ApiError Constructor
	 * @param  {Number} code Error code numbder
	 * @param  {String} msg  Message of error
	 */
	constructor(code, msg) {
		// Call base class contructor
		Error.apply(this, arguments);

		if (typeof Error.captureStackTrace !== 'function') {
			this.stack = (new Error).stack;
		} else {
			Error.captureStackTrace(this, ApiError);
		}

		if (typeof code === 'string') {
			code = ERROR_CODES[code] || -1;
		}

		// Find error name
		let errName = ERROR_NAMES[code] || 'UNKNOWN';

		// Fill property
		this.code = code;
		this.message = msg || errName.toString();
	}

	/**
	 * Build simple object
	 * @return {Object} Contain code and message
	 */
	toJSON() {
		return {
			error_code: this.code,
			error_msg: this.message
		};
	}

	toString() {
		return 'ApiError: ' + this.message;
	}

	/**
	 * Check error code number
	 * @param  {Number|String}  Number or name of error code
	 * @return {Boolean}        Compare result
	 */
	is(value) {
		if (typeof value === 'number') {
			return this.code === value;
		} else if (typeof value === 'string') {
			return this.code === ERROR_CODES[value];
		}

		return false;
	}

	static incorrectParam(paramName) {
		return new ApiError('INCORRECT_PARAMS',
			`Incorrect "${paramName}" parameter.`);
	}

	static incorrectMethod(methodName) {
		return new ApiError('INCORRECT_PARAMS',
			`Incorrect "${methodName}" method.`);
	}
}

function invert(obj) {
	let result = {};

	for(let key in obj) {
		result[obj[key]] = key;
	}

	return result;
}

ApiError.CODES = ERROR_CODES;
module.exports = ApiError;