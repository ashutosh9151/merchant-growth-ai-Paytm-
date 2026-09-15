# Merchant Growth AI

**The AI business partner for every Paytm merchant.**

A modern, fully responsive interactive demo that shows how AI can help Indian merchants grow using payments and sales data.

## Features

- **Beautiful landing page** with animated hero and live-looking snapshot card
- **Merchant Dashboard**
  - KPI cards (Revenue, Orders, Avg. Ticket, New Customers)
  - Interactive sales chart (Revenue / Orders toggle)
  - Peak hours visualization
  - Top selling items
- **AI Growth Partner Chat**
  - Natural language Q&A (English + Hindi)
  - Quick-action prompts
  - Typing indicator & smooth message animation
  - Contextual answers for sales, restock, festival offers, peak hours
- **AI Recommendations**
  - High-impact, restock, marketing, timing, loyalty & pricing suggestions
- Fully **responsive** (mobile, tablet, desktop)
- Clean Paytm-inspired color system (blue + navy)
- Zero build step — open `index.html` or serve statically

## How to run

### Option 1 — Open directly
Simply open `index.html` in any modern browser.

### Option 2 — Local server (recommended)
```bash
# Python
python -m http.server 8080

# or Node
npx serve .
```
Then visit `http://localhost:8080`

## Project structure

```
merchant-growth-ai/
├── index.html          # Main single-page application
├── css/
│   └── styles.css      # Custom animations & polish
├── js/
│   └── app.js          # Charts, chat logic, interactions
├── README.md
└── assets/             # (optional future images)
```

## Tech stack

- HTML5 + Tailwind CSS (CDN)
- Chart.js for analytics charts
- Vanilla JavaScript (no framework required)
- Google Fonts (Inter + Space Grotesk)

## Demo store context

The demo is set in the context of a fictional Paytm merchant:

> **Sharma Tea & Snacks · Delhi**

All numbers, peak hours, and AI replies are illustrative and designed to feel realistic for a small food & beverage merchant in India.

## Notes

- This is an **interactive prototype / demo**.
- It is **not affiliated with or endorsed by Paytm**.
- AI responses are rule-based for demo purposes (no external API calls).
- Ready to be extended with real Paytm Payment Gateway / Soundbox data or a real LLM backend.

---

Built with care for India’s merchant ecosystem.
