import Vue from 'vue'
Vue.prototype.$intervals = [];
Vue.prototype.$setInterval = (func, intervalMilliSec) => {
    if (typeof (process.env.VUE_APP_DISABLE_SET_INTERVAL) !== 'undefined') {
        console.log(`[DISABLE_SET_INTERVAL] Check environment vars`)
        return null
    }
    const id = setInterval(() => {
        if (document.visibilityState === 'visible') {
            func()
        }
    }, intervalMilliSec)
    vue.prototype.$intervals.push(id)
    return id
};
Vue.prototype.$clearInterval = (id) => {
    clearInterval(id)
    vue.prototype.$intervals = vue.prototype.$intervals.filter(i => i !== id)
};
Vue.prototype.$clearAllIntervals = () => {
    vue.prototype.$intervals.forEach(clearInterval)
    vue.prototype.$intervals = []
};