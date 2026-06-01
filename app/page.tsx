"use client";

import { useMemo, useState, type ComponentType } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  BarChart3,
  Building2,
  CalendarDays,
  Clock3,
  Coffee,
  Lightbulb,
  Package,
  ReceiptText,
  TrendingUp,
  Users,
} from "lucide-react";

import dashboardData from "@/data/dashboard-data.json";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn, formatCurrency, formatNumber, formatPercent } from "@/lib/utils";

type ProductRow = {
  product_id: number;
  product_detail: string;
  product_category: string;
  product_type: string;
  revenue: number;
  quantity: number;
  transactions: number;
  revenue_share_pct: number;
  aov: number;
};

type StoreCategoryRow = {
  store_location: string;
  product_category: string;
  revenue: number;
  quantity: number;
};

type HeatmapRow = {
  weekday: string;
  hour: number;
  hour_label: string;
  revenue: number;
  transactions: number;
  intensity: number;
};

type ChartTooltipProps = {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    dataKey: string;
    payload: Record<string, unknown>;
  }>;
  label?: string;
  valuePrefix?: string;
  valueFormatter?: (value: number) => string;
};

const data = dashboardData as any;
const chartMargins = { top: 16, right: 22, left: 8, bottom: 8 };
const chartColors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];
const weekdayOrder = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const weekdayId: Record<string, string> = {
  Monday: "Senin",
  Tuesday: "Selasa",
  Wednesday: "Rabu",
  Thursday: "Kamis",
  Friday: "Jumat",
  Saturday: "Sabtu",
  Sunday: "Minggu",
};

