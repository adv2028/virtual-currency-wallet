# Virtual Exchange Wallet 💱
App to check the **Euro** exchange rate against selected currencies, utilizing the Coinbase API.

## Coinbase API Documentation:
The following Coinbase API endpoints are used:
*   **Get Fiat Currencies**: 
https://docs.cdp.coinbase.com/coinbase-app/docs/track/api-currencies#get-fiat-currencies

*   **Get Exchange Rates**: 
https://docs.cdp.coinbase.com/coinbase-app/docs/track/api-exchange-rates#get-exchange-rates

## Prerequisites
*   **Node.js**: `22.13.1` (It's highly recommended to match this version. Check the `.nvmrc`)
*   **pnpm**: This project uses `pnpm` as the package manager. Install it globally if you haven't already: `npm install -g pnpm`

It's recommended to use a Node.js version manager like [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm) or [FNM (Fast Node Manager)](https://github.com/Schniz/fnm).
If you have NVM or FNM installed, you can usually run `nvm use` or `fnm use` respectively in the project root to automatically switch to (or install) the Node.js version specified in the `.nvmrc` file.

## Environment Setup
This project requires an API base URL to be configured via an environment variable.
1.  **Create a `.env` file:**
    In the root of the project, create a new file named `.env`. You can do this by copying the example file.

2.  **Set the API URL:**
    Open the newly created `.env` file and set the value for `VITE_COINBASE_API_BASE_URL`
    ```env
    # .env
    VITE_COINBASE_API_BASE_URL="https://api.coinbase.com/v2"
    ```
  
## Getting Started
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/adv2028/virtual-currency-wallet.git
    cd virtual-currency-wallet
    ```

2.  **Set Node.js version (if using FNM/NVM):**
    If you have FNM or NVM, ensure you are using the correct Node.js version:
    ```bash
    fnm use v20.13.1
    # or
    # nvm use 20.13.1
    ```
    If the version is not installed, follow the prompts from FNM/NVM to install it.

3.  **Install dependencies:**
    Use `pnpm` to install the project dependencies:
    ```bash
    pnpm install
    ```

4.  **Set up your `.env` file:**
    Follow the instructions in the "Environment Setup" section above if you haven't already.

5.  **Run the development server:**
    ```bash
    pnpm run dev
    ```
    This will start the Vite development server, and you should be able to view the application in your browser, usually at `http://localhost:5173` (or a similar port).

## Available Scripts
*   `pnpm run dev`: Starts the development server.
*   `pnpm run build`: Builds the application for production.
*   `pnpm run preview`: Serves the production build locally for preview.
*   `pnpm run test`: Runs the test suite using Vitest.
*   `pnpm run test:ui`: Runs Vitest with its UI for a more interactive testing experience.
*   `pnpm run lint`: Lints code using ESLint.
