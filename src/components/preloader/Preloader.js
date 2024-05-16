import { createContext, useContext, useState } from 'react';
import './preloader.scss';

class PreloaderController {
    constructor({ loading, setLoading }) {
        this.loading = loading;
        this.setLoading = setLoading;
    }
}

export const usePreloader = () => useContext(PreloaderContext);

export function timeoutPreloader(preloader, value, timeout) {
    if (preloader) {
        setTimeout(() => {
            preloader.setLoading(value);
        }, timeout ?? defaultPreloaderTimeout);
    }
}

export const defaultPreloaderTimeout = 400;

export const PreloaderContext = createContext();

export function Preloader({ children, initialLoading = true }) {
    if (!children) {
        throw new Error("Preloader must have a child");
    }

    const [loading, setLoading] = useState(initialLoading);

    const controller = new PreloaderController({ loading, setLoading });

    return (
        <PreloaderContext.Provider value={controller}>
            <div className={loading ? "preloader" : "preloader preloader_hidden"}>
                <div className="preloader__spinner"></div>
            </div>
            {children}
        </PreloaderContext.Provider>
    );
}