const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const inputDir = './public/images';
const outputDir = './public/images/webp';
const quality = 80;

console.log('🚀 Starting WebP conversion...\n');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`✓ Created output directory: ${outputDir}\n`);
}

// Check if input directory exists
if (!fs.existsSync(inputDir)) {
  console.error(`❌ Error: Input directory '${inputDir}' does not exist!`);
  console.log(`\nPlease create the directory and add your images, or update the inputDir path in the script.\n`);
  process.exit(1);
}

// Get all image files
const files = fs.readdirSync(inputDir).filter(file => 
  /\.(jpg|jpeg|png)$/i.test(file)
);

if (files.length === 0) {
  console.log(`⚠️  No JPG or PNG images found in '${inputDir}'`);
  console.log(`\nPlease add some images to convert, or check the inputDir path.\n`);
  process.exit(0);
}

console.log(`Found ${files.length} image(s) to convert:\n`);

let successCount = 0;
let errorCount = 0;

// Convert each image
const convertPromises = files.map(file => {
  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(outputDir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
  
  return sharp(inputPath)
    .webp({ quality: quality })
    .toFile(outputPath)
    .then(info => {
      const inputStats = fs.statSync(inputPath);
      const outputStats = fs.statSync(outputPath);
      const savings = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);
      
      console.log(`✓ ${file}`);
      console.log(`  Original: ${(inputStats.size / 1024).toFixed(1)} KB`);
      console.log(`  WebP: ${(outputStats.size / 1024).toFixed(1)} KB`);
      console.log(`  Saved: ${savings}%\n`);
      
      successCount++;
    })
    .catch(err => {
      console.error(`✗ Error converting ${file}:`, err.message, '\n');
      errorCount++;
    });
});

// Wait for all conversions to complete
Promise.all(convertPromises).then(() => {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✨ Conversion complete!');
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
  console.log(`✓ Successfully converted: ${successCount} image(s)`);
  if (errorCount > 0) {
    console.log(`✗ Failed: ${errorCount} image(s)`);
  }
  console.log(`\n📁 WebP images saved to: ${outputDir}\n`);
  
  if (successCount > 0) {
    console.log('Next steps:');
    console.log('1. Update your image imports to use .webp files');
    console.log('2. Use the LazyImage component for lazy loading');
    console.log('3. Test your website performance with Lighthouse\n');
  }
});
