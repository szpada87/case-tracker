import { useEffect, useRef, useState } from "react";

export default (value: any, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    const timerRef = useRef<number>();

    useEffect(() => {
        timerRef.current = setTimeout(() => setDebouncedValue(value), delay);

        return () => {
            clearTimeout(timerRef.current);
        };
    }, [value, delay]);

    return debouncedValue;
};