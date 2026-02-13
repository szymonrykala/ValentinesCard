import { useEffect } from "react";
import { useOutletContext } from "react-router-dom"
import { useCardData } from "../hooks";


export default function ThanksPage() {
    const [startCelebrate,] = useOutletContext() as [() => void,]
    const [cardData,] = useCardData();

    useEffect(() => {
        startCelebrate();
    }, [startCelebrate]);

    return (
        <div className="flex flex-col justify-between gap-3 items-center h-full w-full">
            <div className="thanks-gif-1 h-7/10 w-full"></div>
            <h1
                className="text-4xl md:text-4xl lg:text-5xl text-primary font-pretty font-bold text-center"
            >
                {cardData?.thanks}
            </h1>

            <p className="charm-font-italic text-gray-500 lg:text-xl">
                {cardData.signature}
            </p>

        </div>
    )
}