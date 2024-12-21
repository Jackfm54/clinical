const { spawn } = require("child_process");

let ollamaProcess;
let isModelRunning = false;

const startOllama = (model) => {
  return new Promise((resolve, reject) => {
    if (isModelRunning) {
      resolve();
      return;
    }

    ollamaProcess = spawn("ollama", ["run", model], { shell: true });

    ollamaProcess.stdout.on("data", (data) => {
      console.log(`Modelo iniciado: ${data}`);
      isModelRunning = true;
      resolve();
    });

    ollamaProcess.stderr.on("data", (data) => {
      console.error(`Error al iniciar el modelo: ${data}`);
      reject(new Error(data.toString()));
    });

    ollamaProcess.on("close", (code) => {
      console.log(`Modelo cerrado con código: ${code}`);
      isModelRunning = false;
    });
  });
};

const queryOllama = (input) => {
  return new Promise((resolve, reject) => {
    if (!isModelRunning || !ollamaProcess) {
      reject(new Error("El modelo no está en ejecución."));
      return;
    }

    ollamaProcess.stdin.write(`${input}\n`);

    let response = "";

    ollamaProcess.stdout.on("data", (data) => {
      response += data.toString();
      if (response.trim()) {
        resolve(response.trim());
      }
    });

    ollamaProcess.stderr.on("data", (data) => {
      console.error(`Error al consultar el modelo: ${data}`);
      reject(new Error(data.toString()));
    });
  });
};

module.exports = { startOllama, queryOllama };
