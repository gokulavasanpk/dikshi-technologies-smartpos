/**
 * Dikshi Technologies - Multi-Device Layout Inspector & Fluid Responsive Simulator
 * Completely fluid transitions with zero rigid fixed layout
 */

(function () {
  'use strict';

  let currentPreset = 'full';
  let isLandscape = false;
  let showGrid = false;
  let showTouchInspect = false;

  const PRESETS = {
    full: { label: 'Full Viewport', width: '100%', height: 'auto', type: 'fluid' },
    se: { label: 'iPhone SE', width: '375px', height: '667px', type: 'mobile' },
    max: { label: 'iPhone 15 Pro Max', width: '430px', height: '932px', type: 'mobile' },
    ipad: { label: 'iPad 10th Gen', width: '768px', height: '1024px', type: 'tablet' },
    laptop: { label: 'MacBook Air / Laptop', width: '1024px', height: '768px', type: 'laptop' },
    desktop: { label: 'Desktop 1440p', width: '1440px', height: '900px', type: 'desktop' }
  };

  function initDeviceTester() {
    const bar = document.getElementById('device-tester-bar');
    if (!bar) return;

    setupPresetButtons();
    setupSlider();
    setupInspectToggles();
    updateLiveMetrics();

    window.addEventListener('resize', updateLiveMetrics);
  }

  function setupPresetButtons() {
    const buttons = document.querySelectorAll('.device-btn[data-device]');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-device');
        setDevicePreset(key);
      });
    });
  }

  function setupSlider() {
    const slider = document.getElementById('tester-fluid-slider');
    const container = document.getElementById('preview-viewport-container');
    if (!slider || !container) return;

    slider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      if (val >= 100) {
        container.style.maxWidth = '100%';
        container.classList.remove('simulating-device');
      } else {
        // Map 0 - 100 to 320px - window.innerWidth
        const minW = 320;
        const maxW = Math.min(window.innerWidth, 1440);
        const targetPx = Math.round(minW + (maxW - minW) * (val / 100));
        container.style.maxWidth = targetPx + 'px';
        container.classList.add('simulating-device');
      }
      triggerReflow();
      updateLiveMetrics();
    });
  }

  function setDevicePreset(key) {
    currentPreset = key;
    const config = PRESETS[key] || PRESETS.full;
    const container = document.getElementById('preview-viewport-container');
    const buttons = document.querySelectorAll('.device-btn[data-device]');
    const slider = document.getElementById('tester-fluid-slider');

    buttons.forEach(b => {
      if (b.getAttribute('data-device') === key) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    if (!container) return;

    if (key === 'full') {
      container.style.maxWidth = '100%';
      container.classList.remove('simulating-device');
      if (slider) slider.value = 100;
    } else {
      let targetWidth = config.width;
      if (isLandscape && config.type !== 'desktop') {
        targetWidth = config.height;
      }
      container.style.maxWidth = targetWidth;
      container.classList.add('simulating-device');
      if (slider) {
        const numPx = parseInt(targetWidth, 10);
        const minW = 320;
        const maxW = Math.min(window.innerWidth, 1440);
        const percent = Math.min(100, Math.max(0, Math.round(((numPx - minW) / (maxW - minW)) * 100)));
        slider.value = percent;
      }
    }

    triggerReflow();
    updateLiveMetrics();
  }

  function triggerReflow() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 280);
  }

  function setupInspectToggles() {
    const flipBtn = document.getElementById('tester-flip-orientation-btn');
    if (flipBtn) {
      flipBtn.addEventListener('click', () => {
        if (currentPreset === 'full') return;
        isLandscape = !isLandscape;
        flipBtn.classList.toggle('active', isLandscape);
        setDevicePreset(currentPreset);
      });
    }

    const gridBtn = document.getElementById('tester-grid-toggle-btn');
    if (gridBtn) {
      gridBtn.addEventListener('click', () => {
        showGrid = !showGrid;
        gridBtn.classList.toggle('active', showGrid);
        let overlay = document.getElementById('layout-grid-overlay');
        if (!overlay) {
          overlay = document.createElement('div');
          overlay.id = 'layout-grid-overlay';
          overlay.className = 'fixed inset-0 pointer-events-none z-[9990] flex justify-center';
          overlay.innerHTML = `
            <div class="w-full max-w-7xl h-full grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 px-4 sm:px-6 lg:px-8 opacity-20">
              ${Array.from({ length: 12 }, () => `<div class="bg-blue-500 h-full border-x border-blue-600"></div>`).join('')}
            </div>
          `;
          document.body.appendChild(overlay);
        }
        overlay.style.display = showGrid ? 'flex' : 'none';
      });
    }

    const touchBtn = document.getElementById('tester-touch-targets-btn');
    if (touchBtn) {
      touchBtn.addEventListener('click', () => {
        showTouchInspect = !showTouchInspect;
        touchBtn.classList.toggle('active', showTouchInspect);
        document.body.classList.toggle('inspect-touch-targets', showTouchInspect);
      });
    }

    const toggleBarBtn = document.getElementById('tester-minimize-btn');
    const barBody = document.getElementById('device-tester-controls-body');
    if (toggleBarBtn && barBody) {
      let isCollapsed = false;
      toggleBarBtn.addEventListener('click', () => {
        isCollapsed = !isCollapsed;
        barBody.style.display = isCollapsed ? 'none' : 'flex';
        toggleBarBtn.textContent = isCollapsed ? '🔼 Open Device Bar' : '✖ Close Bar';
      });
    }
  }

  function updateLiveMetrics() {
    const container = document.getElementById('preview-viewport-container');
    const metricW = container ? container.clientWidth : window.innerWidth;
    const metricH = window.innerHeight;

    let bp = 'XS (Mobile)';
    if (metricW >= 1536) bp = '2XL (Large Desktop)';
    else if (metricW >= 1280) bp = 'XL (Standard Desktop)';
    else if (metricW >= 1024) bp = 'LG (Laptop / Tablet Landscape)';
    else if (metricW >= 768) bp = 'MD (Tablet Portrait)';
    else if (metricW >= 640) bp = 'SM (Phablet / Large Mobile)';

    const liveMetricsEl = document.getElementById('device-live-metrics');
    if (liveMetricsEl) {
      liveMetricsEl.innerHTML = `
        <span class="text-sky-400 font-bold font-mono">${metricW}px</span> × <span class="font-mono text-slate-300">${metricH}px</span>
        <span class="px-2 py-0.5 rounded bg-blue-900/70 text-blue-300 font-mono text-[10px] ml-1.5 uppercase font-semibold border border-blue-700/50">${bp}</span>
      `;
    }
  }

  window.DikshiDeviceTester = {
    init: initDeviceTester,
    setPreset: setDevicePreset
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDeviceTester);
  } else {
    initDeviceTester();
  }
})();
