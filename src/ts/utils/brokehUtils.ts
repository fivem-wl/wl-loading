export function lerp(value, min, max) {
    return min + value * (max - min);
}

export function normalize(value, min, max) {
    return (value - min) / (max - min);
}

export function fill(size, fn) {
    return [...Array(size)].map((undef, i) => fn(i));
}

export function random(min?: any, max?: number) {
    if (arguments.length === 0) {
        return Math.random();
    }
    if (Array.isArray(min)) {
        return min[Math.floor(Math.random() * min.length)];
    }
    if (min === undefined) {
        min = 1;
    }
    if (max == undefined) {
        max = min || 1;
        min = 0;
    }
    return min + Math.random() * (max - min);
}

export function toRGB(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : null;
}