import * as TYPES from '../../vuex/constants'
import decode from './decode'
import Conversion from './conversion'

//mutations
const mutations = {
	[TYPES.RECEIVE]: (state, message) => state[message.topic] = message.data
}

//actions
const actions = {
	'receive': ({commit}, message) => commit(TYPES.RECEIVE, message)
}

const store = {
	state: {},
	mutations: mutations,
	actions: actions,
	namespaced: true,
}

const plugin = function (dataExpress) {
	return (store) => {
		let conversion = new Conversion()
		dataExpress.onMessageArrived = (message) => {
			let tempData = decode(message)
			if (!tempData) return
			conversion.input(message.message)
			conversion.start = true
		}

		// 收到信息后设置开始计数信号
		let timer = setInterval(() => {
			if (!conversion.start) return
			store.dispatch('dataExpress/receive', {
				topic: 'dart',
				data: conversion.output()
			})
		}, 5000)
	}
}

export {store, plugin}

