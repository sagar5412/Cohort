export function Balance({ balance }) {
  return (
    <div className="w-full h-14 flex flex-row">
      <div className="flex justify-center items-center pl-8 mr-4 font-bold text-lg">
        Your Balance
      </div>
      <div className="flex justify-center items-center font-semibold text-lg">
        Rs {balance}
      </div>
    </div>
  );
}
