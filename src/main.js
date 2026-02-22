function isLogin() {
    const data = localStorage.getItem("userid");
    if (data != null) {
        return true;
    }
    return false;
}

async function getIPFromCip() {
    try {
        // Note: cip.cc might require a specific header or proxy in some browser environments
        const response = await fetch('https://cip.cc', {
            headers: { 'User-Agent': 'curl/7.81.0' } // Simulate curl to get text
        });
        const text = await response.json();
        console.log(text);
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

function getUserId() {
    if (!isLogin()) {
        return null;
    }

    return localStorage.getItem("userid");
}

function getCurrentFormattedTime() {
    const now = new Date();

    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const year = String(now.getFullYear()).slice(-2); // Get last 2 digits of year

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
}

async function getIP() {
    try {
        // We use the text-only endpoint which is less likely to have format issues
        const response = await fetch('https://api.ipify.org'); 
        
        if (!response.ok) throw new Error("Network offline");

        // Use .text() instead of .json() to avoid "JSON.parse" errors
        const ipText = await response.text();
        
        console.log("Success! IP is:", ipText);
        return ipText.trim(); // .trim() removes any hidden spaces or newlines
        
    } catch (error) {
        alert("Poor network condition! Failed to get ip address.");
        console.error("IP Fetch Error:", error);
        return "127.0.0.1 (Offline)";
    }
}
