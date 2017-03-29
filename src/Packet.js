const Parsers = require('./parsers');
const C = require('./constants');

class Packet {
	constructor(type, data) {
		if (typeof type !== 'number') {
			throw new Error('Invalid packet type');
		}

		this.type = type;
		this.data = data;
	}

	toJSON() {
		return [this.type, this.data];
	}

	encode(binarySupport = true) {
		return Packet.encode(this.toJSON(), binarySupport);
	}

	isValid() {
		switch (this.type) {
			case C.PACKET_TYPES.MESSAGE:
				return true;

			case C.PACKET_TYPES.EVENT:
				if (!Array.isArray(this.data) || typeof this.data[0] !== 'string') return false;
				if (~C.IMPORTANT_EVENTS.indexOf(this.data[0])) return false;

				return true;
		}

		return false;
	}

	static encode(data, binarySupport = true) {
		if (!Array.isArray(data) || data.length !== 2) {
			throw new Error('Invalid packet format');
		}

		const parser = binarySupport ? Parsers.binary : Parsers.string;
		return parser.encode(data);
	}

	static parse(rawData) {
		const parser = Parsers[typeof rawData] || Parsers.binary;
		const data = parser.decode(rawData);

		if (!data || !Array.isArray(data) || !data.length) {
			throw new Error('Invalid packet format');
		}

		return new Packet(data[0], data[1]);
	}
}

module.exports = Packet;