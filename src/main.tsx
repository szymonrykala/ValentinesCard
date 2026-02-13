import { StrictMode, useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Outlet, useLocation } from "react-router";
import './index.css'
import { Fireworks } from '@fireworks-js/react'
import type { FireworksHandlers } from '@fireworks-js/react'

import Creator from "./creator/creator";
import CardView from "./card-view/cardView";
import ThanksPage from './thanks/thanks';

import { Toaster } from 'react-hot-toast';


function Layout() {
    const fireworksRef = useRef<FireworksHandlers>(null);
    const location = useLocation();

    function startFireworks() {
        document.documentElement.style
            .setProperty('--fireworks-bg-color', 'rgba(0, 0, 0, 0.8)');

        fireworksRef.current?.start();
    }

    useEffect(() => {
        if (location.pathname !== "/thank-you") {
            fireworksRef.current?.stop();
            fireworksRef.current?.clear();
            document.documentElement.style
                .setProperty('--fireworks-bg-color', 'rgba(0, 0, 0, 0.0)');
        }

    }, [fireworksRef, location])

    return (
        <div className="min-h-screen h-screen min-w-screen bg-hearts-1 flex items-center justify-center">
            <Toaster
                containerClassName="pointer-events-auto touch-manipulation z-100"
                toastOptions={{
                    className: "pointer-events-auto touch-manipulation z-100"
                }}
            />
            <Fireworks
                ref={fireworksRef}
                options={{
                    opacity: 0.5,
                    intensity: 70,
                    explosion: 10,
                    acceleration: 1
                }}
                style={{
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    position: 'fixed',
                    background: 'var(--fireworks-bg-color)',
                    transition: 'background-color 0.5s ease-out',
                    zIndex: 10,
                }}
            />
            <div className="z-15 magic-border-1 drop-shadow-xl drop-shadow-[rgba(190,169,149)] max-w-200 h-7/10 w-10/12">
                <div className="p-5 sm:p-10 md:px-15 lg: py-10 lg:px-20 xl:px-25 paper-texture-1 h-full w-full">
                    <Outlet context={[startFireworks]} />
                </div>
            </div>
            <p className='z-5 fixed left-2 bottom-1 text-primary'>
                &copy; Szymon Rykała 2026
            </p>
        </div>
    )
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Creator />} />
                    <Route path="card" element={<CardView />} />
                    <Route path="thank-you" element={<ThanksPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
