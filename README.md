# Redirect Editor

**Redirect Editor** is a browser extension designed for web development testing and security analysis. It allows you to swap a live website's files (like JavaScript or CSS) with your own local files in real-time, enabling you to test code changes or analyze vulnerabilities without modifying the actual server.

## ⚡ Key Features

* **Real-Time Redirection:** Instantly intercepts network requests and sends them to a new destination.
* **Local File Injection:** Replace live server scripts with local files (via localhost) for debugging.
* **Manifest V3 Compliant:** Built using the modern `declarativeNetRequest` API for high performance and security.
* **Zero Config:** No external proxies or complex software required; works entirely within the browser.

## 🚀 Installation

1.  **Download/Clone** this repository to your local machine.
2.  Open your browser (Chrome, Edge, or Brave) and navigate to `chrome://extensions`.
3.  Enable **Developer Mode** using the toggle switch in the top right corner.
4.  Click the **Load unpacked** button.
5.  Select the folder containing the extension files.

## 🛠️ How to Use

### 1. Set up your local file
To replace a website's file with your own, you need to host your file on a local server (browsers block direct `file://` access for redirects).

Open a terminal in the folder containing your replacement file and run:

```bash
# Python 3
python -m http.server 8000

```

Your file is now accessible at: `http://localhost:8000/your-file.js`

### 2. Create a Redirect Rule

1. Click the **Redirect Editor** extension icon.
2. **Original URL:** Paste the URL of the live file you want to replace (e.g., `https://example.com/main.js`).
3. **Replacement URL:** Paste your local server URL (e.g., `http://localhost:8000/your-file.js`).
4. Click **INJECT RULE**.

### 3. Verify

Refresh the target website. Open **Developer Tools (F12) -> Network Tab**.

* The original file should show a status of **307 Internal Redirect**.
* Your local file should load immediately after with status **200 OK**.

## 🔧 Technical Details

This extension utilizes the **Chrome `declarativeNetRequest` API**. Unlike older blocking methods, this API allows the extension to register static rules that the browser executes efficiently. This approach ensures:

* **Privacy:** The extension does not need to inspect every packet's data.
* **Speed:** Redirects happen at the network layer before the request leaves the browser.

## ⚠️ Disclaimer

This tool is intended for **educational purposes, security research, and authorized testing only**. Always ensure you have permission before analyzing or modifying traffic on websites you do not own.
