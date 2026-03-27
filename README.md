# 🧪 SauceDemo Playwright Automation Framework

## 📌 Project Overview
This project is an end-to-end test automation framework built using **Playwright with JavaScript**. It covers critical user flows of the SauceDemo application, including authentication, product sorting, cart operations, and checkout functionality.

The framework follows the **Page Object Model (POM)** design pattern to ensure scalability, reusability, and maintainability.

---

## 🚀 Tech Stack
- Playwright  
- JavaScript (ES6+)  
- Node.js  
- Page Object Model (POM)  

---

## 📂 Project Structure
project-root/
│
├── tests/
│ └── NewSort.spec.js # Test cases
│
├── pages/
│ ├── LoginPage.js # Login page actions
│ ├── ProductsPage.js # Product & sorting logic
│ ├── ShoppingCartPage.js # Cart operations
│ └── CheckoutPage.js # Checkout flow
│
├── playwright.config.js # Playwright configuration
├── package.json
└── README.md
---

## ✅ Test Coverage

### 🔐 Authentication Tests
- Successful login with valid credentials  
- Login with wrong password  
- Login with empty fields  
- SQL injection attempt  
- Locked user validation  

### 🔄 Sorting Validation
- Name (A → Z)  
- Name (Z → A)  
- Price (Low → High)  
- Price (High → Low)  

### 🛒 Cart & Checkout Flow
- Add product to cart  
- Verify product in cart  
- Navigate to cart  
- Complete checkout process  
- Validate order summary  
- Verify successful purchase  

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository
```bash
git clone <your-repo-link>
cd <project-folder>

npx playwright test
