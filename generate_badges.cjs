const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outDir = 'C:\\Users\\DIKSHI\\Desktop\\responsive\\public\\assets';

const logoPath = path.join(outDir, 'dikshi-logo.png');
const logoBase64 = fs.readFileSync(logoPath).toString('base64');
const logoDataUri = `data:image/png;base64,${logoBase64}`;

// 1. FRONT BADGE HTML (1024 x 1440)
const frontHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
  body {
    width: 1024px;
    height: 1440px;
    background: radial-gradient(circle at 85% 15%, #1a365d 0%, #0a1128 45%, #050814 100%);
    color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 60px 54px;
    position: relative;
    overflow: hidden;
  }
  .grid-bg {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(rgba(59, 130, 246, 0.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(59, 130, 246, 0.08) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
  }
  .glow-orb {
    position: absolute;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(14, 165, 233, 0.18) 0%, rgba(59, 130, 246, 0) 70%);
    top: -150px;
    right: -150px;
    pointer-events: none;
  }
  .glow-orb-2 {
    position: absolute;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(234, 179, 8, 0.12) 0%, rgba(234, 179, 8, 0) 70%);
    bottom: -100px;
    left: -100px;
    pointer-events: none;
  }

  /* Header */
  .header {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid rgba(255, 255, 255, 0.12);
    padding-bottom: 28px;
  }
  .brand-group {
    display: flex;
    align-items: center;
    gap: 18px;
  }
  .logo-box {
    width: 76px;
    height: 76px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.22) 0%, rgba(15, 23, 42, 0.6) 100%);
    border: 2px solid rgba(255, 255, 255, 0.35);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    box-shadow: 0 10px 25px rgba(4, 86, 221, 0.4), inset 0 1px 2px rgba(255,255,255,0.4);
    backdrop-filter: blur(10px);
  }
  .logo-box img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 3px 6px rgba(0,0,0,0.5));
  }
  .brand-text h1 {
    font-size: 32px;
    font-weight: 800;
    letter-spacing: 2px;
    text-transform: uppercase;
    background: linear-gradient(90deg, #ffffff, #93c5fd);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .brand-text p {
    font-size: 16px;
    color: #94a3b8;
    letter-spacing: 3px;
    text-transform: uppercase;
    font-weight: 600;
    margin-top: 4px;
  }
  .badge-tier {
    background: linear-gradient(135deg, rgba(234, 179, 8, 0.2), rgba(202, 138, 4, 0.1));
    border: 1.5px solid rgba(234, 179, 8, 0.6);
    border-radius: 30px;
    padding: 10px 22px;
    color: #fef08a;
    font-weight: 700;
    font-size: 15px;
    letter-spacing: 2px;
    display: flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 0 20px rgba(234, 179, 8, 0.15);
  }

  /* Chip */
  .chip-section {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 36px 0 20px;
  }
  .emv-chip {
    width: 100px;
    height: 76px;
    background: linear-gradient(135deg, #fcd34d 0%, #b45309 50%, #fef08a 100%);
    border-radius: 12px;
    position: relative;
    overflow: hidden;
    box-shadow: inset 0 2px 4px rgba(255,255,255,0.6), 0 8px 16px rgba(0,0,0,0.5);
    border: 1px solid #78350f;
  }
  .chip-lines {
    position: absolute;
    inset: 12px 14px;
    border: 2px solid rgba(120, 53, 15, 0.55);
    border-radius: 8px;
  }
  .chip-center {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background: rgba(120, 53, 15, 0.55);
  }
  .chip-v {
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: rgba(120, 53, 15, 0.55);
  }
  .nfc-icon {
    font-size: 38px;
    color: #60a5fa;
    opacity: 0.85;
    letter-spacing: 2px;
    font-weight: bold;
  }

  /* Merchant Details Card */
  .merchant-card {
    position: relative;
    z-index: 2;
    background: rgba(15, 23, 42, 0.65);
    border: 1.5px solid rgba(255, 255, 255, 0.14);
    border-radius: 24px;
    padding: 38px 36px;
    backdrop-filter: blur(20px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
  }
  .store-label {
    font-size: 14px;
    text-transform: uppercase;
    color: #38bdf8;
    letter-spacing: 3px;
    font-weight: 700;
  }
  .store-name {
    font-size: 38px;
    font-weight: 900;
    margin: 8px 0 6px;
    color: #ffffff;
    line-height: 1.15;
    letter-spacing: -0.5px;
  }
  .store-sub {
    font-size: 18px;
    color: #cbd5e1;
    font-weight: 500;
    margin-bottom: 26px;
  }

  .meta-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    border-top: 1px dashed rgba(255, 255, 255, 0.16);
    padding-top: 24px;
  }
  .meta-item .lbl {
    font-size: 13px;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    font-weight: 600;
  }
  .meta-item .val {
    font-size: 20px;
    color: #f8fafc;
    font-weight: 700;
    margin-top: 4px;
    font-family: 'Courier New', monospace;
  }

  /* Security Row */
  .security-row {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(135deg, rgba(30, 41, 59, 0.5), rgba(15, 23, 42, 0.8));
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 24px 28px;
    margin-top: 28px;
  }
  .qr-box {
    width: 120px;
    height: 120px;
    background: #ffffff;
    border-radius: 12px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 20px rgba(0,0,0,0.5);
    position: relative;
  }
  .qr-inner {
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(#000 35%, transparent 35%),
      radial-gradient(#000 35%, transparent 35%);
    background-size: 14px 14px;
    background-position: 0 0, 7px 7px;
    border: 3px solid #000;
    position: relative;
  }
  .qr-center-logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 36px;
    height: 36px;
    background: #ffffff;
    border-radius: 8px;
    padding: 3px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.5);
    object-fit: contain;
  }
  .security-info {
    flex: 1;
    margin-left: 28px;
  }
  .security-info h4 {
    font-size: 18px;
    font-weight: 700;
    color: #f1f5f9;
  }
  .security-info p {
    font-size: 14px;
    color: #94a3b8;
    margin-top: 4px;
    line-height: 1.4;
  }
  .holo-badge {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background: conic-gradient(from 180deg at 50% 50%, #f43f5e, #fbbf24, #10b981, #06b6d4, #8b5cf6, #f43f5e);
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 25px rgba(255, 255, 255, 0.25);
  }
  .holo-badge-inner {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #0f172a;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 10px;
    font-weight: 800;
    color: #e2e8f0;
    line-height: 1.2;
    letter-spacing: 0.5px;
  }

  /* Footer */
  .footer {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 24px;
  }
  .footer-left p {
    font-size: 13px;
    color: #64748b;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  .footer-left h5 {
    font-size: 16px;
    color: #38bdf8;
    font-weight: 700;
    margin-top: 2px;
  }
  .footer-right {
    text-align: right;
  }
  .footer-right span {
    font-size: 12px;
    color: #94a3b8;
    font-family: monospace;
    letter-spacing: 1.5px;
  }
</style>
</head>
<body>
  <div class="grid-bg"></div>
  <div class="glow-orb"></div>
  <div class="glow-orb-2"></div>

  <!-- Header with Real Official Dikshi Logo -->
  <div class="header">
    <div class="brand-group">
      <div class="logo-box">
        <img src="${logoDataUri}" alt="Dikshi Technologies Logo" />
      </div>
      <div class="brand-text">
        <h1>Dikshi Technologies</h1>
        <p>SmartPOS Retail Systems</p>
      </div>
    </div>
    <div class="badge-tier">
      <span>★</span>
      <span>VIP MERCHANT</span>
    </div>
  </div>

  <!-- EMV Chip Section -->
  <div class="chip-section">
    <div class="emv-chip">
      <div class="chip-lines"></div>
      <div class="chip-center"></div>
      <div class="chip-v"></div>
    </div>
    <div class="nfc-icon">))))</div>
  </div>

  <!-- Merchant Info Card -->
  <div class="merchant-card">
    <div class="store-label">Certified Flagship Store</div>
    <div class="store-name">JAIPUR SILK &amp; BOUTIQUE</div>
    <div class="store-sub">Fancy Fabrics, Sarees &amp; Designer Cloth Billing Node</div>

    <div class="meta-grid">
      <div class="meta-item">
        <div class="lbl">Merchant ID</div>
        <div class="val">DT-POS-8924-VIP</div>
      </div>
      <div class="meta-item">
        <div class="lbl">Billing Terminals</div>
        <div class="val">04 ONLINE SYNC</div>
      </div>
      <div class="meta-item">
        <div class="lbl">GSTIN Registered</div>
        <div class="val">08AABCT4829K1Z5</div>
      </div>
      <div class="meta-item">
        <div class="lbl">Cloud Sync Speed</div>
        <div class="val">0.08s REALTIME</div>
      </div>
    </div>
  </div>

  <!-- Security Row -->
  <div class="security-row">
    <div class="qr-box">
      <div class="qr-inner">
        <img src="${logoDataUri}" class="qr-center-logo" alt="Dikshi Emblem" />
      </div>
    </div>
    <div class="security-info">
      <h4>SmartPOS Direct Connect</h4>
      <p>Scan with Dikshi Mobile Manager or POS Barcode Gun to authorize instant supervisor override &amp; cloud ledger sync.</p>
    </div>
    <div class="holo-badge">
      <div class="holo-badge-inner">
        <div>GENUINE</div>
        <div style="color: #38bdf8;">SECURITY</div>
        <div>PASS</div>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <div class="footer">
    <div class="footer-left">
      <p>Network Node: IN-RAJ-NORTH-01</p>
      <h5>Dikshi Cloud OS 2026.4</h5>
    </div>
    <div class="footer-right">
      <span>VALID: 2026 - 2029 • TIER 1</span>
    </div>
  </div>
