import { MonthlySpending } from "@/types";

interface MonthlySpendingTableProps {
  monthlyData: MonthlySpending[];
}

export default function MonthlySpendingTable({
  monthlyData,
}: MonthlySpendingTableProps) {
  if (monthlyData.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Monthly Spending Summary
        </h3>
        <div className="text-center py-8 text-gray-500">
          <p>No monthly data available yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Monthly Spending Summary
      </h3>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Month
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Orders
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Spent
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Savings
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Avg per Order
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {monthlyData.map((month) => {
              const avgPerOrder =
                month.orderCount > 0 ? month.totalSpent / month.orderCount : 0;

              return (
                <tr
                  key={`${month.year}-${month.month}`}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {month.month} {month.year}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {month.orderCount}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${month.totalSpent.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-green-600">
                      ${month.totalSavings.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500">5% discount</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ${avgPerOrder.toFixed(2)}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">
              {monthlyData.reduce((sum, month) => sum + month.orderCount, 0)}
            </p>
            <p className="text-sm text-gray-600">Total Orders</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">
              $
              {monthlyData
                .reduce((sum, month) => sum + month.totalSpent, 0)
                .toFixed(2)}
            </p>
            <p className="text-sm text-gray-600">Total Spent</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              $
              {monthlyData
                .reduce((sum, month) => sum + month.totalSavings, 0)
                .toFixed(2)}
            </p>
            <p className="text-sm text-gray-600">Total Saved</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">
              $
              {monthlyData.length > 0
                ? (
                    monthlyData.reduce(
                      (sum, month) => sum + month.totalSpent,
                      0
                    ) /
                    monthlyData.reduce(
                      (sum, month) => sum + month.orderCount,
                      0
                    )
                  ).toFixed(2)
                : "0.00"}
            </p>
            <p className="text-sm text-gray-600">Avg per Order</p>
          </div>
        </div>
      </div>
    </div>
  );
}
