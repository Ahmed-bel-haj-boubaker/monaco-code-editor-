import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { motion } from "framer-motion";

const MonacoCodeRunner = () => {
  const [activeTab, setActiveTab] = useState("html");
  const [html, setHtml] = useState("<h1>Hello World!</h1>");
  const [css, setCss] = useState("h1 { color: red; }");
  const [js, setJs] = useState("console.log('Hello World!');");
  const [srcDoc, setSrcDoc] = useState("");
  const [error, setError] = useState("");
  const [isCorrect, setIsCorrect] = useState(null); // To track if code is correct

  // Correct code for comparison
  const correctHtml = "<h1>Welcome to the Code Playground</h1>";
  const correctCss = "h1 { color: green; }";
  const correctJs = "console.log('Hello World!');";

  const compareCode = () => {
    let errorMessages = [];
    if (html !== correctHtml) {
      errorMessages.push("HTML code does not match the correct solution.");
    }
    if (css !== correctCss) {
      errorMessages.push("CSS code does not match the correct solution.");
    }
    if (js !== correctJs) {
      errorMessages.push("JavaScript code does not match the correct solution.");
    }
    return errorMessages;
  };

  const runCode = () => {
    const errors = compareCode();
    if (errors.length > 0) {
      setError(errors.join(" "));
      setSrcDoc(""); // Clear the output if there's an error
      setIsCorrect(false); // Set code status to incorrect
    } else {
      setError(""); // Clear any previous errors
      setIsCorrect(true); // Set code status to correct
      try {
        setSrcDoc(`
          <html>
            <body>${html}</body>
            <style>${css}</style>
            <script>${js}</script>
          </html>
        `);
      } catch (err) {
        setError(err.message);
        setIsCorrect(false);
      }
    }
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

      <div className="flex flex-col md:flex-row flex-grow overflow-hidden gap-4 p-5">
        <motion.div
          className="w-full md:w-1/5 bg-white text-black font-bold font-[poppins] backdrop-blur-lg rounded-xl shadow-lg p-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-lg font-semibold">Task:</h2>
          <p className="mt-2">
            Create an HTML element with a green heading that says 'Welcome to the Code Playground'.
          </p>
        </motion.div>

        <motion.div
          className="flex-grow flex flex-col gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex bg-gray-800 text-white rounded-t-lg">
            <button
              onClick={() => setActiveTab("html")}
              className={`flex-1 text-center py-3 px-4 transition-all duration-300 ${
                activeTab === "html"
                  ? "bg-blue-600"
                  : "hover:bg-gray-700 bg-gray-800"
              }`}
            >
              HTML
            </button>
            <button
              onClick={() => setActiveTab("css")}
              className={`flex-1 text-center py-3 px-4 transition-all duration-300 ${
                activeTab === "css"
                  ? "bg-green-600"
                  : "hover:bg-gray-700 bg-gray-800"
              }`}
            >
              CSS
            </button>
            <button
              onClick={() => setActiveTab("js")}
              className={`flex-1 text-center py-3 px-4 transition-all duration-300 ${
                activeTab === "js"
                  ? "bg-yellow-600"
                  : "hover:bg-gray-700 bg-gray-800"
              }`}
            >
              JavaScript
            </button>
          </div>

          <motion.div
            className="flex-grow bg-white/10 backdrop-blur-lg rounded-b-xl p-4 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {renderEditor()}
          </motion.div>
        </motion.div>

        <motion.div
          className="w-full md:w-2/5 flex flex-col gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="bg-white backdrop-blur-lg rounded-xl p-4 shadow-lg flex-grow">
            <iframe
              srcDoc={srcDoc}
              title="Output"
              sandbox="allow-scripts"
              frameBorder="0"
              width="100%"
              height="100%"
              className="rounded-xl shadow-xl"
            />
          </div>
          {error && (
            <div className="bg-red-600 text-white p-4 rounded-xl shadow-lg">
              <h2 className="font-bold">Error:</h2>
              <pre className="mt-2">{error}</pre>
            </div>
          )}
          {isCorrect === true && (
            <div className="bg-green-600 text-white p-4 rounded-xl shadow-lg">
              <h2 className="font-bold">Success!</h2>
              <p>Your code is correct.</p>
            </div>
          )}
          {isCorrect === false && !error && (
            <div className="bg-red-600 text-white p-4 rounded-xl shadow-lg">
              <h2 className="font-bold">Incorrect Code</h2>
              <p>There are errors in your code. Please review and try again.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MonacoCodeRunner;
