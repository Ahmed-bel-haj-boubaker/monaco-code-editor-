import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { motion } from "framer-motion";

const MonacoCodeRunner = () => {
  const [activeTab, setActiveTab] = useState("html");
  const [html, setHtml] = useState("<h1>Hello World!</h1>");
  const [css, setCss] = useState("h1 { color: red; }");
  const [js, setJs] = useState("console.log('Hello World!');");
  const [srcDoc, setSrcDoc] = useState("");

  const runCode = () => {
    setSrcDoc(`
      <html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}</script>
      </html>
    `);
  };

  const renderEditor = () => {
    switch (activeTab) {
      case "html":
        return (
          <Editor
            height="100%"
            language="html"
            value={html}
            onChange={(value) => setHtml(value)}
            theme="vs-dark"
            options={{ minimap: { enabled: false } }}
            className="shadow-xl border rounded-lg"
          />
        );
      case "css":
        return (
          <Editor
            height="100%"
            language="css"
            value={css}
            onChange={(value) => setCss(value)}
            theme="vs-dark"
            options={{ minimap: { enabled: false } }}
            className="shadow-xl border rounded-lg"
          />
        );
      case "js":
        return (
          <Editor
            height="100%"
            language="javascript"
            value={js}
            onChange={(value) => setJs(value)}
            theme="vs-dark"
            options={{ minimap: { enabled: false } }}
            className="shadow-xl border rounded-lg"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <motion.div
        className="flex justify-between items-center p-4 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-2xl font-bold text-white">Code Playground</h1>
        <motion.button
          onClick={runCode}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Run Code
        </motion.button>
      </motion.div>

      <div className="flex flex-col md:flex-row flex-grow overflow-hidden gap-4">
        <motion.div
          className="flex md:flex-col bg-white/10 backdrop-blur-lg rounded-xl shadow-lg md:w-1/5"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <button
            onClick={() => setActiveTab("html")}
            className={`flex-1 text-center py-4 px-6 transition-all duration-300 ${
              activeTab === "html"
                ? "bg-gradient-to-r from-yellow-400 to-yellow-600"
                : "hover:bg-white/20 bg-transparent"
            } text-white font-semibold rounded-t-lg md:rounded-none md:rounded-tl-lg`}
          >
            HTML
          </button>
          <button
            onClick={() => setActiveTab("css")}
            className={`flex-1 text-center py-4 px-6 transition-all duration-300 ${
              activeTab === "css"
                ? "bg-gradient-to-r from-green-400 to-green-600"
                : "hover:bg-white/20 bg-transparent"
            } text-white font-semibold`}
          >
            CSS
          </button>
          <button
            onClick={() => setActiveTab("js")}
            className={`flex-1 text-center py-4 px-6 transition-all duration-300 ${
              activeTab === "js"
                ? "bg-gradient-to-r from-blue-400 to-blue-600"
                : "hover:bg-white/20 bg-transparent"
            } text-white font-semibold rounded-b-lg md:rounded-none md:rounded-bl-lg`}
          >
            JavaScript
          </button>
        </motion.div>

        <motion.div
          className="flex-grow p-4 bg-white/10 backdrop-blur-lg rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {renderEditor()}
        </motion.div>

        <motion.div
          className="w-full md:w-2/5 bg-white  backdrop-blur-lg rounded-xl p-4 shadow-lg"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <iframe
            srcDoc={srcDoc}
            title="Output"
            sandbox="allow-scripts"
            frameBorder="0"
            width="100%"
            height="100%"
            className="rounded-xl shadow-xl"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default MonacoCodeRunner;
