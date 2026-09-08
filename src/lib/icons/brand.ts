type RGB = [number, number, number];

const clampByte = (v: number) => Math.min(255, Math.max(0, Math.round(v)));

const toHex = (c: RGB) =>
  "#" + c.map((v) => clampByte(v).toString(16).padStart(2, "0")).join("");

const toRGB = (h: string): RGB => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
];

/** Perceived brightness, 0-1. Enough to decide "too dark to read". */
const luminance = ([r, g, b]: RGB) => (0.299 * r + 0.587 * g + 0.114 * b) / 255;

const mix = (c: RGB, target: RGB, amount: number): RGB =>
  [0, 1, 2].map((i) => c[i]! + (target[i]! - c[i]!) * amount) as RGB;

const WHITE: RGB = [255, 255, 255];
const BLACK: RGB = [0, 0, 0];

/** Below this, a colour disappears against the dark background. */
const MIN_ON_DARK = 0.35;
/** Above this, a colour disappears against the light background. */
const MAX_ON_LIGHT = 0.72;

/**
 * Some brand colours are unreadable on one of the two backgrounds. Express is
 * #0A0A0A, Java is pure black, Linux yellow vanishes on white. Nudge each one
 * only as far as it needs to go, so recognisable brands (TypeScript blue, Go
 * cyan) pass through untouched.
 */
export function readableBrand(brand: string) {
  const rgb = toRGB(brand);
  const l = luminance(rgb);
  return {
    brandDark:
      l < MIN_ON_DARK
        ? toHex(mix(rgb, WHITE, (MIN_ON_DARK - l) / (1 - l)))
        : brand,
    brandLight:
      l > MAX_ON_LIGHT
        ? toHex(mix(rgb, BLACK, (l - MAX_ON_LIGHT) / l))
        : brand,
  };
}
