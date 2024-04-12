import React, { useState, useEffect } from 'react';
const Footer = ()=>{
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        function handleScroll() {
            const isScrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
            setIsVisible(isScrolledToBottom);
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return(
        <div>
            {isVisible && 
            <div className="fixed bottom-0 w-full bg-green-600 py-2 flex flex-col justify-center items-center">
                <p className=" text-white ">Tao's mini project. Updated on 2024-04-10.</p>
            </div>
            } 
        </div>
    )
}

export default Footer;