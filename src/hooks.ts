import { useMemo } from "react";
import { useLocation, useSearchParams } from "react-router-dom";


export function useCardData() {
    const [params, setParams] = useSearchParams()
    const location = useLocation()

    const data = useMemo(() => {
        const data64 = params.get("card");
        console.debug("card parameter", data64);

        if (data64 === null) return null;

        const data = JSON.parse(
            decodeURIComponent(
                atob(data64)
            )
        );

        console.debug(data)
        return data;
    }, [params, location.pathname])


    function setCardData(data: Record<string, string>) {
        const data64 = btoa(
            encodeURIComponent(
                JSON.stringify(data)
            )
        );
        setParams((prev) => ({ ...prev, card: data64 }));
        return `?card=${data64}`;
    }

    return [data, setCardData]
}