const { spawn } = require("child_process");

const inferRisk = async (healthData) => {
  try {
    // Construir el mensaje del prompt
    const prompt = `Classify the health risk based on the following metrics: 
      - Heart Rate: ${healthData.heartRate}
      - Blood Pressure: ${healthData.bloodPressure}
      - Oxygen Level: ${healthData.oxygenLevel}`;

    // Ejecutar Ollama con spawn
    const command = spawn("ollama", ["run", "llama3.2"]);

    // Escribir el prompt en la entrada estándar
    command.stdin.write(prompt);
    command.stdin.end();

    // Capturar la salida del modelo
    let output = "";
    for await (const chunk of command.stdout) {
      output += chunk;
    }

    // Capturar errores
    let errorOutput = "";
    for await (const chunk of command.stderr) {
      errorOutput += chunk;
    }

    // Manejar errores si existen
    if (errorOutput) {
      throw new Error(`Ollama error: ${errorOutput}`);
    }

    // Parsear y devolver la respuesta JSON
    return JSON.parse(output.trim());
  } catch (error) {
    console.error("Error running Ollama locally:", error.message);
    throw new Error("AI service unavailable");
  }
};

module.exports = { inferRisk };
