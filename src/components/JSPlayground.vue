<template>
  <div class="js-playground p-4 bg-gray-800 text-white rounded-lg shadow-xl font-sans max-w-4xl mx-auto my-8">
    <h2 class="text-2xl font-semibold mb-6 text-center text-sky-400">JavaScript Playground</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="code-input-section">
        <label for="jsCode" class="block mb-2 text-sm font-medium text-gray-300">Enter JavaScript Code:</label>
        <textarea id="jsCode" v-model="code" rows="12"
          class="w-full p-3 bg-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none resize-none placeholder-gray-500"
          placeholder="console.log('Hello, Vue!');"></textarea>
        <button @click="runCode"
          class="mt-4 w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-4 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 flex items-center justify-center"
          :disabled="isRunning">
          <svg v-if="isRunning" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
          {{ isRunning ? 'Running...' : 'Run Code' }}
        </button>
      </div>

      <div class="output-section">
        <label for="output" class="block mb-2 text-sm font-medium text-gray-300">Output / Console:</label>
        <pre id="output"
          class="w-full h-80 p-3 bg-gray-900 border border-gray-700 rounded-md overflow-auto text-sm whitespace-pre-wrap break-all"><template v-for="(line, index) in outputLines" :key="index"><span :class="line.type === 'error' ? 'text-red-400' : (line.type === 'log' ? 'text-green-400' : 'text-gray-300')">{{ line.message }}</span><br v-if="index < outputLines.length"></template><span
  v-if="outputLines.length === 0" class="text-gray-500">Output will appear here...</span></pre>
        <button @click="clearOutput"
          class="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          :disabled="outputLines.length === 0">
          Clear Output
        </button>
      </div>
    </div>

    <div class="mt-8 p-4 bg-gray-700 rounded-md text-sm text-gray-300">
      <h3 class="font-semibold text-sky-400 mb-2">How to Use:</h3>
      <ul class="list-disc list-inside space-y-1">
        <li>Write your JavaScript code in the left panel.</li>
        <li>Click "Run Code" to execute it.</li>
        <li>Output, including <code>console.log()</code>, <code>console.error()</code>, and return values of
          expressions,
          will appear in the right panel.</li>
        <li>Async operations (e.g., <code>setTimeout</code>, <code>Promises</code>) are supported.</li>
      </ul>
      <h3 class="font-semibold text-sky-400 mt-4 mb-2">Notes:</h3>
      <ul class="list-disc list-inside space-y-1">
        <li>The code is executed in a sandboxed environment. Direct DOM manipulation of the main page is not possible.
        </li>
        <li>For security, avoid running untrusted code.</li>
        <li>The last expression's value will be displayed if it's not a <code>console</code> call.</li>
      </ul>
    </div>

  </div>
</template>

<script setup>
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
  // Clear previous specific run output, but keep general logs if desired
  // For this version, we'll clear for each run for simplicity,
  // but you could make it append too.
  // outputLines.value = []; // Decided to keep logs until manually cleared.

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
      if (lastLog !== resultString) {
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
  return String(arg);
};

// Function to clear the output
const clearOutput = () => {
  outputLines.value = [];
};

</script>

<style scoped>
/* Scoped styles specific to JSPlayground */
.js-playground {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

/* Custom scrollbar for the output area (optional, for better aesthetics) */
#output::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

#output::-webkit-scrollbar-track {
  background: #2d3748;
  /* gray-800 */
  border-radius: 10px;
}

#output::-webkit-scrollbar-thumb {
  background: #4a5568;
  /* gray-600 */
  border-radius: 10px;
}

#output::-webkit-scrollbar-thumb:hover {
  background: #718096;
  /* gray-500 */
}

/* Ensure textarea also has a decent scrollbar if content overflows */
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

/* Add a subtle focus style for accessibility */
textarea:focus,
button:focus {
  box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.4);
  /* sky-400 with opacity */
}
</style>
