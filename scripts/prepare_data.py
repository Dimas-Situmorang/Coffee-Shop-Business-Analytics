from pathlib import Path
import json
import pandas as pd


ROOT_DIR = Path(__file__).resolve().parents[1]
RAW_FILE = ROOT_DIR / "data" / "raw" / "Coffee Shop Sales.xlsx"
OUTPUT_FILE = ROOT_DIR / "data" / "dashboard-data.json"


WEEKDAY_ORDER = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
]


def safe_pct(value: float, total: float) -> float:
    if total == 0:
        return 0.0
    return round((value / total) * 100, 2)


def main():
    if not RAW_FILE.exists():
        raise FileNotFoundError(
            f"Raw dataset not found: {RAW_FILE}\n"
            "Place the Maven Coffee Shop Sales Excel file inside data/raw/."
        )

    print("Reading raw dataset...")
    df = pd.read_excel(RAW_FILE)

    print("Cleaning and preparing data...")

    df["transaction_date"] = pd.to_datetime(df["transaction_date"])
    df["transaction_time"] = pd.to_datetime(
        df["transaction_time"].astype(str), errors="coerce"
    ).dt.time

    df["date"] = df["transaction_date"].dt.date
    df["month"] = df["transaction_date"].dt.to_period("M").astype(str)
    df["month_label"] = df["transaction_date"].dt.strftime("%b %Y")
    df["weekday"] = df["transaction_date"].dt.day_name()
    df["hour"] = pd.to_datetime(
        df["transaction_time"].astype(str), errors="coerce"
    ).dt.hour
    df["hour_label"] = df["hour"].astype(str).str.zfill(2) + ":00"

    df["revenue"] = df["transaction_qty"] * df["unit_price"]

    total_revenue = float(df["revenue"].sum())
    total_transactions = int(df["transaction_id"].nunique())
    total_quantity = int(df["transaction_qty"].sum())
    average_order_value = total_revenue / total_transactions

    monthly = (
        df.groupby(["month", "month_label"], as_index=False)
        .agg(
            revenue=("revenue", "sum"),
            quantity=("transaction_qty", "sum"),
            transactions=("transaction_id", "nunique"),
        )
        .sort_values("month")
    )

    january_revenue = monthly.iloc[0]["revenue"]
    june_revenue = monthly.iloc[-1]["revenue"]
    revenue_growth = ((june_revenue - january_revenue) / january_revenue) * 100

    category = (
        df.groupby("product_category", as_index=False)
        .agg(
            revenue=("revenue", "sum"),
            quantity=("transaction_qty", "sum"),
            transactions=("transaction_id", "nunique"),
        )
        .sort_values("revenue", ascending=False)
    )
    category["revenue_share_pct"] = category["revenue"].apply(
        lambda value: safe_pct(value, total_revenue)
    )

    store = (
        df.groupby("store_location", as_index=False)
        .agg(
            revenue=("revenue", "sum"),
            quantity=("transaction_qty", "sum"),
            transactions=("transaction_id", "nunique"),
        )
        .sort_values("revenue", ascending=False)
    )
    store["revenue_share_pct"] = store["revenue"].apply(
        lambda value: safe_pct(value, total_revenue)
    )
    store["aov"] = store["revenue"] / store["transactions"]

    hourly = (
        df.groupby(["hour", "hour_label"], as_index=False)
        .agg(
            revenue=("revenue", "sum"),
            quantity=("transaction_qty", "sum"),
            transactions=("transaction_id", "nunique"),
        )
        .sort_values("hour")
    )

    weekday = (
        df.groupby("weekday", as_index=False)
        .agg(
            revenue=("revenue", "sum"),
            quantity=("transaction_qty", "sum"),
            transactions=("transaction_id", "nunique"),
        )
    )
    weekday["weekday_order"] = weekday["weekday"].apply(
        lambda day: WEEKDAY_ORDER.index(day)
    )
    weekday = weekday.sort_values("weekday_order").drop(columns="weekday_order")

    product = (
        df.groupby(
            ["product_id", "product_detail", "product_category", "product_type"],
            as_index=False,
        )
        .agg(
            revenue=("revenue", "sum"),
            quantity=("transaction_qty", "sum"),
            transactions=("transaction_id", "nunique"),
        )
    )
    product["revenue_share_pct"] = product["revenue"].apply(
        lambda value: safe_pct(value, total_revenue)
    )
    product["aov"] = product["revenue"] / product["transactions"]

    top_products_by_revenue = product.sort_values("revenue", ascending=False).head(30)
    top_products_by_quantity = product.sort_values("quantity", ascending=False).head(30)

    store_category = (
        df.groupby(["store_location", "product_category"], as_index=False)
        .agg(
            revenue=("revenue", "sum"),
            quantity=("transaction_qty", "sum"),
        )
        .sort_values("revenue", ascending=False)
    )

    heatmap = (
        df.groupby(["weekday", "hour", "hour_label"], as_index=False)
        .agg(
            revenue=("revenue", "sum"),
            transactions=("transaction_id", "nunique"),
        )
    )

    max_heatmap_revenue = heatmap["revenue"].max()
    heatmap["intensity"] = heatmap["revenue"].apply(
        lambda value: round((value / max_heatmap_revenue) * 100, 2)
    )

    best_hour_row = hourly.sort_values("revenue", ascending=False).iloc[0]
    best_hour = best_hour_row["hour_label"]

    morning_revenue = hourly[
        (hourly["hour"] >= 7) & (hourly["hour"] <= 10)
    ]["revenue"].sum()
    morning_revenue_share = safe_pct(morning_revenue, total_revenue)

    coffee_tea_share = category[
        category["product_category"].isin(["Coffee", "Tea"])
    ]["revenue_share_pct"].sum()

    insights = [
        f"Total revenue mencapai ${total_revenue:,.2f} dari {total_transactions:,} transaksi selama periode analisis.",
        f"Revenue naik {revenue_growth:.2f}% dari Januari ke Juni 2023, menunjukkan momentum pertumbuhan yang kuat.",
        f"Coffee dan Tea menjadi kategori utama dengan kontribusi sekitar {coffee_tea_share:.1f}% dari total revenue.",
        f"Jam penjualan terkuat adalah {best_hour}, dan jam 07:00-10:00 menyumbang {morning_revenue_share:.2f}% dari total revenue.",
    ]

    dashboard_data = {
        "meta": {
            "datasetName": "Coffee Shop Sales",
            "source": "Maven Analytics Data Playground",
            "dateRange": "01 Jan 2023 - 30 Jun 2023",
        },
        "summary": {
            "totalRevenue": round(total_revenue, 2),
            "totalTransactions": total_transactions,
            "totalQuantity": total_quantity,
            "averageOrderValue": round(average_order_value, 2),
            "revenueGrowthJanToJunPct": round(revenue_growth, 2),
            "bestHour": best_hour,
            "morningRevenueSharePct": morning_revenue_share,
        },
        "monthlyRevenue": monthly.to_dict(orient="records"),
        "categoryPerformance": category.to_dict(orient="records"),
        "storePerformance": store.to_dict(orient="records"),
        "hourlyPattern": hourly.to_dict(orient="records"),
        "weekdayPattern": weekday.to_dict(orient="records"),
        "topProductsByRevenue": top_products_by_revenue.to_dict(orient="records"),
        "topProductsByQuantity": top_products_by_quantity.to_dict(orient="records"),
        "storeCategory": store_category.to_dict(orient="records"),
        "dayHourHeatmap": heatmap.to_dict(orient="records"),
        "insights": insights,
    }

    print("Saving dashboard data...")
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)

    with open(OUTPUT_FILE, "w", encoding="utf-8") as file:
        json.dump(dashboard_data, file, ensure_ascii=False, indent=2)

    print(f"Dashboard data generated successfully: {OUTPUT_FILE}")


if __name__ == "__main__":
    main()