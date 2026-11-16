const shimmerSvg = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#1c1917" offset="20%" />
      <stop stop-color="#292524" offset="50%" />
      <stop stop-color="#1c1917" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#1c1917" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1.4s" repeatCount="indefinite" />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

export const SHIMMER_BLUR_DATA_URL = `data:image/svg+xml;base64,${toBase64(shimmerSvg(700, 475))}`;

export const DEFAULT_FALLBACK_IMAGE = '/images/services/simple-suit.jpg';
export const DEFAULT_BRIDAL_FALLBACK_IMAGE = '/images/royal-crimson-barat-lehenga-zardozi-architecture-guide.jpg';