function CustomTooltip({
  active,
  payload,
  label,
  valueFormatter = formatCurrency,
}: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-2xl border bg-white/95 p-3 text-sm shadow-xl backdrop-blur">
      {label ? (
        <p className="mb-2 font-semibold text-foreground">{label}</p>
      ) : null}
      <div className="space-y-1">
        {payload.map((item) => (
          <div
            key={`${item.dataKey}-${item.name}`}
            className="flex items-center justify-between gap-5"
          >
            <span className="text-muted-foreground">{item.name}</span>
            <span className="font-semibold">
              {valueFormatter(Number(item.value))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
}: {
  title: string;
  value: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  trend?: string;
}) {
  return (
    <Card className="glass-card overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
              {value}
            </p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              {description}
            </p>
          </div>
          <div className="rounded-2xl bg-primary/10 p-3 text-primary">
            <Icon className="h-5 w-5" />
          </div>
        </div>
        {trend ? (
          <div className="mt-4 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            {trend}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6 flex flex-col gap-2">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
      <p className="max-w-3xl text-sm leading-6 text-muted-foreground md:text-base">
        {description}
      </p>
    </div>
  );
}

function ChartCard({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn("glass-card", className)}>
      <CardHeader className="pb-3">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="h-[360px]">{children}</CardContent>
    </Card>
  );
}

function InsightCard({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-3xl border bg-white/80 p-5 shadow-sm">
      <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-2xl bg-primary text-sm font-bold text-primary-foreground">
        {number}
      </div>
      <h3 className="font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
    </div>
  );
}

function ProductTable({
  rows,
  metric,
}: {
  rows: ProductRow[];
  metric: "revenue" | "quantity";
}) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white">
      <table className="w-full text-sm">
        <thead className="bg-muted/70 text-left text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-4 py-3">Produk</th>
            <th className="px-4 py-3">Kategori</th>
            <th className="px-4 py-3 text-right">Revenue</th>
            <th className="px-4 py-3 text-right">Qty</th>
            <th className="px-4 py-3 text-right">Share</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={`${row.product_id}-${row.product_detail}`}
              className="border-t transition-colors hover:bg-accent/35"
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold",
                      index < 3
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium leading-5">
                      {row.product_detail}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {row.product_type}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {row.product_category}
              </td>
              <td className="px-4 py-3 text-right font-medium">
                {formatCurrency(row.revenue)}
              </td>
              <td className="px-4 py-3 text-right font-medium">
                {formatNumber(row.quantity)}
              </td>
              <td className="px-4 py-3 text-right font-medium">
                {formatPercent(row.revenue_share_pct)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="border-t bg-muted/30 px-4 py-3 text-xs text-muted-foreground">
        Ranking saat ini berdasarkan{" "}
        <strong>{metric === "revenue" ? "revenue" : "quantity sold"}</strong>.
      </div>
    </div>
  );
}

function Heatmap({ rows }: { rows: HeatmapRow[] }) {
  const hours = Array.from(new Set(rows.map((row) => row.hour_label)));

  const rowMap = new Map(
    rows.map((row) => [`${row.weekday}-${row.hour_label}`, row]),
  );
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Heatmap Jam Ramai</CardTitle>
        <CardDescription>
          Semakin gelap warnanya, semakin tinggi revenue pada kombinasi hari dan
          jam tersebut.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto pb-2">
          <div className="min-w-[900px]">
            <div
              className="grid gap-1"
              style={{
                gridTemplateColumns: `110px repeat(${hours.length}, minmax(44px, 1fr))`,
              }}
            >
              <div />
              {hours.map((hour) => (
                <div
                  key={hour}
                  className="text-center text-[11px] font-medium text-muted-foreground"
                >
                  {hour}
                </div>
              ))}
              {weekdayOrder.map((day) => (
                <div key={day} className="contents">
                  <div className="flex items-center text-xs font-semibold text-muted-foreground">
                    {weekdayId[day]}
                  </div>
                  {hours.map((hour) => {
                    const cell = rowMap.get(`${day}-${hour}`);
                    const intensity = cell?.intensity ?? 0;
                    const alpha = Math.max(0.08, intensity / 120);
                    return (
                      <div
                        key={`${day}-${hour}`}
                        title={`${weekdayId[day]} ${hour}: ${cell ? formatCurrency(cell.revenue) : "-"}`}
                        className="h-8 rounded-lg border border-white/70"
                        style={{
                          backgroundColor: `rgba(180, 83, 9, ${alpha})`,
                        }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const [productMetric, setProductMetric] = useState<"revenue" | "quantity">(
    "revenue",
  );
  const [selectedStore, setSelectedStore] = useState("All Stores");
  const [categoryMetric, setCategoryMetric] = useState<"revenue" | "quantity">(
    "revenue",
  );

  const selectedProducts: ProductRow[] = useMemo(() => {
    return productMetric === "revenue"
      ? data.topProductsByRevenue
      : data.topProductsByQuantity;
  }, [productMetric]);

  const storeCategoryRows: StoreCategoryRow[] = useMemo(() => {
    const rows = data.storeCategory as StoreCategoryRow[];
    if (selectedStore === "All Stores") {
      const grouped = new Map<string, StoreCategoryRow>();
      rows.forEach((row) => {
        const existing = grouped.get(row.product_category);
        if (!existing)
          grouped.set(row.product_category, {
            ...row,
            store_location: "All Stores",
          });
        else {
          existing.revenue += row.revenue;
          existing.quantity += row.quantity;
        }
      });
      return Array.from(grouped.values()).sort(
        (a, b) => b[categoryMetric] - a[categoryMetric],
      );
    }
    return rows
      .filter((row) => row.store_location === selectedStore)
      .sort((a, b) => b[categoryMetric] - a[categoryMetric]);
  }, [selectedStore, categoryMetric]);

  const bestMonth = [...data.monthlyRevenue].sort(
    (a: any, b: any) => b.revenue - a.revenue,
  )[0];
  const weakestMonth = [...data.monthlyRevenue].sort(
    (a: any, b: any) => a.revenue - b.revenue,
  )[0];
  const coffeeTeaShare = (data.categoryPerformance as any[])
    .filter((row) => ["Coffee", "Tea"].includes(row.product_category))
    .reduce((sum, row) => sum + row.revenue_share_pct, 0);

  return (
    <main className="min-h-screen soft-grid-bg">
      <section className="border-b bg-white/70 backdrop-blur-xl">
        <div className="dashboard-container">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <h1 className="text-4xl font-black tracking-tight text-foreground md:text-6xl">
                Coffee Shop Business Analytics Dashboard
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
                Dashboard interaktif untuk membantu owner coffee shop memahami
                performa penjualan, produk unggulan, jam ramai, kontribusi
                cabang, dan rekomendasi keputusan bisnis dari data transaksi.
              </p>
            </div>
            <Card className="glass-card w-full lg:w-[360px]">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <CalendarDays className="h-4 w-4" /> Periode Analisis
                </CardTitle>
                <CardDescription>
                  Dataset Maven Coffee Shop Sales
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{data.meta.dateRange}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Fokus project ini adalah business intelligence dan visual
                  storytelling. Forecasting/ML sengaja dipisah menjadi project
                  kedua.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <div className="dashboard-container">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Total Revenue"
            value={formatCurrency(data.summary.totalRevenue)}
            description="Total nilai penjualan selama periode dataset."
            icon={TrendingUp}
            trend={`Naik ${formatPercent(data.summary.revenueGrowthJanToJunPct)} Jan–Jun`}
          />
          <MetricCard
            title="Total Transaksi"
            value={formatNumber(data.summary.totalTransactions)}
            description="Jumlah transaksi yang tercatat."
            icon={ReceiptText}
          />
          <MetricCard
            title="Produk Terjual"
            value={formatNumber(data.summary.totalQuantity)}
            description="Total quantity item yang terjual."
            icon={Package}
          />
          <MetricCard
            title="Average Order Value"
            value={formatCurrency(data.summary.averageOrderValue)}
            description="Rata-rata revenue per transaksi."
            icon={Coffee}
          />
        </div>

        <Tabs defaultValue="dataset" className="mt-8 w-full">
          <TabsList className="grid h-auto w-full grid-cols-2 rounded-2xl bg-[#efe8df] p-1 md:grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="dataset">Tentang Dataset</TabsTrigger>
            <TabsTrigger value="overview">Ringkasan</TabsTrigger>
            <TabsTrigger value="pattern">Pola Penjualan</TabsTrigger>
            <TabsTrigger value="product">Produk</TabsTrigger>
            <TabsTrigger value="store">Cabang</TabsTrigger>
            <TabsTrigger value="insight">Insight Bisnis</TabsTrigger>
          </TabsList>

          <TabsContent value="dataset" className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a8561c]">
                Dataset Overview
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#2b1a12]">
                Tentang dataset yang digunakan
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                Dashboard ini menggunakan dataset Coffee Shop Sales dari Maven
                Analytics. Dataset ini dipilih karena memiliki struktur
                transaksi yang lengkap untuk kebutuhan analisis bisnis coffee
                shop, mulai dari tanggal transaksi, waktu transaksi, lokasi
                cabang, kategori produk, detail produk, quantity terjual, hingga
                harga satuan.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Card className="rounded-3xl border-[#eadfd7] bg-white/90 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">Sumber Dataset</CardTitle>
                  <CardDescription>
                    Dataset publik dari Maven Analytics.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    Dataset berasal dari Maven Analytics Data Playground dengan
                    judul
                    <span className="font-medium text-[#2b1a12]">
                      {" "}
                      Coffee Shop Sales
                    </span>
                    .
                  </p>
                  <a
                    href="https://mavenanalytics.io/data-playground/coffee-shop-sales"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center font-semibold text-[#a8561c] hover:underline"
                  >
                    Buka sumber dataset →
                  </a>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-[#eadfd7] bg-white/90 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">Cakupan Data</CardTitle>
                  <CardDescription>Periode dan ukuran dataset.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center justify-between border-b border-[#f1e7df] pb-2">
                    <span>Periode</span>
                    <span className="font-semibold text-[#2b1a12]">
                      Jan–Jun 2023
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-[#f1e7df] pb-2">
                    <span>Total transaksi</span>
                    <span className="font-semibold text-[#2b1a12]">
                      149,116
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Jumlah field</span>
                    <span className="font-semibold text-[#2b1a12]">
                      11 kolom
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-[#eadfd7] bg-white/90 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">Alasan Pemilihan</CardTitle>
                  <CardDescription>
                    Relevan untuk analisis bisnis coffee shop.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm leading-6 text-muted-foreground">
                  Dataset ini cocok digunakan karena merepresentasikan transaksi
                  harian coffee shop dengan informasi produk, waktu, dan lokasi.
                  Struktur ini memungkinkan analisis performa penjualan, produk
                  terlaris, jam ramai, kontribusi cabang, serta rekomendasi
                  keputusan operasional berbasis data.
                </CardContent>
              </Card>
            </div>

            <Card className="rounded-3xl border-[#eadfd7] bg-white/90 shadow-sm">
              <CardHeader>
                <CardTitle>Latar Belakang Analisis</CardTitle>
                <CardDescription>
                  Mengapa analisis bisnis coffee shop ini penting?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
                <p>
                  Bisnis coffee shop memiliki karakter penjualan yang sangat
                  dipengaruhi oleh waktu, lokasi, dan preferensi produk. Owner
                  perlu mengetahui kapan penjualan paling tinggi, produk apa
                  yang menjadi revenue driver, cabang mana yang paling
                  berkontribusi, dan kategori mana yang perlu dijaga
                  performanya.
                </p>

                <p>
                  Tanpa dashboard analitik, keputusan bisnis sering hanya
                  bergantung pada intuisi. Hal ini dapat membuat owner terlambat
                  melihat pola penting, seperti jam operasional paling
                  produktif, produk dengan kontribusi besar, atau cabang yang
                  performanya mulai tertinggal.
                </p>

                <p>
                  Oleh karena itu, dashboard ini dibuat untuk membantu owner
                  coffee shop memahami kondisi bisnis secara cepat melalui KPI,
                  visualisasi interaktif, dan insight yang langsung mengarah ke
                  keputusan bisnis.
                </p>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="rounded-3xl border-[#eadfd7] bg-[#fff8f2] shadow-sm">
                <CardHeader>
                  <CardTitle>Objective Analisis</CardTitle>
                  <CardDescription>
                    Pertanyaan bisnis yang dijawab dashboard.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
                    <li>
                      Bagaimana tren revenue coffee shop dari Januari sampai
                      Juni 2023?
                    </li>
                    <li>
                      Kategori dan produk apa yang paling berkontribusi terhadap
                      penjualan?
                    </li>
                    <li>
                      Jam dan hari apa yang menjadi periode penjualan paling
                      ramai?
                    </li>
                    <li>Cabang mana yang memiliki performa revenue terbaik?</li>
                    <li>
                      Keputusan operasional apa yang bisa diambil dari pola
                      penjualan?
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-[#eadfd7] bg-[#fff8f2] shadow-sm">
                <CardHeader>
                  <CardTitle>Catatan Scope Project</CardTitle>
                  <CardDescription>
                    Batasan agar project tetap fokus sebagai BI dashboard.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
                  <p>
                    Project ini difokuskan untuk analisis bisnis dan visualisasi
                    data. Forecasting, machine learning, dan inventory
                    recommendation sengaja dipisahkan menjadi project kedua agar
                    narasi portfolio lebih jelas.
                  </p>
                  <p className="font-medium text-[#2b1a12]">
                    Fokus utama project ini adalah Data Analyst / Business
                    Intelligence, bukan Machine Learning.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="overview" className="space-y-6">
            <SectionHeader
              eyebrow="Executive overview"
              title="Performa bisnis menunjukkan pertumbuhan kuat"
              description="Halaman ini merangkum arah penjualan, revenue driver, dan kondisi bisnis utama yang perlu dipahami owner sebelum masuk ke analisis detail."
            />
            <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
              <ChartCard
                title="Tren Revenue Bulanan"
                description={`Bulan terkuat adalah ${bestMonth.month_label}; bulan terendah adalah ${weakestMonth.month_label}.`}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.monthlyRevenue} margin={chartMargins}>
                    <defs>
                      <linearGradient
                        id="revenueGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="hsl(var(--chart-1))"
                          stopOpacity={0.35}
                        />
                        <stop
                          offset="95%"
                          stopColor="hsl(var(--chart-1))"
                          stopOpacity={0.02}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="month_label"
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) =>
                        `$${Math.round(Number(value) / 1000)}k`
                      }
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      name="Revenue"
                      stroke="hsl(var(--chart-1))"
                      strokeWidth={3}
                      fill="url(#revenueGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartCard>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Business Health</CardTitle>
                  <CardDescription>
                    Ringkasan status bisnis dari KPI utama.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-3xl bg-emerald-50 p-4">
                    <div className="flex items-center gap-2 font-semibold text-emerald-800">
                      <TrendingUp className="h-4 w-4" /> Revenue bertumbuh
                    </div>
                    <p className="mt-2 text-sm leading-6 text-emerald-700">
                      Revenue naik{" "}
                      {formatPercent(data.summary.revenueGrowthJanToJunPct)}{" "}
                      dari Januari ke Juni. Momentum ini perlu dijaga dengan
                      stok dan operasional yang lebih siap.
                    </p>
                  </div>
                  <div className="rounded-3xl bg-amber-50 p-4">
                    <div className="flex items-center gap-2 font-semibold text-amber-900">
                      <Coffee className="h-4 w-4" /> Coffee & Tea dominan
                    </div>
                    <p className="mt-2 text-sm leading-6 text-amber-800">
                      Dua kategori utama menyumbang{" "}
                      {formatPercent(coffeeTeaShare)} revenue. Ini adalah
                      kategori yang paling wajib dijaga kualitas dan
                      ketersediaannya.
                    </p>
                  </div>
                  <div className="rounded-3xl bg-blue-50 p-4">
                    <div className="flex items-center gap-2 font-semibold text-blue-800">
                      <Clock3 className="h-4 w-4" /> Pagi adalah peak window
                    </div>
                    <p className="mt-2 text-sm leading-6 text-blue-700">
                      Jam terbaik berada di sekitar {data.summary.bestHour}.
                      Persiapan shift, bahan, dan display produk harus matang
                      sebelum jam tersebut.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <ChartCard
                title="Revenue per Kategori"
                description="Kategori utama yang mendorong revenue coffee shop."
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data.categoryPerformance}
                    layout="vertical"
                    margin={{ ...chartMargins, left: 48 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis
                      type="number"
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) =>
                        `$${Math.round(Number(value) / 1000)}k`
                      }
                    />
                    <YAxis
                      type="category"
                      dataKey="product_category"
                      width={128}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="revenue"
                      name="Revenue"
                      radius={[0, 10, 10, 0]}
                      fill="hsl(var(--chart-1))"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
              <ChartCard
                title="Revenue per Cabang"
                description="Kontribusi revenue dari masing-masing store location."
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.storePerformance} margin={chartMargins}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="store_location"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) =>
                        `$${Math.round(Number(value) / 1000)}k`
                      }
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="revenue"
                      name="Revenue"
                      radius={[10, 10, 0, 0]}
                      fill="hsl(var(--chart-2))"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </TabsContent>

          <TabsContent value="pattern" className="space-y-6">
            <SectionHeader
              eyebrow="Sales pattern"
              title="Jam operasional pagi menjadi area paling penting"
              description="Analisis pola waktu membantu owner mengatur shift karyawan, persiapan bahan, dan waktu promosi dengan lebih tepat."
            />
            <div className="grid gap-6 lg:grid-cols-2">
              <ChartCard
                title="Revenue per Jam"
                description={`Jam dengan revenue tertinggi: ${data.summary.bestHour}.`}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.hourlyPattern} margin={chartMargins}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="hour_label"
                      interval={0}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 11 }}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) =>
                        `$${Math.round(Number(value) / 1000)}k`
                      }
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="revenue"
                      name="Revenue"
                      radius={[10, 10, 0, 0]}
                      fill="hsl(var(--chart-1))"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
              <ChartCard
                title="Revenue per Hari"
                description="Membandingkan performa penjualan di setiap hari dalam minggu."
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={data.weekdayPattern.map((row: any) => ({
                      ...row,
                      weekday_id: weekdayId[row.weekday],
                    }))}
                    margin={chartMargins}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="weekday_id"
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) =>
                        `$${Math.round(Number(value) / 1000)}k`
                      }
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      name="Revenue"
                      stroke="hsl(var(--chart-3))"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
            <Heatmap rows={data.dayHourHeatmap} />
          </TabsContent>

          <TabsContent value="product" className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <SectionHeader
                eyebrow="Product performance"
                title="Produk prioritas ditentukan dari revenue dan quantity"
                description="Gunakan toggle untuk melihat produk yang paling kuat dari sisi kontribusi uang atau volume penjualan."
              />
              <div className="flex rounded-2xl border bg-white p-1 shadow-sm">
                <Button
                  variant={productMetric === "revenue" ? "default" : "ghost"}
                  onClick={() => setProductMetric("revenue")}
                >
                  Revenue
                </Button>
                <Button
                  variant={productMetric === "quantity" ? "default" : "ghost"}
                  onClick={() => setProductMetric("quantity")}
                >
                  Quantity
                </Button>
              </div>
            </div>
            <div className="grid items-start gap-6 xl:grid-cols-[0.9fr_1.1fr]">
              <ChartCard
                title={
                  productMetric === "revenue"
                    ? "Top 10 Produk by Revenue"
                    : "Top 10 Produk by Quantity"
                }
                description="Ranking produk yang paling berpengaruh terhadap bisnis."
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={selectedProducts.slice(0, 10)}
                    layout="vertical"
                    margin={{ ...chartMargins, left: 88 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis
                      type="number"
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) =>
                        productMetric === "revenue"
                          ? `$${Math.round(Number(value) / 1000)}k`
                          : `${Math.round(Number(value) / 1000)}k`
                      }
                    />
                    <YAxis
                      type="category"
                      dataKey="product_detail"
                      width={168}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 11 }}
                    />
                    <Tooltip
                      content={
                        <CustomTooltip
                          valueFormatter={
                            productMetric === "revenue"
                              ? formatCurrency
                              : formatNumber
                          }
                        />
                      }
                    />
                    <Bar
                      dataKey={productMetric}
                      name={
                        productMetric === "revenue" ? "Revenue" : "Quantity"
                      }
                      radius={[0, 10, 10, 0]}
                      fill="hsl(var(--chart-2))"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Daftar Produk Prioritas</CardTitle>
                  <CardDescription>
                    Produk yang layak diprioritaskan untuk display menu,
                    bundling, stok, dan promosi.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ProductTable
                    rows={selectedProducts.slice(0, 12)}
                    metric={productMetric}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="store" className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <SectionHeader
                eyebrow="Store analysis"
                title="Performa cabang relatif seimbang"
                description="Owner bisa membandingkan kontribusi cabang dan kategori dominan di setiap lokasi."
              />
              <div className="flex flex-col gap-2 sm:flex-row">
                <select
                  value={selectedStore}
                  onChange={(event) => setSelectedStore(event.target.value)}
                  className="h-11 rounded-2xl border bg-white px-4 text-sm shadow-sm outline-none ring-primary/20 focus:ring-4"
                >
                  <option>All Stores</option>
                  {data.storePerformance.map((store: any) => (
                    <option key={store.store_location}>
                      {store.store_location}
                    </option>
                  ))}
                </select>
                <select
                  value={categoryMetric}
                  onChange={(event) =>
                    setCategoryMetric(
                      event.target.value as "revenue" | "quantity",
                    )
                  }
                  className="h-11 rounded-2xl border bg-white px-4 text-sm shadow-sm outline-none ring-primary/20 focus:ring-4"
                >
                  <option value="revenue">Revenue</option>
                  <option value="quantity">Quantity</option>
                </select>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {data.storePerformance.map((store: any, index: number) => (
                <Card key={store.store_location} className="glass-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Building2 className="h-4 w-4" /> {store.store_location}
                    </CardTitle>
                    <CardDescription>
                      {formatPercent(store.revenue_share_pct)} dari total
                      revenue
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold">
                      {formatCurrency(store.revenue)}
                    </p>
                    <div className="mt-4 h-2 rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${store.revenue_share_pct}%`,
                          backgroundColor:
                            chartColors[index % chartColors.length],
                        }}
                      />
                    </div>
                    <div className="mt-3 flex justify-between text-xs text-muted-foreground">
                      <span>{formatNumber(store.transactions)} transaksi</span>
                      <span>AOV {formatCurrency(store.aov)}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
              <ChartCard
                title="Share Revenue Cabang"
                description="Distribusi revenue dari tiga lokasi toko."
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip content={<CustomTooltip />} />
                    <Pie
                      data={data.storePerformance}
                      dataKey="revenue"
                      nameKey="store_location"
                      innerRadius={72}
                      outerRadius={118}
                      paddingAngle={3}
                    >
                      {data.storePerformance.map((_: any, index: number) => (
                        <Cell
                          key={index}
                          fill={chartColors[index % chartColors.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </ChartCard>
              <ChartCard
                title="Kategori per Cabang"
                description={
                  selectedStore === "All Stores"
                    ? "Kategori digabung dari semua cabang."
                    : `Kategori terkuat di ${selectedStore}.`
                }
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={storeCategoryRows.slice(0, 9)}
                    layout="vertical"
                    margin={{ ...chartMargins, left: 78 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis
                      type="number"
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) =>
                        categoryMetric === "revenue"
                          ? `$${Math.round(Number(value) / 1000)}k`
                          : `${Math.round(Number(value) / 1000)}k`
                      }
                    />
                    <YAxis
                      type="category"
                      dataKey="product_category"
                      width={150}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip
                      content={
                        <CustomTooltip
                          valueFormatter={
                            categoryMetric === "revenue"
                              ? formatCurrency
                              : formatNumber
                          }
                        />
                      }
                    />
                    <Bar
                      dataKey={categoryMetric}
                      name={
                        categoryMetric === "revenue" ? "Revenue" : "Quantity"
                      }
                      radius={[0, 10, 10, 0]}
                      fill="hsl(var(--chart-4))"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          </TabsContent>

          <TabsContent value="insight" className="space-y-6">
            <SectionHeader
              eyebrow="Business storytelling"
              title="Insight utama dan keputusan yang bisa diambil owner"
              description="Bagian ini merangkum temuan penting dalam bahasa bisnis, bukan hanya angka mentah."
            />
            <div className="grid gap-6 lg:grid-cols-3">
              <InsightCard
                number="01"
                title="Revenue tumbuh kuat"
                body={`Revenue meningkat ${formatPercent(data.summary.revenueGrowthJanToJunPct)} dari Januari ke Juni. Ini menunjukkan demand naik dan bisnis punya momentum pertumbuhan yang baik.`}
              />
              <InsightCard
                number="02"
                title="Coffee dan Tea adalah revenue driver"
                body={`Coffee dan Tea menyumbang ${formatPercent(coffeeTeaShare)} dari total revenue. Owner perlu menjaga kualitas, stok, dan konsistensi produk pada dua kategori ini.`}
              />
              <InsightCard
                number="03"
                title="Pagi adalah jam operasional kritis"
                body={`Jam terbaik berada di ${data.summary.bestHour}, dan revenue pagi menyumbang ${formatPercent(data.summary.morningRevenueSharePct)} dari total revenue. Persiapan sebelum peak hour sangat penting.`}
              />
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-primary" /> Rekomendasi
                    Keputusan
                  </CardTitle>
                  <CardDescription>
                    Actionable insight untuk owner coffee shop.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-3xl border bg-white p-5">
                    <p className="font-semibold">
                      1. Prioritaskan stok kategori Coffee dan Tea
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Dua kategori ini adalah mesin revenue. Ketersediaan bahan,
                      kualitas rasa, dan konsistensi penyajian harus menjadi
                      prioritas operasional.
                    </p>
                  </div>
                  <div className="rounded-3xl border bg-white p-5">
                    <p className="font-semibold">
                      2. Perkuat operasional jam pagi
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Pastikan bahan siap, barista cukup, dan produk populer
                      tersedia sebelum jam 07:00–10:00 karena window ini sangat
                      penting untuk revenue harian.
                    </p>
                  </div>
                  <div className="rounded-3xl border bg-white p-5">
                    <p className="font-semibold">
                      3. Gunakan top product untuk bundling
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Produk dengan kontribusi tinggi bisa dijadikan anchor
                      untuk strategi bundling, upselling, dan promosi ringan
                      tanpa mengganggu produk utama.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Data Story Summary</CardTitle>
                  <CardDescription>
                    Ringkasan insight dari dataset.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {(data.insights as string[]).map((insight, index) => (
                    <div
                      key={insight}
                      className="flex gap-3 rounded-2xl bg-white p-4 shadow-sm"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {index + 1}
                      </div>
                      <p className="text-sm leading-6 text-muted-foreground">
                        {insight}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
