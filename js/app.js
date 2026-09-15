/**
 * Merchant Growth AI - Interactive Demo
 * AI Business Partner for Paytm Merchants
 */

// ---------- Utilities ----------
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  // Close mobile menu if open
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu) mobileMenu.classList.add('hidden');
}

// ---------- Navbar ----------
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// ---------- Charts ----------
let salesChartInstance = null;
let heroChartInstance = null;

const salesData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  revenue: [32400, 28700, 35200, 29800, 41500, 48200, 38850],
  orders: [98, 86, 112, 91, 128, 152, 115]
};

function createHeroChart() {
  const ctx = document.getElementById('heroChart');
  if (!ctx) return;

  heroChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['8am', '10am', '12pm', '2pm', '4pm', '6pm', '8pm'],
      datasets: [{
        label: 'Sales',
        data: [3200, 5800, 9200, 12500, 9800, 7200, 4350],
        borderColor: '#00BAF2',
        backgroundColor: 'rgba(0, 186, 242, 0.12)',
        borderWidth: 2.5,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#0A2540',
          titleFont: { size: 12 },
          bodyFont: { size: 13 },
          padding: 10,
          cornerRadius: 8,
          displayColors: false,
          callbacks: {
            label: (ctx) => '₹' + ctx.raw.toLocaleString('en-IN')
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { size: 10 }, color: '#94a3b8' }
        },
        y: {
          display: false,
          grid: { display: false }
        }
      },
      interaction: { intersect: false, mode: 'index' }
    }
  });
}

function createSalesChart(type = 'revenue') {
  const ctx = document.getElementById('salesChart');
  if (!ctx) return;

  if (salesChartInstance) {
    salesChartInstance.destroy();
  }

  const isRevenue = type === 'revenue';
  const data = isRevenue ? salesData.revenue : salesData.orders;
  const label = isRevenue ? 'Revenue (₹)' : 'Orders';

  salesChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: salesData.labels,
      datasets: [{
        label,
        data,
        backgroundColor: (ctx) => {
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, '#00BAF2');
          gradient.addColorStop(1, '#002970');
          return gradient;
        },
        borderRadius: 8,
        borderSkipped: false,
        barPercentage: 0.65
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#0A2540',
          titleFont: { size: 12 },
          bodyFont: { size: 13 },
          padding: 10,
          cornerRadius: 8,
          displayColors: false,
          callbacks: {
            label: (ctx) => isRevenue
              ? '₹' + ctx.raw.toLocaleString('en-IN')
              : ctx.raw + ' orders'
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { font: { size: 12 }, color: '#64748b' }
        },
        y: {
          grid: { color: '#f1f5f9' },
          ticks: {
            font: { size: 11 },
            color: '#94a3b8',
            callback: (v) => isRevenue ? '₹' + (v / 1000) + 'k' : v
          }
        }
      }
    }
  });
}

// Chart tab switching
document.querySelectorAll('.chart-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.chart-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    createSalesChart(btn.dataset.chart);
  });
});

// ---------- AI Chat ----------
const chatMessages = document.getElementById('chat-messages');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');

const aiResponses = {
  'increase sales': `Great question! Here are 3 practical ways to boost sales this week:

1. **Combo deal** — Offer Chai + Samosa at ₹45. Your data shows 72% of samosa buyers also take chai. This can lift average ticket by ~8%.

2. **Peak hour focus** — 2–4 PM is your busiest window. Ensure full stock of tea powder & milk, and put a small board outside: “Fresh Samosas Ready”.

3. **Evening extension** — Orders 6–8 PM grew 22%. Staying open till 8:30 PM on weekdays can capture more returning office crowd.

Would you like me to draft a WhatsApp message for the combo offer?`,

  'restock': `Based on your last 7 days of sales:

• **Milk** — Current stock will last till Thursday evening. Order **20 litres** today.
• **Tea powder** — Running low. Order **2 kg** of your usual brand.
• **Samosa filling** — Potato & pea stock is fine till Saturday.
• **Bread** — Order extra for weekend (festival nearby).

I can set a reminder for Thursday 10 AM if you’d like.`,

  'festival': `Local festival is next weekend — last similar event you saw **+34% sales**.

**Suggested offer:**
“Buy 2 Get 1 Free Chai” + special sweets platter at ₹120.

**Prep checklist:**
• Extra milk, tea, sugar
• Festival sweets (or partner with a nearby mithai shop)
• Decorate with lights / rangoli near the QR stand
• Post on local WhatsApp groups 2 days before

Shall I generate a short promotional message in Hindi?`,

  'peak': `**Today’s peak hours (so far):**

| Time     | Relative load |
|----------|---------------|
| 2–3 PM   | 92% (highest) |
| 11–12 AM | 78%           |
| 5–6 PM   | 65%           |
| 8–9 AM   | 48%           |

**Tip:** Keep 2 people at the counter during 2–3 PM. Pre-prepare chai and samosas so wait time stays under 2 minutes — customers leave if it takes longer.`,

  default: `I understand. Here’s what I can help with right now:

• Sales trends & comparisons
• Restock suggestions
• Festival / weekend offers
• Peak hour staffing
• Customer loyalty ideas
• Pricing experiments

Try one of the quick buttons above, or ask something like “How do I get more repeat customers?” or “Suggest a price for special chai.”`
};

