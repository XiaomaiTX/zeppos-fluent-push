/**
 * zeppos-fluent-push.js
 * @description A page switching library that provides fade-out effects in ZeppOS. 一个在ZeppOS中提供淡出效果的页面切换库
 * @version 1.0.1
 * @date 2023/03/12
 * @author XiaomaiTX
 * @license MIT
 * https://github.com/XiaomaiTX/zeppos-newGotoPage
 *
 * How to use
 *
 * Please add the following field to the header of the file (replace the path with the path where you store newGotoPage.js)
 * import { fpush,pageInit } from "../utils/zeppos-fluent-push";
 *
 * @example fpush()
 * You can replace the ZeppOS official gotoPage usage directly with the following method
 *
 * ZeppOS official gotoPage method:
 * push({ url: "page/Settings/plan", param: "" });
 *
 * Replace the method with zeppos-fluent-push.js:
 * fpush({ url: "page/Settings/plan", param: "" });
 *
 * Like this, you just neehmAppd to add "f" before "push"
 *
 * @example pageInit()
 * Add the following field in build() and replace the original code of the page with "Your Code". 在build()中添加如下字段，并将页面原来的代码替换掉"Your Code"即可
 *
 *  pageInit({
 *      onStop() {
 *          YourCode
 *      },
 *  });
 */

import { Fx } from "./fx";

import * as hmUI from "@zos/ui";
import { getDeviceInfo } from "@zos/device";
import { push, back } from "@zos/router";
import { getScrollTop } from "@zos/page";

const deviceInfo = getDeviceInfo();
const { width, height } = deviceInfo;

const PAGE_MASK = {
	center_x: width / 2,
	center_y: height / 2,
	radius: (width * 1.5) / 2,
	color: 0x000000,
	alpha: 0,
};
const PAGE_INIT_MASK = {
	center_x: width / 2,
	center_y: height / 2,
	radius: (width * 1.5) / 2,
	color: 0x000000,
	alpha: 255,
};

export function fpush(param) {
	hmUI.setStatusBarVisible(false);
	console.log(param.url);
	console.log(param.param);
	const ScrollY = getScrollTop();
	const page_mask = hmUI.createWidget(hmUI.widget.CIRCLE, {
		...PAGE_MASK,
		center_y: PAGE_MASK.center_y - ScrollY,
	});
	new Fx({
		begin: 0, // Initial value of function. 初始函数值
		end: 255, // Target value of function. 目标函数值
		fps: 60, // FPS. 帧率
		time: 0.1, // Total during time (s). 总时长(秒)
		style: Fx.Styles.EASE_OUT_EXPO, // Types of animation presets used, seeing @Fx.Style. 预设类型 见下面的Fx.Style
		onStop() {
			push({ url: param.url, param: param.param });
		}, // Callback function at the end of the animation. 动画结束后的回调函数

		// Callback function for each frame, the parameter is the current function value, the value range is [begin, end]
		// 每一帧的回调函数，参数为当前函数值，取值范围为[begin, end]
		func: (result) => {
			page_mask.setProperty(hmUI.prop.MORE, {
				center_x: PAGE_MASK.center_x,
				center_y: PAGE_MASK.center_y - ScrollY,
				radius: PAGE_MASK.radius,
				color: PAGE_MASK.color,
				alpha: result,
			});
		},
	});
}
export function fback() {
	hmUI.setStatusBarVisible(false);
	const ScrollY = getScrollTop();
	const page_mask = hmUI.createWidget(hmUI.widget.CIRCLE, {
		...PAGE_MASK,
		center_y: PAGE_MASK.center_y - ScrollY,
	});
	new Fx({
		begin: 0, // Initial value of function. 初始函数值
		end: 255, // Target value of function. 目标函数值
		fps: 60, // FPS. 帧率
		time: 0.1, // Total during time (s). 总时长(秒)
		style: Fx.Styles.EASE_OUT_EXPO, // Types of animation presets used, seeing @Fx.Style. 预设类型 见下面的Fx.Style
		onStop() {
			back();
		}, // Callback function at the end of the animation. 动画结束后的回调函数

		// Callback function for each frame, the parameter is the current function value, the value range is [begin, end]
		// 每一帧的回调函数，参数为当前函数值，取值范围为[begin, end]
		func: (result) => {
			page_mask.setProperty(hmUI.prop.MORE, {
				center_x: PAGE_MASK.center_x,
				center_y: PAGE_MASK.center_y - ScrollY,
				radius: PAGE_MASK.radius,
				color: PAGE_MASK.color,
				alpha: result,
			});
		},
	});
}
export function pageInit(param) {
	hmUI.setStatusBarVisible(false);
	t = 1;
	param.onStop();
	const page_mask = hmUI.createWidget(hmUI.widget.CIRCLE, PAGE_INIT_MASK);
	new Fx({
		begin: 255, // Initial value of function. 初始函数值
		end: 0, // Target value of function. 目标函数值
		fps: 60, // FPS. 帧率
		time: t, // Total during time (s). 总时长(秒)
		style: Fx.Styles.EASE_OUT_EXPO, // Types of animation presets used, seeing @Fx.Style. 预设类型 见下面的Fx.Style
		onStop() {
			page_mask.setEnable(false);
		}, // Callback function at the end of the animation. 动画结束后的回调函数

		// Callback function for each frame, the parameter is the current function value, the value range is [begin, end]
		// 每一帧的回调函数，参数为当前函数值，取值范围为[begin, end]
		func: (result) => {
			page_mask.setProperty(hmUI.prop.MORE, {
				center_x: PAGE_MASK.center_x,
				center_y: PAGE_MASK.center_y,
				radius: PAGE_MASK.radius,
				color: PAGE_MASK.color,
				alpha: result,
			});
		},
	});
}
