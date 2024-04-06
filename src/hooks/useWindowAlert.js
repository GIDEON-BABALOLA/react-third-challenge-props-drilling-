import { useState, useEffect } from "react";
const useWindowAlert = ({ text }) => {
const [windowAlert, setWindowAlert] = useState({
    show : undefined
})
useEffect(() => {
setWindowAlert({
   show : () => {
    alert(text)
   }
})
}, [text])
return windowAlert
}
export default useWindowAlert