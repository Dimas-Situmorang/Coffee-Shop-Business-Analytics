## Project Overview

**Coffee Shop Business Analytics Dashboard** is an interactive business intelligence dashboard designed to help coffee shop owners understand sales performance, product contribution, store performance, and peak sales patterns from transaction data.

This project focuses on **Data Analytics and Business Intelligence**, not Machine Learning. The goal is to transform raw transaction data into clear business insights through KPI cards, interactive charts, product ranking, store comparison, and actionable recommendations.

---

## Dataset

The dataset used in this project is **Coffee Shop Sales** from Maven Analytics Data Playground.

**Dataset source:** [Maven Analytics - Coffee Shop Sales](https://mavenanalytics.io/data-playground/coffee-shop-sales)

The dataset contains transaction records from **Maven Roasters**, a fictitious coffee shop operating in three locations in New York City. It includes transaction-level information such as transaction date, transaction time, store location, product category, product type, product detail, quantity sold, and unit price.

### Dataset Summary

| Item            | Description                              |
| --------------- | ---------------------------------------- |
| Dataset Name    | Coffee Shop Sales                        |
| Source          | Maven Analytics Data Playground          |
| Business Domain | Food & Beverage / Retail                 |
| Period          | January 2023 - June 2023                 |
| Total Records   | 149,116 transactions                     |
| Total Fields    | 11 columns                               |
| Store Locations | 3 locations                              |
| Main Use Case   | Sales performance and business analytics |

---

## Why This Dataset Was Chosen

This dataset was selected because it represents a realistic coffee shop transaction structure. It contains the key fields needed to perform business analysis, including sales date, sales time, product details, quantity sold, unit price, and store location.

The dataset is suitable for answering practical business questions such as:

* How does revenue change over time?
* Which product categories generate the highest revenue?
* Which products should be prioritized for promotion or menu placement?
* What time of day produces the highest sales?
* Which store location contributes the most revenue?
* What operational decisions can be made from sales patterns?

---

## Business Problem

Coffee shop owners often make operational decisions based on intuition rather than data. This can lead to missed opportunities, such as not preparing enough stock during peak hours, under-promoting high-performing products, or failing to recognize store-level performance differences.

This dashboard helps solve that problem by turning transaction data into clear and actionable business insights.

---

## Business Impact

This dashboard can help coffee shop owners and business analysts:

* Monitor total revenue, transactions, quantity sold, and average order value.
* Identify high-performing product categories and best-selling products.
* Understand peak sales hours and busy days.
* Compare revenue contribution across store locations.
* Support operational decisions such as staffing, stock preparation, product placement, bundling, and promotion planning.
* Communicate business performance through a clean and interactive dashboard.

---

## Key Insights

Based on the analysis, several important business insights were identified:

1. **Revenue showed strong growth from January to June 2023.**
   This indicates positive business momentum during the analysis period.

2. **Coffee and Tea were the main revenue drivers.**
   These categories contributed the largest share of revenue and should be prioritized in product quality, availability, and menu strategy.

3. **Morning hours were the most important sales window.**
   Sales performance was strongest during morning hours, meaning staff preparation, product readiness, and stock availability should be optimized before peak time.

4. **Store performance was relatively balanced.**
   Revenue contribution across the three locations was close, which suggests that each store plays an important role in overall business performance.

---

## Tools and Technologies

### Data Preparation and Processing

| Tool            | Purpose                                           |
| --------------- | ------------------------------------------------- |
| Microsoft Excel | Initial dataset format and basic inspection       |
| Python          | Data processing and transformation                |
| Pandas          | Data cleaning, aggregation, and feature creation  |
| JSON / CSV      | Exported processed data for dashboard consumption |

The raw transaction data was cleaned and transformed into dashboard-ready datasets, including monthly revenue summary, category performance, store performance, hourly pattern, weekday pattern, top product ranking, and heatmap data.

### Frontend and Dashboard Development

| Tool                       | Purpose                                                |
| -------------------------- | ------------------------------------------------------ |
| Next.js                    | React framework for building the dashboard application |
| TypeScript                 | Type-safe frontend development                         |
| Tailwind CSS               | Styling and responsive layout                          |
| shadcn/ui-style Components | Modern UI components such as cards, tabs, and buttons  |
| Recharts                   | Interactive charts and data visualization              |
| Lucide React               | Dashboard icons                                        |

---

## Data Analysis Process

The project followed these main steps:

1. **Data Understanding**
   Reviewed dataset structure, available columns, transaction period, product fields, and store locations.

2. **Data Cleaning**
   Checked missing values, duplicate records, data types, transaction dates, transaction time, and numerical fields.

3. **Feature Engineering**
   Created additional fields such as revenue, month, weekday, hour, and sales grouping dimensions.

4. **Data Aggregation**
   Aggregated transaction-level data into business-level summaries:

   * Monthly revenue
   * Revenue by category
   * Revenue by store
   * Revenue by hour
   * Revenue by weekday
   * Top products by revenue
   * Top products by quantity
   * Day-hour sales heatmap

5. **Dashboard Design**
   Designed an interactive dashboard using KPI cards, charts, tables, filters, tabs, and business insight sections.

6. **Business Interpretation**
   Converted visual findings into business recommendations for coffee shop owners.

---

## Dashboard Features

The dashboard includes the following sections:

### 1. Dataset Overview

Explains the dataset source, background, analysis objectives, and project scope.

### 2. Sales Summary

Shows key business metrics such as total revenue, total transactions, total quantity sold, and average order value.

### 3. Sales Pattern

Analyzes revenue trends by month, day, and hour to identify important sales patterns.

### 4. Product Performance

Ranks products by revenue and quantity sold to identify priority products for promotion, bundling, and menu strategy.

### 5. Store Analysis

Compares revenue contribution across store locations and product categories.

### 6. Business Insights

Summarizes the most important findings and provides actionable recommendations for business decisions.

---

## Project Scope

This project is focused only on **Data Analytics and Business Intelligence**.

Machine Learning, sales forecasting, and inventory recommendation are intentionally separated into a second project to keep the portfolio structure clear.

### In Scope

* Data cleaning
* Data aggregation
* Business KPI analysis
* Interactive dashboard
* Product and store analysis
* Business insight storytelling

### Out of Scope

* Machine Learning model
* Sales forecasting
* Inventory prediction
* Automated stock recommendation
* Backend database integration

---

## How to Run the Project

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Open the dashboard in your browser:

```bash
http://localhost:3000
```

---

## Repository Structure

```text
coffee-shop-bi-dashboard-final/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   └── ui/
├── data/
│   └── dashboard-data.json
├── lib/
│   └── utils.ts
├── README.md
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## Conclusion

This project demonstrates how raw coffee shop transaction data can be transformed into an interactive business intelligence dashboard. The dashboard helps users understand revenue trends, product performance, peak sales periods, and store contribution, while also providing practical recommendations for business decision-making.

The main value of this project is not only in the visual dashboard, but also in the ability to translate data into clear business insights that can support operational decisions.
