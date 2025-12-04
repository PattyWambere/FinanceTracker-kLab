# Finance Tracker

A personal finance management web application built with vanilla HTML, CSS, and JavaScript. Track your income, expenses, and financial analytics all in one place.

## Features

### 🔐 Authentication

- **User Registration**: Create a new account with name, email, and password
- **User Login**: Secure login system with credential validation
- **Session Management**: User sessions stored in local storage

### 📊 Dashboard

- **Financial Overview**: View your total balance, monthly income, and monthly expenses at a glance
- **Balance Trend Chart**: Visual representation of your balance trends over the last 30 days
- **Recent Transactions**: Quick view of your latest 5 transactions with details

### 💰 Transactions Management

- **Add Transactions**: Record both income and expense transactions
- **Transaction Details**: Include amount, category, date, description, and optional receipt image
- **View All Transactions**: Comprehensive list of all transactions with filtering capabilities
- **Search & Filter**: Find transactions by keywords or category

### 📈 Analytics

- **Income vs Expense Chart**: Monthly comparison of your income and expenses
- **Spending by Category**: Pie chart visualization of spending distribution
- **Financial Metrics**:
  - Top spending category
  - Total income (Year-to-Date)
  - Total expenses (Year-to-Date)
  - Savings rate percentage
  - Average monthly income and expenses

### ⚙️ Settings

- **Profile Management**: Update your full name and email address
- **Preferences**:
  - Currency selection (USD, NGN, EUR)
  - Email notification preferences
- **Data Management**: Export your transactions as CSV
- **Security**: Optional two-factor authentication
- **Account Management**: Delete account option

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Storage**: Browser Local Storage
- **Architecture**: Client-side single-page application

## File Structure

```
FinanceTracker-kLab/
├── index.html           # Landing/login entry point
├── login.html           # Login page
├── signup.html          # User registration page
├── dashboard.html       # Main application dashboard
├── auth.js              # Authentication logic
├── dashboard.js         # Dashboard functionality
├── styles/
│   ├── style.css        # General styles
│   └── dashboard.css    # Dashboard-specific styles
└── README.md            # This file
```

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No backend server required - runs entirely in the browser

### Installation

1. **Clone or download the project**

   ```bash
   git clone <repository-url>
   cd FinanceTracker-kLab
   ```

2. **Open the application**
   - Open `index.html` or `signup.html` in your web browser
   - Or use a local server:
     ```bash
     python -m http.server 8000
     # Then visit http://localhost:8000
     ```

### Usage

1. **Create an Account**

   - Navigate to the signup page
   - Enter your name, email, and password
   - Click "Create Account"

2. **Login**

   - Enter your registered email and password
   - Click "Login" to access the dashboard

3. **Manage Transactions**

   - Click "+ Add Transaction" to record new income or expenses
   - Select the transaction type (Expense or Income)
   - Fill in amount, category, date, and description
   - Optionally attach a receipt image

4. **View Analytics**

   - Navigate to the Analytics section
   - View visual charts of your income vs expenses
   - Check spending distribution by category
   - Review key financial metrics

5. **Export Data**
   - Go to Settings
   - Click "Export Transactions as CSV" to download your data

## Features Overview

### Dashboard Tab

- Real-time balance overview
- Monthly income and expense summary
- Visual trend chart for balance monitoring
- Quick access to recent transactions

### Transactions Tab

- Complete transaction history
- Search functionality
- Category filtering
- Large transaction list view

### Analytics Tab

- Income vs Expense comparison charts
- Spending breakdown by category
- Financial metrics (savings rate, averages)
- Year-to-date statistics

### Settings Tab

- Profile information management
- Currency preference selection
- Notification settings
- Two-factor authentication option
- CSV data export
- Account deletion (danger zone)

## Data Storage

All user data is stored in the browser's Local Storage:

- **users**: Array of registered users with credentials
- **loggedUser**: Currently logged-in user information

⚠️ **Note**: Data is stored locally in the browser. Clearing browser cache will delete all data. For production use, implement a backend database.

## How Authentication Works

1. User registers with email, password, and name
2. User data is stored in local storage
3. On login, credentials are validated against stored users
4. Successful login stores the user session
5. User can sign out to clear the session

## Responsive Design

The application is designed with a responsive layout that works on:

- 📱 Mobile devices
- 💻 Tablets
- 🖥️ Desktop screens

## Browser Compatibility

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Limitations & Future Enhancements

### Current Limitations

- Data stored locally (browser-specific)
- No backend synchronization
- Manual data export to CSV only
- UI mock for transaction submission

### Planned Features

- Backend API integration for data persistence
- Multi-device synchronization
- Advanced reporting and budgeting
- Transaction categorization with custom categories
- Recurring transaction templates
- Budget alerts and notifications
- Mobile app version
- Dark mode theme

## Security Notes

⚠️ **Important**: This is a frontend-only application. For production use:

- Implement server-side authentication
- Use secure password hashing
- Add HTTPS encryption
- Implement proper data validation
- Add CSRF protection

## Contributing

Feel free to fork this project and submit pull requests for any improvements.

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please open an issue in the repository.

---

**Built with ❤️ by FinanceTracker Team**
