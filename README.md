# Excel to MySQL API

This API allows you to upload Excel files and import their data into a MySQL database. It's built using Node.js, Express, and various npm packages.

## Getting Started

Follow the steps below to set up and run the API locally.

### Prerequisites

- Node.js: Ensure you have Node.js installed on your system.
- MySQL Database: You'll need a MySQL database to connect to. Set up your database and note down the connection details.

### Installation

1. Clone this repository to your local machine:

   ```
   git clone https://github.com/singhkaushik/UploadExcel.git
   ```

2. Change directory to the project folder:

   ```bash
   cd UploadExcel
   ```

3. Install the required npm packages:

   ```bash
   npm install
   ```

4. Create a `.env` file in the project root directory and define your environment variables:

   ```env
   DB_HOST=your_database_host
   DB_USERNAME=your_database_username
   DB_PASSWORD=your_database_password
   DB_DATABASE=your_database_name
   PORT=5000
   ```

5. Start the API:

   ```bash
   npm start
   ```

The API will start on `http://localhost:5000`.

