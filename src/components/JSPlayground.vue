<template>
  <div class="js-playground-container">
    <h2 class="title-div"><em>JavaScript Playground</em></h2>

    <div class="grid-layout">
      <div class="code-input-section">
        <label for="jsCode" class="label-style">Enter JavaScript Code:</label>
        <textarea id="jsCode" v-model="code" rows="14" class="code-textarea"
          placeholder="console.log('Hello, Vue!');"></textarea>
        <button @click="runCode" class="run-button" :disabled="isRunning">
          <svg v-if="isRunning" class="spinner-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
          {{ isRunning ? 'Running...' : 'Run Code' }}
        </button>
      </div>

      <div class="output-section">
        <label for="output" class="label-style">Output / Console:</label>
        <pre id="output" class="output-pre custom-scrollbar-thin">
          <template v-for="(line, index) in outputLines" :key="index">
            <span :class="line.type === 'error' ? 'output-error' : (line.type === 'log' ? 'output-log' : 'output-default')">
              {{ line.message }}
            </span><br v-if="index < outputLines.length - 1">
          </template>
<span v-if="outputLines.length === 0" class="output-placeholder">Output will appear here...</span>
</pre>
        <button @click="clearOutput" class="clear-button" :disabled="outputLines.length === 0">
          Clear Output
        </button>
      </div>
    </div>

    <div class="info-section">
      <h3 class="info-heading">How to Use:</h3>
      <ul class="info-list">
        <li>Write your JavaScript code in the left panel.</li>
        <li>Click "<strong class="info-strong">Run Code</strong>" to execute it.</li>
        <li>Output, including <code class="code-highlight code-log">console.log()</code>, <code
            class="code-highlight code-error">console.error()</code>, and return values of expressions, will appear in
          the
          right panel.</li>
        <li>Async operations (e.g., <code class="code-highlight">setTimeout</code>, <code
            class="code-highlight">Promises</code>) are supported.</li>
      </ul>
      <h3 class="info-heading info-heading-mt">Notes:</h3>
      <ul class="info-list">
        <li>The code is executed in a sandboxed environment. Direct DOM manipulation of the main page is not possible.
        </li>
        <li>For security, avoid running untrusted code.</li>
        <li>The last expression's value will be displayed if it's not a <code class="code-highlight">console</code>
          call.
        </li>
      </ul>
    </div>

  </div>
</template>

<script setup lang="js">
import { ref } from 'vue';

// Reactive variable for the JavaScript code input
const code = ref("console.log('Hello from the JS Playground!');\n\n// Try an expression:\n5 + 5");

// Reactive variable for storing output lines (message and type)
const outputLines = ref([]);

// Reactive variable to track if code is currently running
const isRunning = ref(false);

// Function to execute the user's code
const runCode = async () => {
  if (isRunning.value) return;
  isRunning.value = true;

  // Store current console methods
  const originalConsoleLog = console.log;
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;
  const originalConsoleInfo = console.info;
  const originalConsoleDebug = console.debug;

  // Buffer for logs during this execution
  const currentRunLogs = [];

  // Override console methods to capture logs
  console.log = (...args) => {
    currentRunLogs.push({ type: 'log', message: args.map(arg => formatArgument(arg)).join(' ') });
    originalConsoleLog.apply(console, args); // Also log to the browser's console
  };
  console.error = (...args) => {
    currentRunLogs.push({ type: 'error', message: args.map(arg => formatArgument(arg)).join(' ') });
    originalConsoleError.apply(console, args);
  };
  console.warn = (...args) => {
    currentRunLogs.push({ type: 'warn', message: `⚠️ ${args.map(arg => formatArgument(arg)).join(' ')}` });
    originalConsoleWarn.apply(console, args);
  };
  console.info = (...args) => {
    currentRunLogs.push({ type: 'info', message: `ℹ️ ${args.map(arg => formatArgument(arg)).join(' ')}` });
    originalConsoleInfo.apply(console, args);
  };
  console.debug = (...args) => {
    currentRunLogs.push({ type: 'debug', message: `🐞 ${args.map(arg => formatArgument(arg)).join(' ')}` });
    originalConsoleDebug.apply(console, args);
  };

  try {
    // Use an async function constructor to allow top-level await
    const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;
    const userFunction = new AsyncFunction(code.value);
    const result = await userFunction();

    // Display the result of the last expression if it's not undefined and not logged by console
    if (result !== undefined) {
      // Check if the result itself was the last thing logged by a console method.
      // This is a heuristic and might not be perfect.
      const lastLog = currentRunLogs.length > 0 ? currentRunLogs[currentRunLogs.length - 1].message : null;
      const resultString = formatArgument(result);
      // Only add result if it's not already captured by a console.log, or if it's the only output
      if (currentRunLogs.length === 0 || lastLog !== resultString) {
        currentRunLogs.push({ type: 'result', message: `↪️ ${resultString}` });
      }
    }
  } catch (error) {
    currentRunLogs.push({ type: 'error', message: `❌ Error: ${error.name} - ${error.message}\n${error.stack ? error.stack.split('\n').slice(0, 3).join('\n') : ''}` });
  } finally {
    // Restore original console methods
    console.log = originalConsoleLog;
    console.error = originalConsoleError;
    console.warn = originalConsoleWarn;
    console.info = originalConsoleInfo;
    console.debug = originalConsoleDebug;

    // Append logs from this run to the main output
    outputLines.value.push(...currentRunLogs);
    isRunning.value = false;
  }
};

