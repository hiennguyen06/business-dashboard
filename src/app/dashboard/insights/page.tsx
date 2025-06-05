"use client";

import { useOrders } from "@/app/components/OrderContext";
import AnalyticsSummaryCard from "@/app/components/AnalyticsSummaryCard";
import SavingsChart from "@/app/components/SavingsChart";
import CategoryBreakdown from "@/app/components/CategoryBreakdown";
import MonthlySpendingTable from "@/app/components/MonthlySpendingTable";

export default function SpendInsightsPage() {
  const { getSpendingAnalytics } = useOrders();
  const analytics = getSpendingAnalytics();

  // Calculate some additional metrics for the summary cards
  const avgMonthlySavings =
    analytics.monthlyData.length > 0
      ? analytics.totalSavings / analytics.monthlyData.length
      : 0;

  const totalOrders = analytics.monthlyData.reduce(
    (sum, month) => sum + month.orderCount,
    0
  );
  const avgOrderValue =
    totalOrders > 0 ? analytics.totalSpent / totalOrders : 0;

  // Calculate trend for latest month vs previous month
  const latestMonth = analytics.monthlyData[0];
  const previousMonth = analytics.monthlyData[1];
  const savingsTrend =
    latestMonth && previousMonth
      ? {
          value: `$${Math.abs(
            latestMonth.totalSavings - previousMonth.totalSavings
          ).toFixed(2)}`,
          isPositive: latestMonth.totalSavings > previousMonth.totalSavings,
        }
      : undefined;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Spend Insights</h1>
        <p className="mt-2 text-gray-600">
          Analyze your business spending patterns and track your savings from
          the 5% business account discount.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnalyticsSummaryCard
          title="Total Savings"
          value={`$${analytics.totalSavings.toFixed(2)}`}
          subtitle="5% business discount"
          icon="💰"
          color="green"
          trend={savingsTrend}
        />
        <AnalyticsSummaryCard
          title="Total Spent"
          value={`$${analytics.totalSpent.toFixed(2)}`}
          subtitle="Across all orders"
          icon="📊"
          color="blue"
        />
        <AnalyticsSummaryCard
          title="Monthly Avg Savings"
          value={`$${avgMonthlySavings.toFixed(2)}`}
          subtitle="Per month"
          icon="📈"
          color="purple"
        />
        <AnalyticsSummaryCard
          title="Avg Order Value"
          value={`$${avgOrderValue.toFixed(2)}`}
          subtitle={`${totalOrders} total orders`}
          icon="🛒"
          color="orange"
        />
      </div>

      {/* Business Account Benefits Banner */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center space-x-4">
          <div className="text-4xl">🎉</div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              Business Account Benefits
            </h3>
            <p className="text-gray-600 mt-1">
              You&apos;re saving {(analytics.discountRate * 100).toFixed(0)}% on
              every order with your business account! Keep ordering to maximize
              your savings.
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-green-600">
              ${analytics.totalSavings.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600">Total saved</p>
          </div>
        </div>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Savings Over Time Chart */}
        <div className="lg:col-span-2">
          <SavingsChart data={analytics.savingsOverTime} />
        </div>

        {/* Category Breakdown */}
        <CategoryBreakdown categories={analytics.categoryBreakdown} />

        {/* Monthly Spending Table */}
        <MonthlySpendingTable monthlyData={analytics.monthlyData} />
      </div>

      {/* Insights and Recommendations */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          💡 Insights & Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900 mb-2">
                Top Spending Category
              </h4>
              <p className="text-sm text-blue-700">
                {analytics.categoryBreakdown[0]?.category || "No data"} accounts
                for{" "}
                {analytics.categoryBreakdown[0]?.percentage.toFixed(1) || "0"}%
                of your spending. You&apos;ve saved $
                {analytics.categoryBreakdown[0]?.totalSavings.toFixed(2) ||
                  "0.00"}{" "}
                in this category.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900 mb-2">
                Savings Opportunity
              </h4>
              <p className="text-sm text-green-700">
                Continue using your business account to maintain your 5%
                discount on all future orders. Every $100 spent saves you $5!
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="font-medium text-purple-900 mb-2">
                Order Frequency
              </h4>
              <p className="text-sm text-purple-700">
                You&apos;ve placed {totalOrders} orders with an average value of
                ${avgOrderValue.toFixed(2)}. Consider bulk ordering to maximize
                efficiency.
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <h4 className="font-medium text-orange-900 mb-2">
                Monthly Trend
              </h4>
              <p className="text-sm text-orange-700">
                {analytics.monthlyData.length > 1
                  ? `Your spending has ${
                      latestMonth &&
                      previousMonth &&
                      latestMonth.totalSpent > previousMonth.totalSpent
                        ? "increased"
                        : "decreased"
                    } compared to last month.`
                  : "Keep tracking your spending to see monthly trends."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
