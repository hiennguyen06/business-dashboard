import { SavingsData } from "@/types";

interface SavingsChartProps {
  data: SavingsData[];
}

export default function SavingsChart({ data }: SavingsChartProps) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Savings Over Time
        </h3>
        <div className="text-center py-8 text-gray-500">
          <p>No savings data available yet.</p>
        </div>
      </div>
    );
  }

  const maxSavings = Math.max(...data.map((d) => d.cumulativeSavings));

  const formatDate = (dateString: string) => {
    const [year, month] = dateString.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Cumulative Savings Over Time
        </h3>
        <div className="text-sm text-gray-500">
          5% Business Account Discount
        </div>
      </div>

      <div className="space-y-4">
        {data.map((item) => {
          const barHeight =
            maxSavings > 0 ? (item.cumulativeSavings / maxSavings) * 100 : 0;

          return (
            <div key={item.date} className="flex items-center space-x-4">
              <div className="w-20 text-sm text-gray-600 text-right">
                {formatDate(item.date)}
              </div>
              <div className="flex-1 relative">
                <div className="bg-gray-200 rounded-full h-8 relative overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-green-400 to-green-600 h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${barHeight}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-700">
                      ${item.cumulativeSavings.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-20 text-sm text-gray-500">
                +${item.monthlySavings.toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Monthly Savings</span>
          <span>Cumulative Total</span>
        </div>
      </div>
    </div>
  );
}
