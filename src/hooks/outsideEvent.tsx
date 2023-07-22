import {useEffect, MutableRefObject} from "react";

export const useOutsideEvent = (ref: MutableRefObject<HTMLElement|undefined>, callback: Function) => {
    useEffect(() => {
        const handleClickOutside = (event: Event) => {
            const target = event.target as HTMLElement
            if (ref && ref.current && !ref.current.contains(target)) {
                callback()
            }
        }
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}