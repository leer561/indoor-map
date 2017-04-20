const protobuf = require("protobufjs")
const json = require("./protos.json")
let protoRoot
protobuf.load("protos.json", function (err, root) {
	if (err) throw err;
	protoRoot = root;
})

let decode = data => {
	try {
		let topics = data.destinationName.toString().split("/")
		let protolookup = (function (arr) {
			let str = "";
			for (let i = 2; i < arr.length; i++) {
				str += arr[i];
				if (i < arr.length - 1) {
					str += ".";
				}
			}
			return str.trim(" ")
		})(topics)
		let tempData = protoRoot.lookup(protolookup)
		let tempMessage = tempData.decode(data.payloadBytes)
		let tableName = protolookup.split(".")
		tableName = tableName[tableName.length - 1]
		return {
			topic: tableName,
			message: tempMessage
		}

	} catch (e) {
		console.error("onMessageArrived error: " + e)
		return null
	}
}

export default decode