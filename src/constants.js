exports.IMPORTANT_EVENTS = [
	'error',
	'connect',
	'packet',
	'message',
	'event',
	'disconnect',
	'disconnecting',
	'newListener',
	'removeListener'
];

exports.PACKET_TYPES = {};
exports.PACKET_TYPES.MESSAGE = 0;
exports.PACKET_TYPES.EVENT = 1;
exports.PACKET_TYPES.RPC = 2;