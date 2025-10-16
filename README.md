# Subly

A modern subscription tracking web app that helps users manage their monthly and yearly services. Built with React and Vite.

## Features

- 🔐 **Authentication**: Secure login and registration system
- 📊 **Subscription Management**: Add, edit, and delete subscriptions
- 💰 **Cost Calculation**: Automatic monthly and yearly cost tracking
- 📅 **Billing Periods**: Support for monthly and yearly subscriptions
- 🔍 **Search**: Real-time search by subscription name or category
- 🎯 **Filtering**: Filter subscriptions by billing period
- 📜 **History**: Track all subscription changes with timestamps
- 📱 **Responsive Design**: Clean, mobile-friendly interface
- 💾 **Data Persistence**: LocalStorage for user data

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Rok-Levec/Subly.git
cd Subly
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Add Subscriptions**: Click "+ Add Subscription" to add a new service
3. **Track Costs**: View your total monthly and yearly costs at a glance
4. **Search & Filter**: Use the search bar and filter dropdown to find specific subscriptions
5. **Edit/Delete**: Manage your subscriptions with edit and delete options
6. **View History**: Check the Recent Activity section to see all changes

## Technology Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Styling**: CSS3 with custom responsive design
- **Storage**: Browser LocalStorage

## Project Structure

```
Subly/
├── src/
│   ├── components/
│   │   ├── Auth.jsx                 # Authentication component
│   │   ├── Dashboard.jsx            # Main dashboard
│   │   ├── Statistics.jsx           # Cost statistics display
│   │   ├── SubscriptionForm.jsx     # Add/Edit form
│   │   └── SubscriptionList.jsx     # Subscription cards grid
│   ├── App.jsx                      # Main app component
│   ├── main.jsx                     # App entry point
│   └── index.css                    # Global styles
├── index.html                       # HTML template
├── vite.config.js                   # Vite configuration
└── package.json                     # Project dependencies
```

## License

MIT License - feel free to use this project for personal or commercial purposes.