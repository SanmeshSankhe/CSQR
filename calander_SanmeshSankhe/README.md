```markdown
# 📅 React Calendar Component (with Vite)

This project is a simple, single-page React application built using [Vite](https://vitejs.dev/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/). The app displays a calendar with the following features:

- Current month view with date highlighting
- Past dates grayed out and unclickable
- Navigation between months using arrows
- Ability to select today's or future dates
- Unit tests for core calendar behaviors

---

## 🛠️ Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/SanmeshSankhe/CSQR.git
cd calendar-app
```

### 2. Install Dependencies

```bash
npm install
```

---

## 🚀 Run the Project

```bash
npm run dev
```

This will launch the app in development mode using Vite. You can access it in your browser at:

```
http://localhost:5173
```

---

## 🧪 Run Tests

This project uses **Jest** and **React Testing Library** for unit testing.

To run all test cases:

```bash
npm test
```

Or:

```bash
npm run test
```

Tests are located in:

```
src/Components/Calendar.test.js
```

> 📌 Note: Tests use `jest.useFakeTimers().setSystemTime(...)` to mock the current date for consistency.

---

## 🧾 Project Structure

```
src/
├── Components/
│   ├── Calendar.jsx      # Calendar component
│   └── Calendar.test.js  # Unit tests for Calendar
├── App.jsx
└── main.jsx
```

---

## 🔧 Tech Stack

- React
- Vite
- Tailwind CSS
- React Icons
- Jest
- React Testing Library

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
```
