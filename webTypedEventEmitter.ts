﻿import { WebTypedCallInfo } from './webTypedCallInfo';
import { WebTypedFunction } from './webTypedFunction';
export class WebTypedEventEmitter {
	private static single = new WebTypedEventEmitter();
	private methods: Array<WebTypedFunction<any,any>> = [];
    private callbacks: Array<Array<(info: WebTypedCallInfo<any, any>) => any>> = [];
	constructor() { }
	on = <TParameters, TResult>(f: WebTypedFunction<TParameters, TResult>,
		callback: (info: WebTypedCallInfo<TParameters, TResult>) => any): WebTypedEventEmitter => {
        var index = this.methods.indexOf(f);
        if (index < 0) {
            index = this.methods.length;
            this.methods.push(f);
            this.callbacks.push([]);
        }
        this.callbacks[index].push(callback);
        return this;
	};
	static on = <TParameters, TResult>(f: WebTypedFunction<TParameters, TResult>, callback: (info: WebTypedCallInfo<TParameters, TResult>) => any): WebTypedEventEmitter => {
        return WebTypedEventEmitter.single.on(f, callback);
	};
	off = <TParameters, TResult>(f: WebTypedFunction<TParameters, TResult>, callback: (info: WebTypedCallInfo<TParameters, TResult>) => any): WebTypedEventEmitter => {
        var index = this.methods.indexOf(f);
        if (index >= 0) {
            var callbackIndex = this.callbacks[index].indexOf(callback);
            if (callbackIndex >= 0) {
                this.callbacks[index].splice(callbackIndex, 1);
            }
        }
        return this;
	};
	static off = <TParameters, TResult>(f: WebTypedFunction<TParameters, TResult>, callback: (info: WebTypedCallInfo<TParameters, TResult>) => any): WebTypedEventEmitter => {
        return WebTypedEventEmitter.single.off(f, callback);
    };
	private emit = <TParameters, TResult>(info: WebTypedCallInfo<TParameters, TResult>): void => {
        var index = this.methods.indexOf(info.func);
        if (index >= 0) {
            this.callbacks[index].forEach(c => { c(info); });
        }
    };
}