const { spawn } = require("child_process");

const inferRisk = async (healthData) => {
  try {
    const prompt = `Classify health risk for: Heart Rate=${healthData.heartRate}, BP=${healthData.bloodPressure}, Oxygen=${healthData.oxygenLevel}`;
    console.log("Prompt sent to Ollama:", prompt);

    const command = spawn("ollama", ["run", "monotykamary/medichat-llama3"]);

    command.stdin.write(prompt);
    command.stdin.end();

    let output = "";
    let errorOutput = "";

    command.stdout.on("data", (data) => {
      output += data.toString();
    });

    command.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        command.kill(); // Termina el proceso si se excede el tiempo
        reject(new Error("Ollama execution timed out."));
      }, 120000); // Timeout de 2 minutos

      command.on("close", (code) => {
        clearTimeout(timeout);

        if (code !== 0) {
          console.error("Ollama process exited with code:", code);
          return reject(new Error(`Ollama process exited with code ${code}`));
        }

        if (errorOutput) {
          console.error("Ollama STDERR:", errorOutput);
          return reject(new Error(`Ollama error: ${errorOutput}`));
        }

        console.log("Ollama Output:", output.trim());
        resolve(output.trim()); // Devuelve la salida completa
      });
    });
  } catch (error) {
    console.error("Error in inferRisk:", error.message);
    throw new Error(`AI service unavailable: ${error.message}`);
  }
};

module.exports = { inferRisk };
