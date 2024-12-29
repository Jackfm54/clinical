const { spawn } = require("child_process");

(async () => {
  try {
    const prompt = `Classify health risk for: Heart Rate=110, BP=140/90, Oxygen=95`;
    console.log("Sending prompt to Ollama...");

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

    command.on("close", (code) => {
      if (code !== 0) {
        console.error("Ollama process exited with code:", code);
      }

      if (errorOutput) {
        console.error("Ollama STDERR:", errorOutput);
      }

      console.log("Ollama Output:", output.trim());
    });
  } catch (error) {
    console.error("Error running Ollama test:", error.message);
  }
})();
