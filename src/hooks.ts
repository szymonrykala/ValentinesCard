import { useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";


export function useCardData() {
    const params = useParams()
    const navigate = useNavigate()

    const location = useLocation()

    const data = useMemo(() => {
        const data64 = params.card;
        if (data64 === undefined) return null;

        const data = JSON.parse(
            decodeURIComponent(
                atob(data64)
            )
        );

        console.debug(data)
        return data;
    }, [params, location.pathname])


    function goToCardView(data: Record<string, string>) {
        const data64 = btoa(
            encodeURIComponent(
                JSON.stringify(data)
            )
        );

        // open card view at /:card
        navigate(data64)
    }

    return [data, goToCardView]
}