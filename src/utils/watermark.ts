/**
 * SARTOR Haute Couture Watermark & Image Downloader
 * Renders an official editorial SARTOR watermark badge on an HTML5 canvas
 * and triggers a high-resolution JPEG download.
 */

export interface WatermarkOptions {
  title?: string;
  slug?: string;
  designer?: string;
  atelier?: string;
}

export async function downloadImageWithSartorWatermark(
  imageSrc: string,
  options: WatermarkOptions = {}
): Promise<void> {
  const {
    title = 'Bespoke Bridal Design Inspiration',
    slug = 'sartor-couture',
    designer = 'Master Tailor Abdul Ghaffar',
    atelier = 'SARTOR Bespoke Atelier • Model Town, Lahore',
  } = options;

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const width = img.naturalWidth || img.width || 1920;
        const height = img.naturalHeight || img.height || 1080;

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          throw new Error('Canvas 2D context not available');
        }

        // 1. Draw base image
        ctx.drawImage(img, 0, 0, width, height);

        // 2. High-contrast gradient protection bar along bottom
        const scale = Math.max(0.6, width / 1920);
        const gradHeight = Math.max(140, Math.round(180 * scale));
        const gradient = ctx.createLinearGradient(0, height - gradHeight, 0, height);
        gradient.addColorStop(0, 'rgba(12, 10, 9, 0)');
        gradient.addColorStop(0.35, 'rgba(12, 10, 9, 0.55)');
        gradient.addColorStop(0.75, 'rgba(12, 10, 9, 0.85)');
        gradient.addColorStop(1, 'rgba(12, 10, 9, 0.96)');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, height - gradHeight, width, gradHeight);

        // 3. Subtle gold accent rule line along the top of watermark zone
        ctx.save();
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)'; // Amber-500 gold
        ctx.lineWidth = Math.max(1, Math.round(1.5 * scale));
        ctx.beginPath();
        ctx.moveTo(Math.round(40 * scale), height - gradHeight + Math.round(30 * scale));
        ctx.lineTo(width - Math.round(40 * scale), height - gradHeight + Math.round(30 * scale));
        ctx.stroke();
        ctx.restore();

        const paddingX = Math.round(48 * scale);
        const paddingY = Math.round(32 * scale);

        // 4. Left side: Title & Couture Note
        ctx.save();
        ctx.textAlign = 'left';
        ctx.textBaseline = 'bottom';

        // Article Title / Description
        const titleFontSize = Math.max(13, Math.round(20 * scale));
        ctx.font = `600 ${titleFontSize}px "Playfair Display", Georgia, serif`;
        ctx.fillStyle = '#f5f5f4'; // stone-100
        ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 2;

        const maxTitleWidth = width * 0.52;
        let displayTitle = title;
        if (ctx.measureText(displayTitle).width > maxTitleWidth) {
          while (ctx.measureText(displayTitle + '...').width > maxTitleWidth && displayTitle.length > 10) {
            displayTitle = displayTitle.slice(0, -1);
          }
          displayTitle += '...';
        }

        ctx.fillText(displayTitle, paddingX, height - paddingY - Math.round(26 * scale));

        // Subtitle / Provenance
        const subFontSize = Math.max(11, Math.round(14 * scale));
        ctx.font = `500 ${subFontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
        ctx.fillStyle = '#a8a29e'; // stone-400
        ctx.fillText(
          `Curated by ${designer}  •  ${atelier}`,
          paddingX,
          height - paddingY
        );
        ctx.restore();

        // 5. Right side: Prominent SARTOR Brandmark & Verification
        ctx.save();
        ctx.textAlign = 'right';
        ctx.textBaseline = 'bottom';

        // Secondary atelier link
        const linkFontSize = Math.max(11, Math.round(14 * scale));
        ctx.font = `600 ${linkFontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
        ctx.fillStyle = 'rgba(214, 211, 209, 0.95)'; // stone-300
        ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
        ctx.shadowBlur = 6;
        ctx.fillText('sartor.pk  •  Bespoke Couture', width - paddingX, height - paddingY);

        // Primary Brandmark "SARTOR"
        const brandFontSize = Math.max(26, Math.round(44 * scale));
        ctx.font = `bold ${brandFontSize}px "Cinzel", "Playfair Display", Georgia, serif`;
        ctx.fillStyle = '#f59e0b'; // amber-500 rich gold
        ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
        ctx.shadowBlur = 12;
        ctx.shadowOffsetY = 3;
        ctx.fillText('SARTOR', width - paddingX, height - paddingY - Math.round(22 * scale));

        ctx.restore();

        // 6. Generate high-quality JPEG and trigger download
        const cleanSlug = slug.replace(/[^a-z0-9_-]/gi, '-').toLowerCase();
        const filename = `sartor-${cleanSlug}-inspiration.jpg`;

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Failed to generate image blob'));
              return;
            }
            const blobUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
            resolve();
          },
          'image/jpeg',
          0.92
        );
      } catch (err) {
        reject(err);
      }
    };

    img.onerror = () => {
      reject(new Error(`Failed to load image from source: ${imageSrc}`));
    };

    img.src = imageSrc;
  });
}
