const asc = arr => arr.sort((a, b) => a - b);

const quantile = (sorted, q) => {
    const pos = (sorted.length - 1) * q;
    const base = Math.floor(pos);
    const rest = pos - base;
    if (sorted[base + 1] !== undefined) {
        return Math.round(sorted[base] + rest * (sorted[base + 1] - sorted[base]));
    } else {
        return Math.round(sorted[base]);
    }
};

export const calculateRanges = (arr) => {
    const sorted = asc([...arr]);
    var q0 = quantile(sorted, 0);
    var first = quantile(sorted, .25);
    var second = quantile(sorted, .75);
    var q100 = quantile(sorted, 1);
    return [[q0, first], [first, second], [second, q100 + 1]]
};

// const q25 = arr => quantile(arr, .25);

// const q50 = arr => quantile(arr, .50);

// const q75 = arr => quantile(arr, .75);