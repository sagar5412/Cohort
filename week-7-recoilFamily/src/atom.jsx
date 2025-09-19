import {atom, atomFamily,selectorFamily} from "recoil"
import axios from "axios"
// import {TODOS} from "./todos"
// export const todoAtom = atomFamily({
//     key:"todoAtom",
//     default: id=>{
//         return TODOS.find(x=> x.id==id)
//     }
// })

export const todoAtom = atomFamily({
    key:"todoAtom",
    default:selectorFamily({
        key:"todoAtomSelector",
        get: (id) => async ()=>{
            const res = await axios.get("http://localhost:3000/?id="+id);
            return res.data
        }
    })
})