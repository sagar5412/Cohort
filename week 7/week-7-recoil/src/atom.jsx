import {atom,selector} from "recoil"
import axios from "axios"
export const notificationsAtom = atom({
    key:"notificationsAtom",
    default: selector({
        key:"notificationsAtomSelector",
        get: async ()=>{
            const res = await axios.get("http://localhost:3000/");
            return res.data
        }
    })
})

export const totalNotificationSelector = selector({
    key:"totalNotificationSelector",
    get:({get})=>{
        const allNotification = get(notificationsAtom);
        return allNotification.network + allNotification.jobs + allNotification.messages + allNotification.notification
    }
})