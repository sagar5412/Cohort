export function RevenueCard({ title, amount, orderCount }) {
  return (
    <div className="bg-white rounded shadow-md p-4">
      <div className="text-gray-700 flex">{title}</div>
      <div className="flex justify-between">
        <div>₹ {amount}</div>
        <div>
          {orderCount ? (
            <div className="flex cursor-pointer underline font-medium flex-row justify-between">
              <div className="text-blue-700">{orderCount} order(s)</div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