</body>
</html>`;

// 2. BACK BADGE HTML (1024 x 1440)
const backHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
  body {
    width: 1024px;
    height: 1440px;
    background: #090e1a;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0;
    position: relative;
    overflow: hidden;
  }
  .magstripe {
    width: 100%;
    height: 180px;
    background: linear-gradient(180deg, #18181b 0%, #09090b 50%, #1c1917 100%);
    box-shadow: inset 0 2px 4px rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.8);
    position: relative;
  }
  .magstripe::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: rgba(255, 255, 255, 0.05);
  }

  .content-pad {
    padding: 50px 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
  }

  .sig-section {
    display: flex;
    gap: 24px;
    align-items: center;
  }
  .sig-strip {
    flex: 1;
    height: 84px;
    background: #f1f5f9;
    background-image: repeating-linear-gradient(45deg, #e2e8f0 0, #e2e8f0 10px, #ffffff 10px, #ffffff 20px);
    border-radius: 8px;
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 24px;
  }
  .sig-cursive {
    font-family: 'Brush Script MT', 'Dancing Script', cursive;
    font-size: 40px;
    color: #1e3a8a;
    transform: rotate(-2deg);
    font-weight: bold;
  }
  .cvv-box {
    width: 110px;
    height: 84px;
    background: #1e293b;
    border: 1.5px solid rgba(255, 255, 255, 0.15);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .cvv-lbl { font-size: 11px; color: #94a3b8; text-transform: uppercase; font-weight: 700; }
  .cvv-val { font-size: 26px; font-weight: 900; color: #38bdf8; font-family: monospace; }

  .terms-box {
    background: rgba(30, 41, 59, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 18px;
    padding: 28px 32px;
    margin: 20px 0;
  }
  .terms-box h3 {
    font-size: 16px;
    font-weight: 800;
    text-transform: uppercase;
    color: #93c5fd;
    letter-spacing: 2px;
    margin-bottom: 12px;
  }
  .terms-box p {
    font-size: 14px;
    line-height: 1.6;
    color: #94a3b8;
    margin-bottom: 10px;
  }

  .support-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    background: rgba(15, 23, 42, 0.8);
    border-radius: 16px;
    padding: 20px 24px;
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
  .support-item .s-lbl {
    font-size: 12px;
    color: #64748b;
    text-transform: uppercase;
    font-weight: 700;
  }
  .support-item .s-val {
    font-size: 15px;
    color: #e2e8f0;
    font-weight: 700;
    margin-top: 4px;
  }

  .barcode-section {
    background: #ffffff;
    border-radius: 16px;
    padding: 24px 30px;
    text-align: center;
    margin-top: 24px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.6);
  }
  .barcode-lines {
    height: 80px;
    background: repeating-linear-gradient(
      90deg,
      #000 0, #000 3px,
      #fff 3px, #fff 6px,
      #000 6px, #000 10px,
      #fff 10px, #fff 12px,
      #000 12px, #000 17px,
      #fff 17px, #fff 21px,
      #000 21px, #000 24px,
      #fff 24px, #fff 26px,
      #000 26px, #000 32px,
      #fff 32px, #fff 35px,
      #000 35px, #000 38px,
      #fff 38px, #fff 44px
    );
    width: 100%;
  }
  .barcode-num {
    color: #0f172a;
    font-family: monospace;
    font-size: 20px;
    font-weight: 800;
    letter-spacing: 6px;
    margin-top: 10px;
  }

  .back-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 18px;
    color: #64748b;
    font-size: 12px;
    letter-spacing: 1px;
  }
</style>
</head>
<body>
  <div class="magstripe"></div>

  <div class="content-pad">
    <div>
      <div class="sig-section">
        <div class="sig-strip">
          <div class="sig-cursive">Dikshi Technologies Auth</div>
        </div>
        <div class="cvv-box">
          <div class="cvv-lbl">POS SEC-KEY</div>
          <div class="cvv-val">9482</div>
        </div>
      </div>

      <div class="terms-box">
        <h3>Certified Merchant Terms &amp; Conditions</h3>
        <p>1. This credential certifies the holder as an authorized operator of the Dikshi Technologies SmartPOS retail billing platform for cloth, sarees, and boutique retail establishments.</p>
        <p>2. Hardware replacement warranty and 24/7 priority remote diagnostics apply for registered terminal SN: POS-7731-XG9.</p>
        <p>3. Automatic GSTIN filing, multi-counter ledger synchronisation, and UPI instant soundbox integration are active.</p>
      </div>

      <div class="support-grid">
        <div class="support-item">
          <div class="s-lbl">Support Toll-Free</div>
          <div class="s-val">+91 98765-43210</div>
        </div>
        <div class="support-item">
          <div class="s-lbl">Cloud API Gateway</div>
          <div class="s-val">api.dikshitech.com</div>
        </div>
        <div class="support-item">
          <div class="s-lbl">License Tier</div>
          <div class="s-val">Enterprise Unlimited</div>
        </div>
      </div>
    </div>

    <div>
      <div class="barcode-section">
        <div class="barcode-lines"></div>
        <div class="barcode-num">*DT-POS-8924-VIP-CLOTH-BILLING*</div>
      </div>

      <div class="back-footer">
        <div style="display: flex; align-items: center; gap: 8px;">
          <img src="${logoDataUri}" style="width: 20px; height: 20px; object-fit: contain;" />
          <span>ISSUED BY DIKSHI TECHNOLOGIES PVT LTD</span>
        </div>
        <span>ISO 27001 &amp; NPCI COMPLIANT</span>
      </div>
    </div>
  </div>
</body>
</html>`;

