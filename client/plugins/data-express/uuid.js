function getUUID(len) {
	const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
	let uuid = []

	// rfc4122 requires these characters
	uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
	uuid[14] = '4';

	// Fill in random data.  At i==19 set the high bits of clock sequence as
	// per rfc4122, sec. 4.1.5
	for (let i = 0; i < 36; i++) {
		if (!uuid[i]) {
			let r = 0 | Math.random() * 16;
			uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
		}
	}
	let tempUuid = uuid.join('')
	window.localStorage.setItem("UUID", tempUuid)
	return tempUuid
};

var localUuid = window.localStorage.getItem("UUID")
var uuid = localUuid ? localUuid : getUUID()
export default uuid
