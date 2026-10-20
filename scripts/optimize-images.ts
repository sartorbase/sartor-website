import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function optimizeImages() {
  console.log('⚡ Starting SARTOR Mobile Image Optimization & WebP Generation...');
  const directories = ['public', 'public/images', 'public/images/services'];

  let totalOriginal = 0;
  let totalOptimized = 0;
  let totalWebp = 0;

  for (const dir of directories) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) continue;

      const ext = path.extname(file).toLowerCase();
      if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

      const originalSize = stat.size;
      totalOriginal += originalSize;

      const baseName = path.basename(file, ext);
      const webpPath = path.join(dir, `${baseName}.webp`);

      try {
        const image = sharp(filePath);
        const metadata = await image.metadata();

        // 1. Generate ultra-efficient WebP
        let webpPipeline = sharp(filePath);
        if (metadata.width && metadata.width > 1400) {
          webpPipeline = webpPipeline.resize({ width: 1400, withoutEnlargement: true });
        }
        const webpBuffer = await webpPipeline
          .webp({ quality: 80, effort: 6, smartSubsample: true })
          .toBuffer();
        fs.writeFileSync(webpPath, webpBuffer);
        totalWebp += webpBuffer.length;

        // 2. Optimize original format in place with mozjpeg / png compression
        let optimizedBuffer: Buffer;
        if (ext === '.jpg' || ext === '.jpeg') {
          let jpgPipeline = sharp(filePath);
          if (metadata.width && metadata.width > 1400) {
            jpgPipeline = jpgPipeline.resize({ width: 1400, withoutEnlargement: true });
          }
          optimizedBuffer = await jpgPipeline
            .jpeg({ quality: 80, mozjpeg: true, progressive: true })
            .toBuffer();
        } else {
          // PNG
          optimizedBuffer = await sharp(filePath)
            .png({ compressionLevel: 9, quality: 80, palette: true })
            .toBuffer();
        }

        // Only overwrite if optimized is smaller
        if (optimizedBuffer.length < originalSize) {
          fs.writeFileSync(filePath, optimizedBuffer);
          totalOptimized += optimizedBuffer.length;
          console.log(
            `✔ ${file}: ${(originalSize / 1024).toFixed(1)} KB -> ${(optimizedBuffer.length / 1024).toFixed(1)} KB JPG/PNG (-${Math.round((1 - optimizedBuffer.length / originalSize) * 100)}%) | WebP: ${(webpBuffer.length / 1024).toFixed(1)} KB`
          );
        } else {
          totalOptimized += originalSize;
          console.log(
            `ℹ ${file}: Kept original ${(originalSize / 1024).toFixed(1)} KB | WebP: ${(webpBuffer.length / 1024).toFixed(1)} KB`
          );
        }
      } catch (err) {
        console.error(`❌ Failed to optimize ${file}:`, err);
      }
    }
  }

  console.log('\n📊 Image Optimization Summary:');
  console.log(`Original Assets Size : ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Compressed Assets Size: ${(totalOptimized / 1024 / 1024).toFixed(2)} MB (-${Math.round((1 - totalOptimized / totalOriginal) * 100)}%)`);
  console.log(`Total WebP Assets Size: ${(totalWebp / 1024 / 1024).toFixed(2)} MB`);
  console.log('✨ All images optimized and modern WebP alternatives created successfully!');
}

optimizeImages();
