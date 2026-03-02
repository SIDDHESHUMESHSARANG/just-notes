import { useState, useEffect } from "react";
import { MoonStar, SunMedium } from "lucide-react";

const ThemeSwitcher = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "valentine");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "valentine" ? "forest" : "valentine");
    };

    return (
        <button
            onClick={toggleTheme}
            className="btn btn-neutral btn-circle"
        >
            {theme === "forest" ? <MoonStar size={20} /> : <SunMedium size={20} />}
        </button>
    );
};

export default ThemeSwitcher;
