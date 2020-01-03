export function throttle(f, delay) {
    let isReady = true;
    let lastArgs = null;
    let lastThis = null;
    return function wrapper(...args) {
        if (!isReady) {
            lastArgs = args;
            lastThis = this;
            return;
        }
        f.apply(this, args);
        isReady = false;
        lastThis = null;
        lastArgs = null;
        setTimeout(() => {
            isReady = true;
            if (lastArgs) {
                wrapper.apply(lastThis, lastArgs);
            }
        }, delay);
    }
}