/**
 * Created by leer on 2016/12/7.
 * use for connect mqtt server
 * disconnect函数 关闭连接
 * send 发送消息
 * subscribe 订阅消息
 * 订阅的topic 事件用来接收的消息
 * 增加需要配置存储的topic对象 topicStorages,用于处理最后mqtt最后一条的推送
 **/
import OPTIONS from './config'

export default class DataExpress extends Golo.MQTT.Client {
	constructor() {
		super(OPTIONS.host, OPTIONS.port, OPTIONS.clientId)

		this.promise = new Promise((resolve, reject) => {
			this.connect({
				userName: OPTIONS.userName,
				password: OPTIONS.password,
				keepAliveInterval: Number(OPTIONS.keepAlive),
				onSuccess: () => {
					console.log("The client connect success.")
					this.subscribe('dart')
					this.subscribe('/id_1111/protos/Dart')
					resolve('success')
				},
				onFailure: () => {
					console.error('mqtt connect Failure', errorCode)
					reject(errorCode)
				}
			})
		})

		//更改私有方法
		this._send = this.send
		this._subscribe = this.subscribe
		this._unsubscribe = this.unsubscribe
		this._disconnect = this.disconnect

		// Golo.MQTT.Client是实例上的方法需要复写
		this.send = (topic, msg) => {
			this.promise.then(() => {
				let message = new Golo.MQTT.Message(msg)
				message.destinationName = topic
				this._send(message)
			})
		}

		//订阅
		this.subscribe = (topic) => {
			this.promise.then(() => this._subscribe(topic))
		}

		//取消订阅
		this.unsubscribe = (topic) => {
			this.promise.then(() => this._unsubscribe(topic))
		}

		//关闭连接
		this.disconnect = () => {
			this.promise.then(() => this._disconnect())
		}

		//丢失链接
		this.onConnectionLost = (responseObject) => console.error("data express已断开链接" + responseObject.errorMessage)
	}
}