// Helper function to format arguments for display
const formatArgument = (arg) => {
  if (typeof arg === 'string') {
    return arg;
  }
  if (typeof arg === 'object' && arg !== null) {
    try {
      return JSON.stringify(arg, null, 2);
    } catch (e) {
      return String(arg); // Fallback for circular structures or other stringify errors
    }
  }
  if (typeof arg === 'function') {
    return `[function ${arg.name || '(anonymous)'}]`;
  }
  // Handle Symbol and BigInt explicitly if needed, otherwise String(arg) is a good fallback
  return String(arg);
};

// Function to clear the output
const clearOutput = () => {
  outputLines.value = [];
};

</script>

<style scoped>
/* Base styles */
.js-playground-container {
  padding: 1.5rem;
  /* p-6 */
  background-color: #1f2937;
  /* bg-gray-800 */
  color: #f3f4f6;
  /* text-gray-100 */
  border-radius: 0.75rem;
  /* rounded-xl */
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  /* shadow-2xl */
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  max-width: 64rem;
  /* max-w-4xl */
  margin: 2.5rem auto;
  /* mx-auto my-10 */
  border: 1px solid #374151;
  /* border border-gray-700 */
}

.title-div {
  text-align: center;
  color: #63b3ed;
  /* sky-400 */
  margin-bottom: 1.5rem;
  /* mb-6 */
  font-size: 1.875rem;
  /* text-3xl */
  font-weight: 800;
  /* font-extrabold */
  letter-spacing: -0.025em;
  /* tracking-tight */
}

/* Grid Layout for Input/Output Sections */
.grid-layout {
  display: grid;
  grid-template-columns: 1fr;
  /* Default for mobile */
  gap: 2rem;
  /* gap-8 */
}

@media (min-width: 768px) {

  /* md:grid-cols-2 */
  .grid-layout {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Common label style */
.label-style {
  display: block;
  margin-bottom: 0.75rem;
  /* mb-3 */
  font-size: 0.875rem;
  /* text-sm */
  font-weight: 600;
  /* font-semibold */
  color: #d1d5db;
  /* text-gray-300 */
}

/* Code Input Area */
.code-textarea {
  width: 100%;
  padding: 1rem;
  /* p-4 */
  background-color: #111827;
  /* bg-gray-900 */
  border: 1px solid #374151;
  /* border border-gray-700 */
  border-radius: 0.5rem;
  /* rounded-lg */
  font-size: 1rem;
  /* text-base */
  line-height: 1.625;
  /* leading-relaxed */
  outline: none;
  resize: vertical;
  /* resize-none, but vertical is better for textarea */
  color: #f3f4f6;
  /* text-gray-100 (inherits from parent, but explicit is good) */
  transition-property: background-color, border-color, color, fill, stroke;
  transition-duration: 200ms;
  /* transition-colors duration-200 */
}

.code-textarea::placeholder {
  color: #6b7280;
  /* placeholder-gray-500 */
}

.code-textarea:focus {
  border-color: #0ea5e9;
  /* focus:border-sky-500 */
  box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.5);
  /* focus:ring-2 focus:ring-sky-500 */
}

/* Run Button */
.run-button {
  margin-top: 1.25rem;
  /* mt-5 */
  width: 100%;
  background-color: #0284c7;
  /* bg-sky-600 */
  color: white;
  font-weight: 700;
  /* font-bold */
  padding: 0.875rem 1rem;
  /* py-3.5 px-4 */
  border-radius: 0.5rem;
  /* rounded-lg */
  transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;
  /* transition duration-200 ease-in-out */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
  /* text-lg */
  border: none;
  /* Remove default button border */
}

.run-button:hover {
  background-color: #0369a1;
  /* hover:bg-sky-700 */
  transform: scale(1.05);
  /* hover:scale-105 */
}

.run-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px #0ea5e9, 0 0 0 4px #1f2937;
  /* focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-gray-800 */
}

.run-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
  /* Disable scale effect when disabled */
}

