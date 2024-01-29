import { useCallback } from "react";
import { useState } from "react";

export function useOpenController(initialState){
    const [isOpen, setIsOpen] = useState(initialState);

    const toggle = useCallback(()=>{
        setIsOpen((state)=> !state)
    },[setIsOpen])
    return{isOpen, toggle};
}