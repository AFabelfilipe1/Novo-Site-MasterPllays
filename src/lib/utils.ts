export const formatDuration = (seconds: number) => {
const m = Math.floor(seconds / 60).toString().padStart(2, '0');
const s = Math.floor(seconds % 60).toString().padStart(2, '0');
return `${m}:${s}`;
};


export const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));