/* Spinner Icon for Run Button */
.spinner-icon {
  animation: spin 1s linear infinite;
  /* animate-spin */
  margin-left: -0.25rem;
  /* -ml-1 */
  margin-right: 0.75rem;
  /* mr-3 */
  height: 1.25rem;
  /* h-5 */
  width: 1.25rem;
  /* w-5 */
  color: white;
  /* text-white */
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

/* Output Preformatted Text Area */
.output-pre {
  width: 100%;
  height: 20rem;
  /* h-80 */
  padding: 1rem;
  /* p-4 */
  background-color: #111827;
  /* bg-gray-900 */
  border: 1px solid #374151;
  /* border border-gray-700 */
  border-radius: 0.5rem;
  /* rounded-lg */
  overflow: auto;
  font-size: 0.875rem;
  /* text-sm */
  line-height: 1.625;
  /* leading-relaxed */
  white-space: pre-wrap;
  word-break: break-all;
  color: #d1d5db;
  /* text-gray-300 */
}

/* Output Text Styling */
.output-error {
  color: #f87171;
  /* text-red-400 */
  font-weight: 500;
  /* font-medium */
}

.output-log {
  color: #4ade80;
  /* text-green-400 */
}

.output-default {
  color: #d1d5db;
  /* text-gray-300 */
}

.output-placeholder {
  color: #6b7280;
  /* text-gray-500 */
  font-style: italic;
}

/* Clear Button */
.clear-button {
  margin-top: 1.25rem;
  /* mt-5 */
  width: 100%;
  background-color: #dc2626;
  /* bg-red-600 */
  color: white;
  font-weight: 700;
  /* font-bold */
  padding: 0.875rem 1rem;
  /* py-3.5 px-4 */
  border-radius: 0.5rem;
  /* rounded-lg */
  transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;
  /* transition duration-200 ease-in-out */
  font-size: 1.125rem;
  /* text-lg */
  border: none;
}

.clear-button:hover {
  background-color: #b91c1c;
  /* hover:bg-red-700 */
  transform: scale(1.05);
  /* hover:scale-105 */
}

.clear-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px #ef4444, 0 0 0 4px #1f2937;
  /* focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 */
}

.clear-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
  /* Disable scale effect when disabled */
}

/* Info Section (How to Use / Notes) */
.info-section {
  margin-top: 2.5rem;
  /* mt-10 */
  padding: 1.5rem;
  /* p-6 */
  background-color: #374151;
  /* bg-gray-700 */
  border-radius: 0.75rem;
  /* rounded-xl */
  font-size: 0.875rem;
  /* text-sm */
  color: #d1d5db;
  /* text-gray-300 */
  border: 1px solid #4b5563;
  /* border border-gray-600 */
}

.info-heading {
  font-weight: 700;
  /* font-bold */
  color: #63b3ed;
  /* text-sky-400 */
  margin-bottom: 0.75rem;
  /* mb-3 */
  font-size: 1.125rem;
  /* text-lg */
}

.info-heading-mt {
  margin-top: 1.25rem;
  /* mt-5 */
}

.info-list {
  list-style: disc;
  padding-left: 1.25rem;
  /* list-inside effectively */
}

.info-list li {
  margin-bottom: 0.5rem;
  /* space-y-2 */
}

.info-list li:last-child {
  margin-bottom: 0;
  /* Remove margin for the last item */
}

.info-strong {
  color: white;
  /* text-white */
  font-weight: 700;
  /* font-bold */
}

/* Code highlights within info section */
.code-highlight {
  background-color: #1f2937;
  /* bg-gray-800 */
  padding: 0.125rem 0.25rem;
  /* px-1 py-0.5 */
  border-radius: 0.25rem;
  /* rounded */
  font-family: monospace;
  /* ensure code font */
  font-size: 0.75rem;
  /* text-xs */
}

.code-log {
  color: #7dd3fc;
  /* text-sky-300 */
}

.code-error {
  color: #fca5a5;
  /* text-red-300 */
}

/* Custom scrollbar styles */
/* Using a class for consistency if you want to apply it to other scrollable areas */
.custom-scrollbar-thin::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.custom-scrollbar-thin::-webkit-scrollbar-track {
  background: #2d3748;
  /* gray-800 */
  border-radius: 10px;
}

.custom-scrollbar-thin::-webkit-scrollbar-thumb {
  background: #4a5568;
  /* gray-600 */
  border-radius: 10px;
}

.custom-scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #718096;
  /* gray-500 */
}

/* Textarea scrollbar (specific to #jsCode) */
#jsCode::-webkit-scrollbar {
  width: 8px;
}

#jsCode::-webkit-scrollbar-track {
  background: #1a202c;
  /* gray-900 */
}

#jsCode::-webkit-scrollbar-thumb {
  background: #4a5568;
  /* gray-600 */
  border-radius: 10px;
}

#jsCode::-webkit-scrollbar-thumb:hover {
  background: #718096;
  /* gray-500 */
}
</style>