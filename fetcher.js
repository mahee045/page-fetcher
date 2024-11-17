const fs = require('fs');
const needle = require('needle');

// Extract command line arguments
const [,, inputUrl, localPath] = process.argv;

if (!inputUrl || !localPath) {
  console.error("Usage: node fetcher.js <URL> <local file path>");
  process.exit(1);
}

// Make HTTP request using needle
needle.get(inputUrl, (error, response, body) => {
  if (error) {
    console.error(`Failed to fetch URL: ${error.message}`);
    process.exit(1);
  }

  if (response.statusCode !== 200) {
    console.error(`Failed to download. HTTP Status Code: ${response.statusCode}`);
    process.exit(1);
  }

  // Write the downloaded data to the specified file path
  fs.writeFile(localPath, body, (err) => {
    if (err) {
      console.error(`Failed to write file: ${err.message}`);
      process.exit(1);
    }

    // Calculate and log file size
    const fileSize = body.length; // Each character in the string is 1 byte
    console.log(`Downloaded and saved ${fileSize} bytes to ${localPath}`);
  });
});
