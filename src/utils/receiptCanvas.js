/**
 * Generates an ultra-crisp 2x retina thermal receipt image as a base64 Data URL.
 * Includes authentic top & bottom jagged zigzag cutter teeth with transparent background,
 * 100% CORS-safe, instantaneous, and perfectly textured for PaperCrumple 3D WebGL meshes.
 */
export function generateReceiptImage({
  storeName = "DIKSHI TECHNOLOGIES",
  location = "Jaipur Flagship Showroom",
  orderPrefix = "#482",
  orderNum = 28,
  currentDate = "18 NOV 2026",
  currentTime = "15:02",
  items = [
    { name: "1 x Kanjivaram Pure Zari Silk Saree", price: "₹4,499" },
    { name: "1 x Star Snapback Cotton Cap", price: "₹899" },
    { name: "1 x Golden Flame Fluid Earrings", price: "₹1,299" }
  ],
  subtotal = "₹6,697",
  tax = "₹335",
  total = "₹7,032",
  barcode = "138232932"
}) {
  if (typeof document === 'undefined') return '';

  const canvas = document.createElement('canvas');
  const w = 560; // 2x width for 280px display
  const h = 760; // 2x height for 380px display
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // 1. Clear full canvas to 100% transparent PNG
  ctx.clearRect(0, 0, w, h);

  // 2. Authentic Zigzag Thermal Paper Contour (Top & Bottom sharp serrated teeth)
  const toothCount = 20;
  const toothWidth = w / toothCount; // 28px per tooth
  const toothHeight = 16; // 8px visual height at 2x retina

  ctx.beginPath();
  // Top zigzag teeth: valleys at y = toothHeight, peaks at y = 0
  ctx.moveTo(0, toothHeight);
  for (let i = 0; i < toothCount; i++) {
    ctx.lineTo((i + 0.5) * toothWidth, 0);
    ctx.lineTo((i + 1) * toothWidth, toothHeight);
  }

  // Right edge down to bottom teeth start
  ctx.lineTo(w, h - toothHeight);

  // Bottom zigzag teeth: peaks at y = h, valleys at y = h - toothHeight
  for (let i = toothCount - 1; i >= 0; i--) {
    ctx.lineTo((i + 0.5) * toothWidth, h);
    ctx.lineTo(i * toothWidth, h - toothHeight);
  }

  // Left edge back to top start
  ctx.lineTo(0, toothHeight);
  ctx.closePath();

  // Fill thermal paper base with pure white & subtle warm tint
  ctx.fillStyle = '#ffffff';
  ctx.fill();

  ctx.fillStyle = '#fdfbf7';
  ctx.fill();

  // Outer paper contour border (traces exact jagged zigzag teeth)
  ctx.strokeStyle = '#dcd8cf';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Bottom perforated tear guideline just above the bottom teeth
  ctx.save();
  ctx.setLineDash([8, 6]);
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(24, h - toothHeight - 8);
  ctx.lineTo(w - 24, h - toothHeight - 8);
  ctx.stroke();
  ctx.restore();

  // 3. Header Brand Name & Logo
  ctx.fillStyle = '#0f172a';
  ctx.textAlign = 'center';
  ctx.font = 'bold 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(storeName, w / 2, 60);

  // Location / Outlet
  ctx.fillStyle = '#64748b';
  ctx.font = '18px "Courier New", Courier, monospace';
  ctx.fillText(location, w / 2, 92);

  // Order # and Timestamp
  ctx.fillStyle = '#334155';
  ctx.font = 'bold 20px "Courier New", Courier, monospace';
  ctx.textAlign = 'left';
  ctx.fillText(`ORDER ${orderPrefix}${orderNum}`, 42, 136);
  ctx.textAlign = 'right';
  ctx.fillText(currentTime, w - 42, 136);

  ctx.textAlign = 'left';
  ctx.fillStyle = '#64748b';
  ctx.font = '18px "Courier New", Courier, monospace';
  ctx.fillText(currentDate, 42, 166);

  // Dashed Divider
  ctx.setLineDash([10, 8]);
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(42, 188);
  ctx.lineTo(w - 42, 188);
  ctx.stroke();

  // 4. Line Items
  let y = 228;
  items.forEach(item => {
    ctx.fillStyle = '#1e293b';
    ctx.textAlign = 'left';
    ctx.font = '19px "Courier New", Courier, monospace';
    
    // Truncate if long
    let name = item.name;
    const maxItemW = w - 170;
    while (ctx.measureText(name).width > maxItemW && name.length > 5) {
      name = name.slice(0, -4) + '...';
    }
    ctx.fillText(name, 42, y);

    ctx.textAlign = 'right';
    ctx.font = 'bold 20px "Courier New", Courier, monospace';
    ctx.fillText(item.price, w - 42, y);
    y += 42;
  });

  // Dashed Divider
  ctx.setLineDash([10, 8]);
  ctx.beginPath();
  ctx.moveTo(42, y + 6);
  ctx.lineTo(w - 42, y + 6);
  ctx.stroke();

  y += 44;
  // Subtotal & Tax
  ctx.fillStyle = '#64748b';
  ctx.textAlign = 'left';
  ctx.font = '19px "Courier New", Courier, monospace';
  ctx.fillText('Subtotal', 42, y);
  ctx.textAlign = 'right';
  ctx.fillText(subtotal, w - 42, y);

  y += 32;
  ctx.textAlign = 'left';
  ctx.fillText('Tax (5% GST)', 42, y);
  ctx.textAlign = 'right';
  ctx.fillText(tax, w - 42, y);

  y += 42;
  // Grand Total Highlight
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 26px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('TOTAL', 42, y);
  ctx.textAlign = 'right';
  ctx.font = 'bold 30px "Courier New", Courier, monospace';
  ctx.fillText(total, w - 42, y);

  // 5. Barcode Representation
  y += 56;
  ctx.setLineDash([]);
  const barcodePattern = [3, 2, 5, 2, 4, 6, 2, 5, 3, 2, 6, 3, 2, 5, 2, 3, 5, 2, 3, 6, 2, 4, 5, 3, 2, 4, 2, 3];
  const barStart = 70;
  const barWidth = (w - 140) / barcodePattern.length;
  barcodePattern.forEach((thick, i) => {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(barStart + i * barWidth, y, Math.min(thick * 1.6, barWidth - 1), 44);
  });

  y += 66;
  ctx.fillStyle = '#64748b';
  ctx.font = '16px "Courier New", Courier, monospace';
  ctx.textAlign = 'center';
  ctx.fillText(barcode, w / 2, y);

  y += 30;
  ctx.fillStyle = '#94a3b8';
  ctx.font = 'italic 16px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillText('Thank you. Visit again.', w / 2, y);

  return canvas.toDataURL('image/png');
}
