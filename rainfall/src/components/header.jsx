import { useEffect, useRef, useState } from "react";
import './header.css';

const Header = () => {
    const [rainCount] = useState(60);
    const [animationTiming] = useState(7);
    let header = useRef(null);

    useEffect(() => {
        for(let index = 0; index < rainCount; index++) {
            // Create Element
            let i = document.createElement('i');

            // Calculations
            let sizeX = Math.random() * 2 + 1;
            let sizeY = Math.random() * 100 + 100;
            let delay = Math.random() * 20;
            let posX = Math.floor(Math.random() * window.innerWidth);

            // Adding style
            i.classList.add('rain');
            i.style.width = 1 + sizeX + `px`;
            i.style.height = 0.2 + sizeY + `px`;
            i.style.left = posX + `px`;
            i.style.animationDelay = delay + `s`;
            i.style.animationDuration = animationTiming + `s`;

            header.current?.appendChild(i);
        }
    }, [rainCount, animationTiming]);

    return (
        <div className="header" ref={header}></div>
    );
}

export default Header;
