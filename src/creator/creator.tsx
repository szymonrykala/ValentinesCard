import { useNavigate } from "react-router-dom";
import { useCardData } from "../hooks";
import toast from 'react-hot-toast';


const copyFallback = (text: string) => {
    const textarea = document.createElement("textarea")
    textarea.value = text
    textarea.style.position = "fixed"
    textarea.style.opacity = "0"

    document.body.appendChild(textarea)
    textarea.focus()
    textarea.select()

    document.execCommand("copy")
    document.body.removeChild(textarea)
}


function showCopyBanner(valueToCopy: string) {
    function handleClick() {
        try {
            navigator.clipboard.writeText(valueToCopy)
            toast.success("Gotowe!", { id: "copied-success" })
        } catch (e) {
            copyFallback(valueToCopy)
            toast.success("Gotowe!", { id: "copied-success" })
        }
    }

    const message = <div className="flex z-100" >
        <button
            onClick={handleClick}
            onTouchEnd={handleClick}
            className="text-primary cursor-pointer hover:text-primary-dark"
        >
            Kopiuj link
        </button>
        &nbsp;i wyślij
    </div>

    toast(message, {
        icon: '🔗',
        ariaProps: {
            role: 'status',
            'aria-live': 'polite',
        },
    })
}

export default function Creator() {
    const navigate = useNavigate();
    const [, setCardData] = useCardData()

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const path = "/card" + setCardData(data)
        showCopyBanner(window.location.host + path)
        // navigate(path);
    }

    return (
        <div className="flex flex-col gap-2 h-full">
            <h1 className="text-center text-gray-400">
                Stwórz kartkę walentynkową
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col justify-between h-full">
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="imię"
                    required
                    className="text-5xl md:text-6xl p-3 text-primary charm-font font-bold"
                />
                <textarea
                    rows={2}
                    name="question"
                    id="question"
                    className="text-xl text-primary-dark charm-font"
                    placeholder="No zapytaj czy będzie walentynką"
                    defaultValue={"💝Zostaniesz moją walentynką?💝"}
                    required
                >
                </textarea>
                <textarea
                    name="thanks"
                    id="thanks"
                    className="text-xl text-primary-dark charm-font"
                    placeholder="Napisz podziękowania"
                    required
                >
                </textarea>

                <input
                    required
                    type="text"
                    name="signature"
                    id="signature"
                    placeholder="Podpis..."
                    className="italic w-fit self-end charm-font-italic text-gray-500"
                />
                <button
                    type="submit"
                    className="button2 self-center text-sm"
                >
                    Stwórz kartkę
                </button>

            </form>
        </div>
    )
}