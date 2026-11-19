/**
 * Dikshi Technologies - Live Fancy & Cloth Retail Billing Terminal Simulator
 * Fully fluid Flex & Grid layout with zero element breakouts
 */

(function () {
  'use strict';

  // Sample Cloth & Fancy Retail Catalog
  const CATALOG = [
    {
      id: 'GAR-SAR-101',
      name: 'Banarasi Soft Silk Saree',
      category: 'ethnic',
      price: 3499,
      gst: 12,
      sizes: ['5.5m', '6.3m w/ Blouse'],
      color: 'Royal Magenta',
      icon: '👘',
      inStock: 18
    },
    {
      id: 'GAR-KUR-204',
      name: 'Chikankari Handloom Kurti',
      category: 'ethnic',
      price: 1250,
      gst: 12,
      sizes: ['S', 'M', 'L', 'XL'],
      color: 'Pastel Mint',
      icon: '👗',
      inStock: 35
    },
    {
      id: 'GAR-JNS-305',
      name: 'Flex Stretch Denim Jeans',
      category: 'western',
      price: 1899,
      gst: 12,
      sizes: ['30', '32', '34', '36'],
      color: 'Dark Indigo',
      icon: '👖',
      inStock: 42
    },
    {
      id: 'GAR-SHT-402',
      name: 'Luxury Cotton Spread Shirt',
      category: 'western',
      price: 999,
      gst: 5,
      sizes: ['38', '40', '42'],
      color: 'Crisp White',
      icon: '👔',
      inStock: 27
    },
    {
      id: 'FNC-JWL-501',
      name: 'Kundan Antique Bridal Choker',
      category: 'fancy',
      price: 2899,
      gst: 12,
      sizes: ['Standard'],
      color: 'Antique Gold',
      icon: '✨',
      inStock: 14
    },
    {
      id: 'FNC-JWL-508',
      name: 'Meenakari Jhumka Earrings',
      category: 'fancy',
      price: 750,
      gst: 12,
      sizes: ['Free Size'],
      color: 'Ruby & Pearl',
      icon: '💎',
      inStock: 50
    },
    {
      id: 'ACC-BLT-602',
      name: 'Italian Leather Belt',
      category: 'accessories',
      price: 850,
      gst: 12,
      sizes: ['32', '34', '36'],
      color: 'Mocha Brown',
      icon: '🪡',
      inStock: 29
    },
    {
      id: 'ACC-CLT-701',
      name: 'Velvet Bridal Clutch',
      category: 'accessories',
      price: 1599,
      gst: 12,
      sizes: ['One Size'],
      color: 'Wine Velvet',
      icon: '👛',
      inStock: 16
    }
  ];

  // Cart State
  let cart = [
    {
      id: 'GAR-SAR-101',
      name: 'Banarasi Soft Silk Saree',
      price: 3499,
      qty: 1,
      gst: 12,
      size: '6.3m w/ Blouse',
      color: 'Royal Magenta'
    },
    {
      id: 'FNC-JWL-508',
      name: 'Meenakari Jhumka Earrings',
      price: 750,
      qty: 2,
      gst: 12,
      size: 'Free Size',
      color: 'Ruby & Pearl'
    }
  ];

  let discountRate = 0;
  let couponCode = '';
  let activeCategory = 'all';

  function initPOS() {
    renderCatalog();
    renderCart();
    setupEventListeners();
  }

  function renderCatalog(filteredList = null) {
    const grid = document.getElementById('pos-catalog-grid');
    if (!grid) return;

    const list = filteredList || (activeCategory === 'all' ? CATALOG : CATALOG.filter(item => item.category === activeCategory));

    grid.innerHTML = '';
    list.forEach(item => {
      const card = document.createElement('div');
      card.className = 'pos-catalog-card p-3 flex flex-col justify-between min-w-0';
      card.innerHTML = `
        <div class="min-w-0">
          <div class="flex items-center justify-between text-[11px] text-slate-400 mb-1 gap-1">
            <span class="font-mono truncate">${item.id}</span>
            <span class="text-emerald-400 font-medium flex-shrink-0">Stock: ${item.inStock}</span>
          </div>
          <div class="flex items-start gap-2 mb-2 min-w-0">
            <span class="text-2xl flex-shrink-0">${item.icon}</span>
            <div class="min-w-0 flex-1">
              <h4 class="text-xs sm:text-sm font-semibold text-white truncate">${item.name}</h4>
              <p class="text-[11px] text-slate-400 truncate">${item.color} • GST ${item.gst}%</p>
            </div>
          </div>
          <div class="flex flex-wrap gap-1 mb-2">
            ${item.sizes.map((sz, idx) => `
              <span class="size-chip ${idx === 0 ? 'selected' : ''}" data-size="${sz}">${sz}</span>
            `).join('')}
          </div>
        </div>
        <div class="flex items-center justify-between pt-2 border-t border-slate-700/60 mt-1 gap-2">
          <span class="text-sm sm:text-base font-bold text-sky-400 font-mono flex-shrink-0">₹${item.price.toLocaleString('en-IN')}</span>
          <button class="add-to-bill-btn px-2.5 py-1 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded flex items-center gap-1 transition flex-shrink-0">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            Add
          </button>
        </div>
      `;

      const chips = card.querySelectorAll('.size-chip');
      chips.forEach(chip => {
        chip.addEventListener('click', (e) => {
          e.stopPropagation();
          chips.forEach(c => c.classList.remove('selected'));
          chip.classList.add('selected');
        });
      });

      const addBtn = card.querySelector('.add-to-bill-btn');
      addBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const selectedChip = card.querySelector('.size-chip.selected') || chips[0];
        const selectedSize = selectedChip ? selectedChip.getAttribute('data-size') : item.sizes[0];
        addToCart({
          id: item.id,
          name: item.name,
          price: item.price,
          gst: item.gst,
          size: selectedSize,
          color: item.color
        });
      });

      grid.appendChild(card);
    });
  }

  function renderCart() {
    const cartItemsList = document.getElementById('pos-cart-items');
    if (!cartItemsList) return;

    cartItemsList.innerHTML = '';

    if (cart.length === 0) {
      cartItemsList.innerHTML = `
        <div class="text-center py-8 text-slate-500 flex flex-col items-center justify-center">
          <span class="text-3xl mb-1">🛒</span>
          <p class="text-xs font-mono">Current Bill Register is empty</p>
          <p class="text-[11px] text-slate-600">Scan barcode or pick item from left</p>
        </div>
      `;
    } else {
      cart.forEach((item, index) => {
        const itemRow = document.createElement('div');
        itemRow.className = 'flex flex-wrap sm:flex-nowrap items-center justify-between p-2.5 bg-slate-800/80 rounded border border-slate-700/50 text-xs gap-2 min-w-0';
        itemRow.innerHTML = `
          <div class="flex-1 min-w-[130px] pr-1">
            <div class="font-semibold text-white truncate">${item.name}</div>
            <div class="text-[11px] text-slate-400 font-mono">
              ₹${item.price} • ${item.size || 'Free Size'}
            </div>
          </div>
          <div class="flex items-center gap-2 flex-shrink-0">
            <div class="flex items-center gap-1">
              <button class="qty-btn-minus w-5 h-5 rounded bg-slate-700 hover:bg-slate-600 text-white font-bold flex items-center justify-center">-</button>
              <span class="font-mono font-bold text-sky-400 w-4 text-center">${item.qty}</span>
              <button class="qty-btn-plus w-5 h-5 rounded bg-slate-700 hover:bg-slate-600 text-white font-bold flex items-center justify-center">+</button>
            </div>
            <div class="text-right w-14 font-mono font-bold text-white text-xs">
              ₹${(item.price * item.qty).toLocaleString('en-IN')}
            </div>
            <button class="del-item-btn text-xs text-red-400 hover:text-red-300 px-1 font-bold">✕</button>
          </div>
        `;

        itemRow.querySelector('.qty-btn-minus').addEventListener('click', () => updateQty(index, -1));
        itemRow.querySelector('.qty-btn-plus').addEventListener('click', () => updateQty(index, 1));
        itemRow.querySelector('.del-item-btn').addEventListener('click', () => removeItem(index));

        cartItemsList.appendChild(itemRow);
      });
    }

    calculateTotals();
  }

  function addToCart(newItem) {
    const existingIndex = cart.findIndex(i => i.id === newItem.id && i.size === newItem.size);
    if (existingIndex > -1) {
      cart[existingIndex].qty += 1;
    } else {
      cart.push({
        id: newItem.id,
        name: newItem.name,
        price: newItem.price,
        qty: 1,
        gst: newItem.gst || 12,
        size: newItem.size || 'Standard',
        color: newItem.color || 'Default'
      });
    }
    renderCart();

    if (typeof window.showToast === 'function') {
      window.showToast(`🛒 Added "${newItem.name}" to POS terminal`);
    }
  }

  function updateQty(index, delta) {
    if (cart[index]) {
      cart[index].qty += delta;
      if (cart[index].qty <= 0) {
        cart.splice(index, 1);
      }
      renderCart();
    }
  }

  function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
  }

  function calculateTotals() {
    let subtotal = 0;
    let totalTax = 0;

    cart.forEach(item => {
      const lineTotal = item.price * item.qty;
      subtotal += lineTotal;
      const taxRate = item.gst || 12;
      totalTax += (lineTotal * taxRate) / 100;
    });

    const discountAmount = (subtotal * discountRate) / 100;
    const taxableAmount = Math.max(0, subtotal - discountAmount);
    const cgst = totalTax / 2;
    const sgst = totalTax / 2;
    const grandTotal = Math.round(taxableAmount + totalTax);

    const subtotalEl = document.getElementById('pos-subtotal');
    const discountEl = document.getElementById('pos-discount');
    const cgstEl = document.getElementById('pos-cgst');
    const sgstEl = document.getElementById('pos-sgst');
    const grandTotalEl = document.getElementById('pos-grand-total');
    const itemCountBadge = document.getElementById('pos-item-count-badge');

    if (subtotalEl) subtotalEl.textContent = '₹' + subtotal.toLocaleString('en-IN');
    if (discountEl) discountEl.textContent = '-₹' + Math.round(discountAmount).toLocaleString('en-IN') + (discountRate ? ` (${discountRate}%)` : '');
    if (cgstEl) cgstEl.textContent = '₹' + cgst.toFixed(2);
    if (sgstEl) sgstEl.textContent = '₹' + sgst.toFixed(2);
    if (grandTotalEl) grandTotalEl.textContent = '₹' + grandTotal.toLocaleString('en-IN');
    if (itemCountBadge) itemCountBadge.textContent = cart.reduce((acc, cur) => acc + cur.qty, 0) + ' Items';

    return { subtotal, discountAmount, cgst, sgst, grandTotal };
  }

  function setupEventListeners() {
    const catButtons = document.querySelectorAll('.pos-cat-tab');
    catButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        catButtons.forEach(b => {
          b.classList.remove('bg-blue-600', 'text-white');
          b.classList.add('bg-slate-800', 'text-slate-300');
        });
        btn.classList.remove('bg-slate-800', 'text-slate-300');
        btn.classList.add('bg-blue-600', 'text-white');

        activeCategory = btn.getAttribute('data-cat');
        renderCatalog();
      });
    });

    const searchInput = document.getElementById('pos-barcode-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (!query) {
          renderCatalog();
          return;
        }
        const filtered = CATALOG.filter(item =>
          item.name.toLowerCase().includes(query) ||
          item.id.toLowerCase().includes(query) ||
          item.color.toLowerCase().includes(query)
        );
        renderCatalog(filtered);
      });

      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const query = searchInput.value.toLowerCase().trim();
          const match = CATALOG.find(item =>
            item.name.toLowerCase().includes(query) ||
            item.id.toLowerCase() === query
          );
          if (match) {
            addToCart(match);
            searchInput.value = '';
            renderCatalog();
          }
        }
      });
    }

    const couponBtn = document.getElementById('pos-apply-coupon-btn');
    const couponInput = document.getElementById('pos-coupon-input');
    if (couponBtn && couponInput) {
      couponBtn.addEventListener('click', () => {
        const code = couponInput.value.trim().toUpperCase();
        if (code === 'DIKSHI20') {
          discountRate = 20;
          couponCode = code;
          if (typeof window.showToast === 'function') window.showToast('🎉 Coupon DIKSHI20 Applied! 20% Discount');
        } else if (code === 'FESTIVE10') {
          discountRate = 10;
          couponCode = code;
          if (typeof window.showToast === 'function') window.showToast('✨ Festive10 Applied! 10% Discount');
        } else if (!code) {
          discountRate = 0;
          couponCode = '';
        } else {
          if (typeof window.showToast === 'function') window.showToast('⚠️ Invalid coupon. Try DIKSHI20 or FESTIVE10');
        }
        calculateTotals();
      });
    }

    const clearCartBtn = document.getElementById('pos-clear-cart-btn');
    if (clearCartBtn) {
      clearCartBtn.addEventListener('click', () => {
        if (cart.length > 0) {
          cart = [];
          discountRate = 0;
          renderCart();
          if (typeof window.showToast === 'function') window.showToast('🧹 Bill register cleared');
        }
      });
    }

    const printReceiptBtn = document.getElementById('pos-print-receipt-btn');
    if (printReceiptBtn) {
      printReceiptBtn.addEventListener('click', openThermalReceiptModal);
    }

    const whatsappBillBtn = document.getElementById('pos-whatsapp-bill-btn');
    if (whatsappBillBtn) {
      whatsappBillBtn.addEventListener('click', openWhatsAppModal);
    }

    const upiPayBtn = document.getElementById('pos-upi-pay-btn');
    if (upiPayBtn) {
      upiPayBtn.addEventListener('click', openUPIModal);
    }
  }

  function openThermalReceiptModal() {
    if (cart.length === 0) {
      if (typeof window.showToast === 'function') window.showToast('⚠️ Cart is empty. Add products to print receipt!');
      return;
    }

    const { subtotal, discountAmount, cgst, sgst, grandTotal } = calculateTotals();
    const modal = document.getElementById('thermal-receipt-modal');
    if (!modal) return;

    const receiptContent = modal.querySelector('.receipt-body-content');
    const billNo = 'DK-' + Math.floor(100000 + Math.random() * 900000);
    const dateStr = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

    receiptContent.innerHTML = `
      <div class="text-center pb-2 border-b border-dashed border-gray-400">
        <h3 class="font-bold text-sm tracking-wide uppercase">DIKSHI BOUTIQUE & FANCY</h3>
        <p class="text-[11px] text-gray-600">Powered by Dikshi Technologies POS</p>
        <p class="text-[10px] text-gray-500">GSTIN: 29AAAAA0000A1Z5 | HSN Code: 6204/7117</p>
        <p class="text-[10px] text-gray-500">Ph: +91 98765 43210 | Bangalore - 560001</p>
      </div>

      <div class="flex justify-between text-[11px] py-1 border-b border-dashed border-gray-300">
        <span>Bill: #${billNo}</span>
        <span>${dateStr}</span>
      </div>

      <div class="py-2 border-b border-dashed border-gray-400 text-[11px]">
        <div class="flex font-bold pb-1 text-[10px] uppercase text-gray-600 border-b border-gray-200">
          <span class="flex-1">Item [Size]</span>
          <span class="w-10 text-center">Qty</span>
          <span class="w-16 text-right">Amount</span>
        </div>
        ${cart.map(i => `
          <div class="flex py-1 text-[11px]">
            <span class="flex-1 truncate">${i.name} <span class="text-[9px] text-gray-500">(${i.size || 'Std'})</span></span>
            <span class="w-10 text-center">${i.qty}</span>
            <span class="w-16 text-right font-mono">₹${(i.price * i.qty).toLocaleString('en-IN')}</span>
          </div>
        `).join('')}
      </div>

      <div class="py-1 text-[11px] space-y-0.5 border-b border-dashed border-gray-400">
        <div class="flex justify-between">
          <span>Subtotal:</span>
          <span class="font-mono">₹${subtotal.toLocaleString('en-IN')}</span>
        </div>
        ${discountAmount > 0 ? `
          <div class="flex justify-between text-emerald-600">
            <span>Discount (${discountRate}%):</span>
            <span class="font-mono">-₹${Math.round(discountAmount).toLocaleString('en-IN')}</span>
          </div>
        ` : ''}
        <div class="flex justify-between text-gray-600">
          <span>CGST (2.5% - 6%):</span>
          <span class="font-mono">₹${cgst.toFixed(2)}</span>
        </div>
        <div class="flex justify-between text-gray-600">
          <span>SGST (2.5% - 6%):</span>
          <span class="font-mono">₹${sgst.toFixed(2)}</span>
        </div>
        <div class="flex justify-between font-bold text-sm pt-1 border-t border-gray-300">
          <span>NET PAYABLE:</span>
          <span class="font-mono">₹${grandTotal.toLocaleString('en-IN')}</span>
        </div>
      </div>

      <div class="text-center pt-3 space-y-1">
        <div class="font-mono text-[10px] tracking-widest">||||| | |||| |||||| |||| | |||</div>
        <p class="text-[10px] text-gray-600 font-bold">THANK YOU! VISIT AGAIN</p>
        <p class="text-[9px] text-gray-500">Exchange within 7 days with original tag & bill</p>
      </div>
    `;

    modal.classList.remove('hidden');
  }

  function openWhatsAppModal() {
    if (cart.length === 0) {
      if (typeof window.showToast === 'function') window.showToast('⚠️ Cart is empty. Add products first!');
      return;
    }
    const modal = document.getElementById('whatsapp-bill-modal');
    if (!modal) return;
    modal.classList.remove('hidden');
  }

  function openUPIModal() {
    if (cart.length === 0) {
      if (typeof window.showToast === 'function') window.showToast('⚠️ Cart is empty. Add products first!');
      return;
    }
    const { grandTotal } = calculateTotals();
    const modal = document.getElementById('upi-qr-modal');
    if (!modal) return;
    const amountEl = modal.querySelector('.upi-amount-display');
    if (amountEl) amountEl.textContent = '₹' + grandTotal.toLocaleString('en-IN');
    modal.classList.remove('hidden');
  }

  window.DikshiPOS = {
    init: initPOS,
    addToCart: addToCart,
    cart: cart
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPOS);
  } else {
    initPOS();
  }
})();