// 3. STRAP PATTERN HTML (192 x 1024)
const strapHtml = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
  body {
    width: 192px;
    height: 1024px;
    background: #0b192c;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-left: 6px solid #f59e0b;
    border-right: 6px solid #f59e0b;
    overflow: hidden;
  }
  .ribbon-repeat {
    writing-mode: vertical-rl;
    text-orientation: mixed;
    transform: rotate(180deg);
    font-size: 26px;
    font-weight: 900;
    letter-spacing: 5px;
    color: #e2e8f0;
    display: flex;
    align-items: center;
    gap: 20px;
    text-transform: uppercase;
  }
  .star { color: #f59e0b; font-size: 30px; }
  .highlight { color: #38bdf8; }
</style>
</head>
<body>
  <div class="ribbon-repeat">
    <span class="star">★</span>
    <span>DIKSHI TECHNOLOGIES</span>
    <span class="highlight">SMARTPOS</span>
    <span class="star">★</span>
    <span>AUTHENTICATED MERCHANT PASS</span>
  </div>
  <div class="ribbon-repeat">
    <span class="star">★</span>
    <span>DIKSHI TECHNOLOGIES</span>
    <span class="highlight">SMARTPOS</span>
    <span class="star">★</span>
    <span>AUTHENTICATED MERCHANT PASS</span>
  </div>
</body>
</html>`;

const tempFront = path.join(outDir, 'temp_front.html');
const tempBack = path.join(outDir, 'temp_back.html');
const tempStrap = path.join(outDir, 'temp_strap.html');

fs.writeFileSync(tempFront, frontHtml);
fs.writeFileSync(tempBack, backHtml);
fs.writeFileSync(tempStrap, strapHtml);

console.log('Generating images with Chrome headless...');

try {
  execSync(`"${chromePath}" --headless --disable-gpu --screenshot="${path.join(outDir, 'merchant-pass-front.png')}" --window-size=1024,1440 "file:///${tempFront.replace(/\\\\/g, '/')}"`);
  console.log('Front generated with official Dikshi logo.');

  execSync(`"${chromePath}" --headless --disable-gpu --screenshot="${path.join(outDir, 'merchant-pass-back.png')}" --window-size=1024,1440 "file:///${tempBack.replace(/\\\\/g, '/')}"`);
  console.log('Back generated.');

  execSync(`"${chromePath}" --headless --disable-gpu --screenshot="${path.join(outDir, 'merchant-pass-strap.png')}" --window-size=192,1024 "file:///${tempStrap.replace(/\\\\/g, '/')}"`);
  console.log('Strap generated.');
} finally {
  if (fs.existsSync(tempFront)) fs.unlinkSync(tempFront);
  if (fs.existsSync(tempBack)) fs.unlinkSync(tempBack);
  if (fs.existsSync(tempStrap)) fs.unlinkSync(tempStrap);
}

console.log('All badges successfully updated with official Dikshi logo!');
