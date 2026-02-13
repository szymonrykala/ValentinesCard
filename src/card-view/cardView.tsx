import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { useCardData } from "../hooks";


function moveButtonRandomly(button: HTMLButtonElement) {
    const parentRect = button.parentElement?.parentElement?.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    if (!parentRect) return;

    const maxX = parentRect.width - buttonRect.width;
    const maxY = parentRect.height - buttonRect.height;

    let randomX = Math.random() * maxX;
    let randomY = Math.random() * maxY;

    console.log(randomX, randomY)

    if (button.style.position !== "absolute") {
        button.style.position = "absolute"
    }

    button.style.top = `${randomX}px`;
    button.style.left = `${randomY}px`;
}


export default function CardView() {
    const navigate = useNavigate();
    const location = useLocation();
    const [cardData,] = useCardData();
    const buttonRef = useRef<HTMLButtonElement>(null);


    function handleMouseEnterButton() {
        if (buttonRef.current) {
            moveButtonRandomly(buttonRef.current);
        }
    }

    function handleYesButtonClick() {
        navigate("/thank-you" + location.search)
    }

    useEffect(() => {
        // if no data passed, then navigate back to creator
        if (cardData === null) navigate("/");
    }, [cardData, navigate])


    return cardData === null ? <>error happened</> : (

        <div className="rounded-md flex flex-col gap-1 md:gap-4 text-center relative items-center justify-between h-full">
            <span></span>
            <h1 className="text-5xl md:text-7xl text-primary font-bold font-pretty">{cardData.name}</h1>

            <h2 className="text-xl md:text-3xl text-primary-dark font-pretty">{cardData.question}</h2>

            <div className="question-gif-1 h-50 md:h-70 self-stretch"></div>

            <div className="flex flex-row justify-between max-w-100 w-4/5 pb-4">
                <button className="button button--green" onClick={handleYesButtonClick}>TAK</button>

                <button ref={buttonRef}
                    onMouseEnter={handleMouseEnterButton}
                    onClick={handleMouseEnterButton}
                    className="button button--red">NIE</button>
            </div>
        </div>
    )
}
