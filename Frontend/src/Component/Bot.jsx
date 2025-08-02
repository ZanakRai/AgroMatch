import { useEffect } from "react";

function Bot() {
    const loadBotScripts = () => {
        // Load the first script (Botpress Web Chat)
        const botpressScript = document.createElement('script');
        botpressScript.src = 'https://cdn.botpress.cloud/webchat/v2.2/inject.js';
        botpressScript.async = true;
        document.body.appendChild(botpressScript);

        // Load the second script (Custom script)
        const customScript = document.createElement('script');
        customScript.src = 'https://files.bpcontent.cloud/2025/01/29/02/20250129024227-YKVO7TI1.js';
        customScript.async = true;
        document.body.appendChild(customScript);

        // Cleanup the scripts on unmount to avoid memory leaks
        return () => {
            document.body.removeChild(botpressScript);
            document.body.removeChild(customScript);
        };
    };

    useEffect(loadBotScripts, []);

    return <div></div>;
}

export default Bot;


