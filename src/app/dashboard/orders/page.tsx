export default function OrderHistoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Order History</h1>
        <p className="mt-2 text-gray-600">
          View and manage your past orders and track their status.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Order History Coming Soon
          </h3>
          <p className="text-gray-600">
            This section will display your order history, tracking information,
            and allow you to reorder items.
          </p>
        </div>
      </div>
    </div>
  );
}
