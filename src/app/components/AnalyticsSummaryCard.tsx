interface AnalyticsSummaryCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color?: "blue" | "green" | "purple" | "orange";
}

export default function AnalyticsSummaryCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  color = "blue",
}: AnalyticsSummaryCardProps) {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-200",
    green: "bg-green-50 border-green-200",
    purple: "bg-purple-50 border-purple-200",
    orange: "bg-orange-50 border-orange-200",
  };

  const iconColorClasses = {
    blue: "text-blue-600",
    green: "text-green-600",
    purple: "text-purple-600",
    orange: "text-orange-600",
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border-2 ${colorClasses[color]} p-6`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          {trend && (
            <div className="flex items-center mt-2">
              <span
                className={`text-sm font-medium ${
                  trend.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {trend.isPositive ? "↗" : "↘"} {trend.value}
              </span>
              <span className="text-sm text-gray-500 ml-1">vs last month</span>
            </div>
          )}
        </div>
        <div className={`text-3xl ${iconColorClasses[color]}`}>{icon}</div>
      </div>
    </div>
  );
}
