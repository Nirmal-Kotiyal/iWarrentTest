## Instructions

### Using Provided Spreadsheet File

To run the solution with the provided Excel file, follow these steps:

1. Clone this repository to your local machine:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd iwarrantytest
   ```

3. Install dependencies using npm:

   ```bash
   npm install
   ```

4. Run the test script:

   ```bash
   npm test
   ```

   This script runs the `index.js` file with the provided Excel file (`iw-tech-test-retailer-data.xlsx`) as an argument.

5. The cleaned JSON data will be printed to the console.

### Using Your Own Spreadsheet File

If you want to use your own spreadsheet file, follow these steps:

1. Ensure your spreadsheet file is in the Excel (.xlsx) format.

2. Place your spreadsheet file in the project directory.

3. Update the `test` script in `package.json` to use your spreadsheet file:

   ```json
   "test": "node index.js <your-spreadsheet-file>"
   ```

   Replace `<your-spreadsheet-file>` with the filename of your spreadsheet.

4. Run the test script:

   ```bash
   npm test
   ```

   This will process your spreadsheet file and output cleaned JSON data to the console.

## Dependencies

- [xlsx](https://www.npmjs.com/package/xlsx): A library for reading and writing Excel files in JavaScript.
