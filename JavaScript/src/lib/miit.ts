type EventHandler = (...args: any[]) => void;

export default class Mitt {

    constructor(private map: Map<string, EventHandler[]> = new Map<string, EventHandler[]>()) {
        this.map = map;
    }

    /**
     * @param {string} type 注册事件类型
     * @param {function} fn 注册事件回调
     * @returns {void} 
     * @description 注册事件
     */
    public on(type: string, fn: EventHandler): void {
        if (this.map.has(type)) {
            this.map.get(type)?.push(fn);
        } else {
            this.map.set(type, [fn]);
        }
    }

    /**
     * @param {string} type 注册事件类型
     * @param {function} fn 注册事件回调
     * @returns {void} 
     * @description 注销事件
     */
    public off(type: string, fn: EventHandler): void {
        if (this.map.has(type)) {
            const fns = this.map.get(type)!;
            const index = fns.indexOf(fn);
            if (index !== -1) {
                fns.splice(index, 1);
            }
        }
    }

    /**
     * @param {string} type 注册事件类型
     * @param {any[]} args 事件参数
     * @returns {void} 
     * @description 触发事件
     */
    public emit(type: string, ...args: any[]): void {
        if (this.map.has(type)) {
            const fns = this.map.get(type)!;
            fns.forEach(fn => {
                fn(...args);
            });
        }
    }

    /**
     * @param {string} type 注册事件类型
     * @param {function} fn 注册事件回调
     * @returns {void} 
     * @description 注册一次性事件
     */
    public once(type: string, fn: EventHandler): void {
        const wrapper = (...args: any[]): void => {
            fn(...args);
            this.off(type, wrapper);
        };
        this.on(type, wrapper);
    }
}

