// QR Code Design Styles
// This module provides different visual styles for rendering QR codes

export type QRDesignStyle = "standard" | "dotted" | "rounded" | "pixelated" | "abstract";

interface StyleConfig {
  name: string;
  description: string;
  render: (ctx: CanvasRenderingContext2D, moduleSize: number, isDark: boolean, x: number, y: number) => void;
}

const STYLES: Record<QRDesignStyle, StyleConfig> = {
  standard: {
    name: "Standard",
    description: "Classic square QR modules",
    render: (ctx, moduleSize, isDark, x, y) => {
      if (isDark) {
        ctx.fillRect(x, y, moduleSize, moduleSize);
      }
    },
  },

  dotted: {
    name: "Dotted",
    description: "Circular dots instead of squares",
    render: (ctx, moduleSize, isDark, x, y) => {
      if (isDark) {
        const radius = moduleSize / 2.5;
        ctx.beginPath();
        ctx.arc(x + moduleSize / 2, y + moduleSize / 2, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    },
  },

  rounded: {
    name: "Rounded",
    description: "Rounded square modules",
    render: (ctx, moduleSize, isDark, x, y) => {
      if (isDark) {
        const radius = moduleSize / 4;
        roundRect(ctx, x, y, moduleSize, moduleSize, radius);
        ctx.fill();
      }
    },
  },

  pixelated: {
    name: "Pixelated",
    description: "Chunky pixelated appearance",
    render: (ctx, moduleSize, isDark, x, y) => {
      if (isDark) {
        const gap = moduleSize * 0.15;
        const size = moduleSize - gap * 2;
        ctx.fillRect(x + gap, y + gap, size, size);
      }
    },
  },

  abstract: {
    name: "Abstract",
    description: "Diamond pattern modules",
    render: (ctx, moduleSize, isDark, x, y) => {
      if (isDark) {
        const centerX = x + moduleSize / 2;
        const centerY = y + moduleSize / 2;
        const size = moduleSize / 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - size);
        ctx.lineTo(centerX + size, centerY);
        ctx.lineTo(centerX, centerY + size);
        ctx.lineTo(centerX - size, centerY);
        ctx.closePath();
        ctx.fill();
      }
    },
  },
};

// Helper function to draw rounded rectangles
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

export function applyDesignStyle(
  canvas: HTMLCanvasElement,
  moduleSize: number,
  style: QRDesignStyle,
  fgColor: string,
  bgColor: string
): HTMLCanvasElement {
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  const styleConfig = STYLES[style];
  if (!styleConfig) return canvas;

  // Create a new canvas to draw the styled modules
  const newCanvas = document.createElement("canvas");
  newCanvas.width = canvas.width;
  newCanvas.height = canvas.height;
  const newCtx = newCanvas.getContext("2d");
  if (!newCtx) return canvas;

  // Fill background
  newCtx.fillStyle = bgColor;
  newCtx.fillRect(0, 0, newCanvas.width, newCanvas.height);

  // Set foreground color
  newCtx.fillStyle = fgColor;

  // Get image data from original canvas to detect dark modules
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // Iterate through modules
  const canvasSize = canvas.width;
  const modulesPerSide = Math.round(canvasSize / moduleSize);

  for (let row = 0; row < modulesPerSide; row++) {
    for (let col = 0; col < modulesPerSide; col++) {
      const x = col * moduleSize;
      const y = row * moduleSize;

      // Sample the pixel at the center of the module to determine if it's dark
      const centerX = Math.floor(x + moduleSize / 2);
      const centerY = Math.floor(y + moduleSize / 2);

      if (centerX < canvasSize && centerY < canvasSize) {
        const pixelIndex = (centerY * canvasSize + centerX) * 4;
        const r = data[pixelIndex];
        const g = data[pixelIndex + 1];
        const b = data[pixelIndex + 2];

        // If pixel is dark (QR module), render the style
        const isDark = r < 128 && g < 128 && b < 128;

        styleConfig.render(newCtx, moduleSize, isDark, x, y);
      }
    }
  }

  return newCanvas;
}

export function getAvailableStyles(): Array<{ id: QRDesignStyle; name: string; description: string }> {
  return Object.entries(STYLES).map(([id, config]) => ({
    id: id as QRDesignStyle,
    name: config.name,
    description: config.description,
  }));
}
