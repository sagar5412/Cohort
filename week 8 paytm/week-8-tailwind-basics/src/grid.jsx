export function Grid(){
    return (
    <div>
      <div className="grid grid-cols-12 md:grid-cols-3">
        {/* <div className="bg-blue-500">Hi</div>
        <div className="bg-red-500">Hi</div>
        <div className="bg-yellow-500">Hi</div> */}
        <div className="bg-yellow-500 col-span-5 text-start sm:text-center">Hi</div>
        <div className="bg-red-500 col-span-5">Hi</div>
        <div className="bg-blue-500 col-span-2">Hi</div>
        {/* sm - breakpoints for responsiveness */}
      </div>
    </div>
  )
}