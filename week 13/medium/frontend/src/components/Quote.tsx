export const Quote = () => {
    return <div className="bg-slate-200 h-screen flex justify-center items-center">
        <div className="p-4">
            <blockquote className="border-l-4 border-slate-500 pl-4 italic text-3xl font-bold">
                "The only limit to our realization of tomorrow will be our doubts of today."
            </blockquote>
            <cite className="block mt-2 text-right font-semibold">- Franklin D. Roosevelt</cite>
        </div>
    </div>;
}