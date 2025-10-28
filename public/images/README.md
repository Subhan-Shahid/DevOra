# Images Directory

This directory contains all images used in the DevOra website.

## Structure

```
images/
├── original/          # Original high-resolution images (backup)
├── webp/             # WebP optimized versions (generated)
├── jpg/              # Optimized JPG fallbacks
├── png/              # Optimized PNG images
└── svg/              # Vector graphics (logos, icons)
```

## Usage

1. **Add your original images** to this directory (or the `original/` subdirectory)
2. **Run the conversion script** to generate WebP versions:
   ```bash
   node convert-to-webp.js
   ```
3. **Use the LazyImage component** in your React code:
   ```jsx
   import LazyImage from './components/LazyImage';
   
   <LazyImage
     src="/images/webp/hero-bg.webp"
     alt="Hero background"
     width="100%"
     aspectRatio={16/9}
   />
   ```

## Image Guidelines

### Recommended Sizes
- **Hero images**: 1920x1080px
- **Service cards**: 800x600px
- **Thumbnails**: 400x300px
- **Icons**: 64x64px (use SVG when possible)

### Optimization
- Use WebP format for photos and complex images
- Use SVG for logos, icons, and simple graphics
- Compress images to 80% quality
- Use appropriate dimensions (don't load 4K for thumbnails)

### Naming Convention
- Use lowercase with hyphens: `hero-background.jpg`
- Be descriptive: `service-web-development.jpg`
- Include size suffix if multiple versions: `logo-large.svg`, `logo-small.svg`

## Notes

- Always keep original high-resolution images as backup
- WebP files are generated automatically by the conversion script
- Update image paths in your components after conversion
