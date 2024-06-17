# Powered By NK Software House 
- [Web Application] for the HanSee Gold Business .

# Buy Page Application

This application allows users to choose a customer, select options, enter quantities, and manage purchases. It includes features for printing vouchers and handling customer data with APIs. This project is built using React and Material-UI (MUI).

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Pages](#pages)
  - [HomePage](#homepage)
  - [GoldPricePage](#goldpricepage)
  - [CustomerPage](#customerpage)
  - [ReportPage](#reportpage)
  - [NotFoundPage](#notfoundpage)
  - [BuyPage](#buypage)
- [APIs](#apis)
- [License](#license)

## Features

- Customer selection with data from API.
- Radio buttons to choose options.
- Quantity input field with automatic total amount calculation.
- Buy and clear buttons for handling purchase operations.
- Voucher printing with customer and purchase details.
- Date pickers for filtering reports.
- Toast notifications for user interactions.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/your-repository.git
    ```
2. Navigate to the project directory:
    ```bash
    cd your-repository
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

## Usage

1. Start the development server:
    ```bash
    npm start
    ```
2. Open your browser and navigate to `http://localhost:3000`.

## Pages

### HomePage

The HomePage displays options for Buy, GoldPrice, Report, and Setting. Each option redirects to its respective page.

### GoldPricePage

The GoldPricePage allows users to update the gold price by entering the `Yway Price` and `Lone Price`. There are buttons to update and clear the inputs.

### CustomerPage

The CustomerPage allows users to create and manage customers. Users can enter a customer name, and use buttons to create or clear the input. Below this, an MUI DataTable displays customer data with edit and delete options.

### ReportPage

The ReportPage provides a form to filter reports by date and customer name. Users can choose dates and select a customer from an autocomplete dropdown. A table displays filtered report data.

### NotFoundPage

The NotFoundPage shows a message indicating that the page was not found, along with a relevant image.

### BuyPage

The BuyPage allows users to select a customer, choose options via radio buttons, and enter quantity. The unit price and total amount are displayed. Users can buy and print vouchers or clear inputs.

## APIs

Currently, the APIs for creating, editing, deleting customers, and fetching reports are not implemented. The placeholders for these API calls are set up using `axios`.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
