import isObj from 'lodash/isObject'
import forEach from 'lodash/forEach'
import map from 'lodash/map'
import round from 'lodash/round'

// 数据转换，像素转换为米
const changeToMi = data => round(data * 2175 / 1366)

const changeToMIFunc = data => {
	if (isObj(data)) {
		let tempObj = data
		forEach(tempObj, (value, key) => tempObj[key] = changeToMi(value))
		return tempObj
	} else {
		return map(data, item => changeToMi(item))
	}
}
export const changeToPxels = data => round(data * 1366 / 2175)
export const changeToPxelsFunc = data => {
	if (isObj(data)) {
		let tempObj = data
		forEach(tempObj, (value, key) => tempObj[key] = changeToPxels(value))
		return tempObj
	} else {
		return map(data, item => changeToPxels(item))
	}
}

export const changeData = (covers, type) => {
	let funcName = type ? changeToPxelsFunc : changeToMIFunc
	let singleFunc = type ? changeToPxels : changeToMi
	if (!covers.length) return []
	return map(covers, cover => {
		switch (cover.type) {
			case 'rect':
				return {
					type: cover.type,
					name: cover.name,
					remark: cover.remark,
					coordinate: map(cover.coordinate, obj => funcName(obj))
				}
			case 'circle':
				return {
					type: cover.type,
					name: cover.name,
					remark: cover.remark,
					coordinate: {
						radius: singleFunc(cover.coordinate.radius),
						position: funcName(cover.coordinate.position)
					}
				}
			case 'polygon':
				return {
					type: cover.type,
					name: cover.name,
					remark: cover.remark,
					coordinate: map(cover.coordinate, data => singleFunc(data))
				}
		}
	})
}
