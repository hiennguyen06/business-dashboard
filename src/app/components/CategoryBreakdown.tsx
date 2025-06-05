import { CategorySpending } from "@/types";

interface CategoryBreakdownProps {
  categories: CategorySpending[];
}

export default function CategoryBreakdown({
  categories,
}: CategoryBreakdownProps) {
  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      "Office Supplies": "📄",
      "Writing Supplies": "✏️",
      Filing: "📁",
      Presentation: "📊",
      "Printer Supplies": "🖨️",
      Organization: "📦",
      "Office Equipment": "⚙️",
      Uncategorized: "📋",
    };
    return icons[category] || "📋";
  };

  const getCategoryColor = (index: number) => {
    const colors = [
      "bg-blue-100 text-blue-800",
      "bg-green-100 text-green-800",
      "bg-purple-100 text-purple-800",
      "bg-orange-100 text-orange-800",
      "bg-pink-100 text-pink-800",
      "bg-indigo-100 text-indigo-800",
      "bg-yellow-100 text-yellow-800",
      "bg-gray-100 text-gray-800",
    ];
    return colors[index % colors.length];
  };

  if (categories.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Spending by Category
        </h3>
        <div className="text-center py-8 text-gray-500">
          <p>No category data available yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Spending by Category
      </h3>

      <div className="space-y-4">
        {categories.map((category, index) => (
          <div
            key={category.category}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="text-2xl">
                {getCategoryIcon(category.category)}
              </div>
              <div>
                <h4 className="font-medium text-gray-900">
                  {category.category}
                </h4>
                <div className="flex items-center space-x-2 mt-1">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                      index
                    )}`}
                  >
                    {category.percentage.toFixed(1)}% of total
                  </span>
                  <span className="text-sm text-gray-500">
                    {category.orderCount} order
                    {category.orderCount !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-gray-900">
                ${category.totalSpent.toFixed(2)}
              </p>
              <p className="text-sm text-green-600 font-medium">
                ${category.totalSavings.toFixed(2)} saved
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">
            Total across all categories
          </span>
          <div className="text-right">
            <p className="text-lg font-semibold text-gray-900">
              $
              {categories
                .reduce((sum, cat) => sum + cat.totalSpent, 0)
                .toFixed(2)}
            </p>
            <p className="text-sm text-green-600 font-medium">
              $
              {categories
                .reduce((sum, cat) => sum + cat.totalSavings, 0)
                .toFixed(2)}{" "}
              saved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
