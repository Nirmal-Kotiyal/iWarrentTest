const fs = require("fs");
const XLSX = require("xlsx");
const { Transform } = require("stream");

// Check if the filename is provided as an argument
if (process.argv.length !== 3) {
  console.log("Usage: node script.js <filename>");
  process.exit(1);
}

const filename = process.argv[2];

// Load the Excel file and process it
function processExcelFile(filename) {
  try {
    const workbook = XLSX.readFile(filename);
    const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
    const worksheet = workbook.Sheets[sheetName];
    const stream = XLSX.stream.to_json(worksheet, { raw: true });

    // Convert JS objects to text via JSON.stringify
    const conv = createJsonTransformStream();
    
    // Pipe the streams and output to the console
    stream.pipe(conv).pipe(process.stdout);
  } catch (error) {
    console.error("Error processing Excel file:", error.message);
  }
}

// Create a Transform stream to convert JSON objects to formatted strings
function createJsonTransformStream() {
  return new Transform({
    writableObjectMode: true,
    transform(obj, encoding, callback) {
      const cleanedObj = cleanupJsonObject(obj);
      callback(null, JSON.stringify(cleanedObj, null, 2) + "\n");
    }
  });
}

// Clean up JSON object
function cleanupJsonObject(obj) {
  const cleanedObj = { ...obj }; // Create a copy of the original object

  if (obj.directory_category) {
    cleanedObj.directory_category = splitAndTrim(obj.directory_category, ";");
  }

  if (obj.content_children_count) {
    cleanedObj.content_children_count = convertContentChildrenCount(obj.content_children_count);
  }

  return cleanedObj;
}

// Split and trim a string based on a delimiter
function splitAndTrim(str, delimiter) {
  return str.split(delimiter).map(item => item.trim());
}

// Convert content_children_count to an object
function convertContentChildrenCount(value) {
  const counts = {};
  value.split(";").forEach(item => {
    const [key, count] = item.split("|");
    counts[key] = parseInt(count, 10);
  });
  return counts;
}

// Process the Excel file
processExcelFile(filename);
