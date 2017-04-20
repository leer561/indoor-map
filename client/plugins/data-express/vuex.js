import * as TYPES from '../../vuex/constants'
import decode from './decode'
import Conversion from './conversion'
import isArray from 'lodash/isArray'

//mutations
const mutations = {
	[TYPES.RECEIVE]: (state, message) => {
		let oldData = state[message.topic]
		if (oldData && isArray(oldData)) {
			state[message.topic].splice(0, oldData.length)
			state[message.topic].push(...message.data)
		} else {
			state[message.topic] = message.data
		}
	}
}

//actions
const actions = {
	'receive': ({commit}, message) => commit(TYPES.RECEIVE, message)
}

const store = {
	state: {
		dart:[]
	},
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
			console.log('tempData', tempData)
			conversion.input(tempData.message)
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

