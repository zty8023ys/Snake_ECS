const mRandom = Math.random;

export const zUtils = {
    assert<T>(condition: T, msg?: string): T {
        if (!condition) {
            console.error(msg || 'Assertion Failed!');
            debugger;
        }
        return condition;
    },
    repeat(times: number, func: (times: number) => void) {
        while (times--) {
            func(times);
        }
    },
    fairlyRandom<T>(...args: T[]): T {
        const parts = args.length;
        const randomNumber = mRandom();
        let i = 1;
        while (randomNumber >= i / parts) {
            i++;
        }
        return args[i - 1];
    },
    nextTickDo(func: Function) {
        setTimeout(func, 0);
    },
    isBetween(number: number, min: number, max: number) {
        return min <= number && number <= max;
    },
};
