const msgpack = require('msgpack-lite');

const MSGPACK_CODEC = msgpack.createCodec({
	binarraybuffer: true,
	preset: true
});

function binaryEncode(data) {
	return msgpack.encode(data, {codec: MSGPACK_CODEC}).buffer;
}

function binaryDecode(data) {
	return msgpack.decode(new Uint8Array(data), {codec: MSGPACK_CODEC});
}

module.exports = {
	encode: binaryEncode,
	decode: binaryDecode
}