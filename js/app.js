/**
 * Dikshi Technologies - Main Application Controller
 */

(function () {
  'use strict';

  // Global Toast Notification Helper
  window.showToast = function (message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'dikshi-toast';
    toast.innerHTML = `
      <span class="text-lg">${type === 'success' ? '✅' : type === 'warn' ? '⚠️' : '⚡'}</span>
      <span class="flex-1">${message}</span>
      <button class="text-slate-400 hover:text-white ml-2 text-xs font-mono">✕</button>
    `;

    toast.querySelector('button').addEventListener('click', () => {
      toast.remove();
    });

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  };

  document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initRoiCalculator();
    initPricingSwitcher();
    initFaqAccordion();
    initDemoBookingForm();
    initModals();
    initSmoothAnchors();
  });

  // Mobile Navigation Drawer
  function initMobileNav() {
    const toggleBtn = document.getElementById('mobile-menu-toggle-btn');
    const drawer = document.getElementById('mobile-menu-drawer');
    const closeBtn = document.getElementById('mobile-menu-close-btn');
    const backdrop = document.getElementById('mobile-menu-backdrop');

    if (!toggleBtn || !drawer) return;

    const openDrawer = () => {
      drawer.classList.remove('translate-x-full');
      if (backdrop) backdrop.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    };

    const closeDrawer = () => {
      drawer.classList.add('translate-x-full');
      if (backdrop) backdrop.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    };

    toggleBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (backdrop) backdrop.addEventListener('click', closeDrawer);

    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeDrawer);
    });
  }

  // ROI & Speed Calculator
  function initRoiCalculator() {
    const billsSlider = document.getElementById('calc-bills-slider');
    const valueSlider = document.getElementById('calc-value-slider');
    const countersSlider = document.getElementById('calc-counters-slider');

    const billsVal = document.getElementById('calc-bills-val');
    const valueVal = document.getElementById('calc-value-val');
    const countersVal = document.getElementById('calc-counters-val');

    const timeSavedEl = document.getElementById('calc-time-saved');
    const leakageEl = document.getElementById('calc-leakage-prevented');
    const paperSavedEl = document.getElementById('calc-paper-saved');
    const totalBenefitEl = document.getElementById('calc-total-benefit');

    if (!billsSlider || !valueSlider || !countersSlider) return;

    function recalculate() {
      const bills = parseInt(billsSlider.value, 10);
      const avgVal = parseInt(valueSlider.value, 10);
      const counters = parseInt(countersSlider.value, 10);

      billsVal.textContent = bills.toLocaleString('en-IN');
      valueVal.textContent = '₹' + avgVal.toLocaleString('en-IN');
      countersVal.textContent = counters;

      // 40 seconds saved per checkout compared to slow traditional ERPs
      const hoursSavedMonth = Math.round((bills * 40 * 30 * counters) / 3600);
      // 1.8% shrinkage and inventory billing discrepancy prevention
      const leakageSavedMonth = Math.round(bills * avgVal * 30 * 0.015);
      // Digital WhatsApp invoice savings vs thermal paper roll
      const paperSavedMonth = Math.round(bills * 30 * counters * 0.45);
      const totalMonthBenefit = leakageSavedMonth + paperSavedMonth + (hoursSavedMonth * 120);

      timeSavedEl.textContent = `${hoursSavedMonth} Hours/mo`;
      leakageEl.textContent = `₹${leakageSavedMonth.toLocaleString('en-IN')}/mo`;
      paperSavedEl.textContent = `₹${paperSavedMonth.toLocaleString('en-IN')}/mo`;
      totalBenefitEl.textContent = `₹${totalMonthBenefit.toLocaleString('en-IN')}/mo`;
    }

    billsSlider.addEventListener('input', recalculate);
    valueSlider.addEventListener('input', recalculate);
    countersSlider.addEventListener('input', recalculate);
    recalculate();

    const claimBtn = document.getElementById('calc-claim-roi-btn');
    if (claimBtn) {
      claimBtn.addEventListener('click', () => {
        window.showToast('📊 Full Store ROI Breakdown sent! Check your WhatsApp/Email.', 'success');
      });
    }
  }

  // Pricing Plan Switcher (Monthly / Annually 20% discount)
  function initPricingSwitcher() {
    const monthlyBtn = document.getElementById('pricing-monthly-btn');
    const yearlyBtn = document.getElementById('pricing-yearly-btn');
    const starterPrice = document.getElementById('price-starter-val');
    const proPrice = document.getElementById('price-pro-val');
    const enterprisePrice = document.getElementById('price-enterprise-val');

    if (!monthlyBtn || !yearlyBtn) return;

    monthlyBtn.addEventListener('click', () => {
      monthlyBtn.classList.add('bg-blue-600', 'text-white');
      monthlyBtn.classList.remove('text-slate-400');
      yearlyBtn.classList.remove('bg-blue-600', 'text-white');
      yearlyBtn.classList.add('text-slate-400');

      if (starterPrice) starterPrice.textContent = '₹999';
      if (proPrice) proPrice.textContent = '₹1,999';
      if (enterprisePrice) enterprisePrice.textContent = '₹3,999';
    });

    yearlyBtn.addEventListener('click', () => {
      yearlyBtn.classList.add('bg-blue-600', 'text-white');
      yearlyBtn.classList.remove('text-slate-400');
      monthlyBtn.classList.remove('bg-blue-600', 'text-white');
      monthlyBtn.classList.add('text-slate-400');

      if (starterPrice) starterPrice.textContent = '₹799';
      if (proPrice) proPrice.textContent = '₹1,599';
      if (enterprisePrice) enterprisePrice.textContent = '₹3,199';
    });

    // Plan selection buttons
    document.querySelectorAll('.select-plan-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const plan = btn.getAttribute('data-plan') || 'Pro Fashion Showroom';
        window.showToast(`🎯 Selected ${plan}! Redirecting to checkout & setup...`, 'success');
        const contactSection = document.getElementById('book-demo-section');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // FAQ Accordion
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const trigger = item.querySelector('.faq-question-btn');
      const answer = item.querySelector('.faq-answer');
      const icon = item.querySelector('.faq-icon');

      if (!trigger || !answer) return;

      trigger.addEventListener('click', () => {
        const isOpen = !answer.classList.contains('hidden');

        // Close all
        faqItems.forEach(other => {
          const otherAns = other.querySelector('.faq-answer');
          const otherIcon = other.querySelector('.faq-icon');
          if (otherAns) otherAns.classList.add('hidden');
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        });

        if (!isOpen) {
          answer.classList.remove('hidden');
          if (icon) icon.style.transform = 'rotate(180deg)';
        }
      });
    });

    // FAQ Search Filter
    const searchInput = document.getElementById('faq-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase().trim();
        faqItems.forEach(item => {
          const qText = item.querySelector('.faq-question-btn')?.textContent.toLowerCase() || '';
          const aText = item.querySelector('.faq-answer')?.textContent.toLowerCase() || '';
          if (qText.includes(q) || aText.includes(q)) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    }
  }

  // Demo Booking & Lead Form
  function initDemoBookingForm() {
    const form = document.getElementById('demo-request-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const storeName = form.querySelector('[name="storeName"]')?.value || 'Your Store';
      const phone = form.querySelector('[name="phone"]')?.value || '';

      if (!phone || phone.length < 10) {
        window.showToast('⚠️ Please enter a valid 10-digit mobile number', 'warn');
        return;
      }

      window.showToast(`🚀 Demo Booked for ${storeName}! Our retail specialist will call you shortly.`, 'success');
      form.reset();

      // Show confirmation dialog
      const confirmModal = document.getElementById('booking-confirmed-modal');
      if (confirmModal) confirmModal.classList.remove('hidden');
    });
  }

  // Modals Controller
  function initModals() {
    const modals = document.querySelectorAll('.dikshi-modal');
    modals.forEach(modal => {
      modal.querySelectorAll('.close-modal-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          modal.classList.add('hidden');
        });
      });

      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.add('hidden');
        }
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        modals.forEach(modal => modal.classList.add('hidden'));
      }
    });

    // Test print thermal bill action
    const triggerPrintBtn = document.getElementById('execute-thermal-print-btn');
    if (triggerPrintBtn) {
      triggerPrintBtn.addEventListener('click', () => {
        window.showToast('🖨️ Sending ESC/POS command to 80mm Thermal Printer...', 'success');
        setTimeout(() => {
          window.showToast('✅ Print complete: Bill cut automatically!', 'success');
        }, 1200);
      });
    }

    // WhatsApp bill send action
    const sendWaActionBtn = document.getElementById('execute-send-wa-btn');
    if (sendWaActionBtn) {
      sendWaActionBtn.addEventListener('click', () => {
        const phone = document.getElementById('wa-customer-phone')?.value || '9876543210';
        window.showToast(`📲 WhatsApp PDF Invoice dispatched to +91 ${phone}!`, 'success');
        const modal = document.getElementById('whatsapp-bill-modal');
        if (modal) modal.classList.add('hidden');
      });
    }
  }

  // Smooth Anchors
  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }
})();
