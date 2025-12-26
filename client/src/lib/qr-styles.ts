// QR Code Design Styles
import QRCode from "qrcode";

export type QRDesignStyle = "standard" | "dotted" | "rounded" | "pixelated" | "abstract";

interface StyleConfig {
  name: string;
  description: string;
  render: (ctx: CanvasRenderingContext2D, x: number, y: number, moduleSize: number, isDark: boolean) => void;
  renderSVG: (x: number, y: number, moduleSize: number, isDark: boolean, fgColor: string) => string;
}

const STYLES: Record<QRDesignStyle, StyleConfig> = {
  standard: {
    name: "Standard",
    description: "Classic square QR modules",
    render: (ctx, x, y, moduleSize, isDark) => {
      if (isDark) ctx.fillRect(x, y, moduleSize, moduleSize);
    },
    renderSVG: (x, y, moduleSize, isDark, fgColor) => {
      return isDark ? `<rect x="${x}" y="${y}" width="${moduleSize}" height="${moduleSize}" fill="${fgColor}" />` : "";
    }
  },

  dotted: {
    name: "Dotted",
    description: "Circular dots instead of squares",
    render: (ctx, x, y, moduleSize, isDark) => {
      if (isDark) {
        const radius = moduleSize / 2.5;
        const cx = x + moduleSize / 2;
        const cy = y + moduleSize / 2;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    },
    renderSVG: (x, y, moduleSize, isDark, fgColor) => {
      if (!isDark) return "";
      const radius = moduleSize / 2.5;
      const cx = x + moduleSize / 2;
      const cy = y + moduleSize / 2;
      return `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="${fgColor}" />`;
    }
  },

  rounded: {
    name: "Rounded",
    description: "Rounded square modules",
    render: (ctx, x, y, moduleSize, isDark) => {
      if (isDark) {
        const radius = moduleSize / 4;
        roundRect(ctx, x, y, moduleSize, moduleSize, radius);
        ctx.fill();
      }
    },
    renderSVG: (x, y, moduleSize, isDark, fgColor) => {
      if (!isDark) return "";
      const radius = moduleSize / 4;
      return `<rect x="${x}" y="${y}" width="${moduleSize}" height="${moduleSize}" rx="${radius}" ry="${radius}" fill="${fgColor}" />`;
    }
  },

  pixelated: {
    name: "Pixelated",
    description: "Chunky pixelated appearance",
    render: (ctx, x, y, moduleSize, isDark) => {
      if (isDark) {
        const gap = moduleSize * 0.15;
        const size = moduleSize - gap * 2;
        ctx.fillRect(x + gap, y + gap, size, size);
      }
    },
    renderSVG: (x, y, moduleSize, isDark, fgColor) => {
      if (!isDark) return "";
      const gap = moduleSize * 0.15;
      const size = moduleSize - gap * 2;
      return `<rect x="${x + gap}" y="${y + gap}" width="${size}" height="${size}" fill="${fgColor}" />`;
    }
  },

  abstract: {
    name: "Abstract",
    description: "Diamond pattern modules",
    render: (ctx, x, y, moduleSize, isDark) => {
      if (isDark) {
        const cx = x + moduleSize / 2;
        const cy = y + moduleSize / 2;
        const size = moduleSize / 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy - size);
        ctx.lineTo(cx + size, cy);
        ctx.lineTo(cx, cy + size);
        ctx.lineTo(cx - size, cy);
        ctx.closePath();
        ctx.fill();
      }
    },
    renderSVG: (x, y, moduleSize, isDark, fgColor) => {
      if (!isDark) return "";
      const cx = x + moduleSize / 2;
      const cy = y + moduleSize / 2;
      const size = moduleSize / 2;
      const points = `${cx},${cy - size} ${cx + size},${cy} ${cx},${cy + size} ${cx - size},${cy}`;
      return `<polygon points="${points}" fill="${fgColor}" />`;
    }
  },
};

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/**
 * Draws the QR code onto a canvas based on matrix data.
 */
export function drawQRToCanvas(
  canvas: HTMLCanvasElement,
  qrData: QRCode.QRCode,
  style: QRDesignStyle,
  fgColor: string,
  bgColor: string,
  targetSize: number
): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Margin calculation (default 4 modules)
  const margin = 2; // Matches previous margin setting
  const count = qrData.modules.size;
  const sizeWithMargin = count + margin * 2;

  // Calculate module size
  const moduleSize = targetSize / sizeWithMargin;

  // Set real canvas dimensions
  canvas.width = targetSize;
  canvas.height = targetSize;

  // Clear background
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, targetSize, targetSize);

  ctx.fillStyle = fgColor;

  const styleConfig = STYLES[style];

  for (let r = 0; r < count; r++) {
    for (let c = 0; c < count; c++) {
      const isDark = qrData.modules.get(r, c);
      const x = (margin + c) * moduleSize;
      const y = (margin + r) * moduleSize;
      styleConfig.render(ctx, x, y, moduleSize, !!isDark);
    }
  }
}

/**
 * Generates an SVG string for the QR code.
 */
export function generateQRSVG(
  qrData: QRCode.QRCode,
  style: QRDesignStyle,
  fgColor: string,
  bgColor: string,
  targetSize: number,
  logoUrl?: string | null
): string {
  const margin = 2;
  const count = qrData.modules.size;
  const sizeWithMargin = count + margin * 2;
  const moduleSize = targetSize / sizeWithMargin;

  const styleConfig = STYLES[style];
  let paths = "";

  for (let r = 0; r < count; r++) {
    for (let c = 0; c < count; c++) {
      const isDark = qrData.modules.get(r, c);
      const x = (margin + c) * moduleSize;
      const y = (margin + r) * moduleSize;

      // If logo is present, don't draw modules in the center
      if (logoUrl) {
        const centerStart = Math.floor(count * 0.4);
        const centerEnd = Math.floor(count * 0.6);
        // Adjust these bounds to match logo size (approx 20%)
        if (r >= centerStart && r < centerEnd && c >= centerStart && c < centerEnd) {
          continue; // Skip center modules
        }
      }

      paths += styleConfig.renderSVG(x, y, moduleSize, !!isDark, fgColor);
    }
  }

  let logoSvg = "";
  if (logoUrl) {
    const logoSize = targetSize * 0.2;
    const logoX = (targetSize - logoSize) / 2;
    const logoY = (targetSize - logoSize) / 2;
    logoSvg = `<image href="${logoUrl}" x="${logoX}" y="${logoY}" width="${logoSize}" height="${logoSize}" preserveAspectRatio="xMidYMid meet" />`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${targetSize}" height="${targetSize}" viewBox="0 0 ${targetSize} ${targetSize}">
    <rect width="100%" height="100%" fill="${bgColor}" />
    ${paths}
    ${logoSvg}
  </svg>`;
}

export function getAvailableStyles(): Array<{ id: QRDesignStyle; name: string; description: string }> {
  return Object.entries(STYLES).map(([id, config]) => ({
    id: id as QRDesignStyle,
    name: config.name,
    description: config.description,
  }));
}
