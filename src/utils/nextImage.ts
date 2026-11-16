import RawNextImage, { type ImageProps } from 'next/image';

const ResolvedNextImage = (
  (RawNextImage as unknown as { default?: typeof RawNextImage }).default ?? RawNextImage
) as typeof RawNextImage;

export { ResolvedNextImage as Image };
export type { ImageProps };
export default ResolvedNextImage;
