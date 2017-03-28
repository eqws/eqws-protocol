function stringEncode(data) {
	return JSON.stringify(data);
}

function stringDecode(data) {
	return JSON.parse(data);
}

module.exports = {
	encode: stringEncode,
	decode: stringDecode
};