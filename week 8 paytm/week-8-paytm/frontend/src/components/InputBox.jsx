export function InputBox({label, placeholder,onChange}){
    return <div className="pb-4">
        <div className="text-sm font-bold text-left py-2 fon">{label}</div>
        <input type="text" placeholder={placeholder} onChange={onChange} className="w-full px-2 py-1 border rounded border-slate-200"/>
    </div>
}