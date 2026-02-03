'use client';

import { useEffect } from 'react';

function MySpinner() {
    useEffect(() => {
        // Disable scrolling when spinner is shown
        document.body.style.overflow = 'hidden';

        // Re-enable scrolling when spinner is removed
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div
            className="fixed inset-0 w-screen h-screen 
            flex items-center justify-center bg-slate-200/20 z-50 backdrop-blur-sm">
            <div className="loader"></div>
        </div>
    );
}

export default MySpinner;