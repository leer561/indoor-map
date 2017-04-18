/**
 * 定时获取信息，默认5秒缓存一组数据
 */
import values from 'lodash/values'

class Conversion {
	constructor(name = 'tag') {
		this.start = null
		this.name = name
		this.obj = {}
	}
	input(data){
		this.obj[data[this.name]] = {x: data.x, y: data.y}
	}
	output(){
		return values(this.obj)
	}
	clear(){
		this.obj = {}
	}
}

export default Conversion