function getAIResponse(userText) {
  const lower = userText.toLowerCase();
  if (lower.includes('increase') || lower.includes('sales') || lower.includes('boost') || lower.includes('grow')) {
    return aiResponses['increase sales'];
  }
  if (lower.includes('restock') || lower.includes('stock') || lower.includes('inventory') || lower.includes('order')) {
    return aiResponses['restock'];
  }
  if (lower.includes('festival') || lower.includes('offer') || lower.includes('campaign') || lower.includes('promo')) {
    return aiResponses['festival'];
  }
  if (lower.includes('peak') || lower.includes('hour') || lower.includes('busy') || lower.includes('time')) {
    return aiResponses['peak'];
  }
  if (lower.includes('hindi') || lower.includes('namaste') || lower.includes('kaise')) {
    return `Bilkul! Main Hindi mein bhi baat kar sakta hoon.

Aaj aapki sales acchi rahi. Agar aap sales badhana chahte hain to:
1. Chai + Samosa combo ₹45 mein rakhein
2. 2–4 baje peak time pe full stock rakhein
3. Shaam 8:30 tak khula rakhne ka sochiye

Kuch aur poochna hai?`;
  }
  return aiResponses.default;
}

function appendMessage(text, isUser = false) {
  const wrapper = document.createElement('div');
  wrapper.className = `flex gap-3 chat-message-enter ${isUser ? 'flex-row-reverse' : ''}`;

  if (!isUser) {
    wrapper.innerHTML = `
      <div class="w-8 h-8 rounded-full bg-paytm-dark flex-shrink-0 flex items-center justify-center">
        <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
      </div>
      <div class="bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm border border-slate-100 max-w-[85%]">
        <p class="text-sm text-slate-700 whitespace-pre-line">${formatResponse(text)}</p>
      </div>
    `;
  } else {
    wrapper.innerHTML = `
      <div class="bg-paytm-dark text-white rounded-2xl rounded-tr-md px-4 py-3 max-w-[85%]">
        <p class="text-sm">${escapeHtml(text)}</p>
      </div>
    `;
  }

  chatMessages.appendChild(wrapper);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function formatResponse(text) {
  // Simple markdown-like formatting
  return escapeHtml(text)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function showTyping() {
  const el = document.createElement('div');
  el.id = 'typing-indicator';
  el.className = 'flex gap-3';
  el.innerHTML = `
    <div class="w-8 h-8 rounded-full bg-paytm-dark flex-shrink-0 flex items-center justify-center">
      <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
    </div>
    <div class="bg-white rounded-2xl rounded-tl-md px-4 py-3 shadow-sm border border-slate-100 flex items-center gap-1.5">
      <span class="w-2 h-2 bg-slate-400 rounded-full typing-dot"></span>
      <span class="w-2 h-2 bg-slate-400 rounded-full typing-dot"></span>
      <span class="w-2 h-2 bg-slate-400 rounded-full typing-dot"></span>
    </div>
  `;
  chatMessages.appendChild(el);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTyping() {
  const el = document.getElementById('typing-indicator');
  if (el) el.remove();
}

function handleUserMessage(text) {
  if (!text.trim()) return;
  appendMessage(text, true);
  chatInput.value = '';

  showTyping();
  // Simulate thinking delay
  setTimeout(() => {
    hideTyping();
    const reply = getAIResponse(text);
    appendMessage(reply, false);
  }, 900 + Math.random() * 600);
}

if (chatForm) {
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleUserMessage(chatInput.value);
  });
}

// Quick prompts
document.querySelectorAll('.quick-prompt').forEach(btn => {
  btn.addEventListener('click', () => {
    const prompt = btn.dataset.prompt;
    handleUserMessage(prompt);
  });
});

// ---------- Init ----------
document.addEventListener('DOMContentLoaded', () => {
  createHeroChart();
  createSalesChart('revenue');
});

// Make scrollToSection available globally
window.scrollToSection = scrollToSection;
