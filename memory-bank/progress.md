# Progress: Modern To-Do Application

## Current Status
-   **Phase:** Core Features + UI Enhancements
-   **Overall Progress:** ~90% (Core features implemented including sorting, drag-and-drop, responsive Navbar, refined layout, animations, basic Settings page, and functional Dark/Light mode)
-   **Last Update:** [Date of this update]

## What Works
-   **Memory Bank:** Core files created and updated (including switch to SQLite).
-   **Frontend:**
    -   React/Vite project scaffolded in `frontend/`.
    -   Dependencies installed (Tailwind, Redux Toolkit, React Router, Axios, Framer Motion).
    -   Tailwind CSS initialized and configured (`tailwind.config.js`, `postcss.config.js`, `src/index.css`).
-   **Backend:**
    -   Django project scaffolded in `backend/`.
    -   Virtual environment (`venv`) created.
    -   Dependencies installed (Django, DRF, SimpleJWT, CORS, python-dotenv).
    -   `settings.py` configured for installed apps, middleware, DRF, JWT, CORS, and SQLite database.
    -   Main `urls.py` configured with admin, JWT, and api-auth paths.
    -   Initial database migrations applied (`db.sqlite3` created).
    -   Created `tasks` app.
    -   Defined `Task` model and applied migrations.
    -   Created `UserSerializer` and `TaskSerializer`.
    -   Created `TaskViewSet` (for task CRUD) and `UserCreate` (for registration) views.
    -   Configured URLs for `tasks` app and included them in main project URLs under `/api/`.
-   **Frontend:**
    -   Created folder structure.
    -   Configured Redux store and slices (`authSlice`, `tasksSlice`) with API integration.
    -   Implemented routing with `BrowserRouter` and `ProtectedRoute`.
    -   Created page components (`Login`, `Register`, `Dashboard`, `Settings`).
    -   Implemented Login/Register forms with Redux integration.
    -   Implemented `TaskItem`, `TaskList`, `AddTaskForm`, `EditTaskModal`.
    -   Implemented task fetching, adding, updating, deleting on Dashboard.
    -   Added Logout functionality.
    -   Added task filtering (All/Active/Completed).
    -   Implemented Dark/Light mode toggle in App layout.
    -   Replaced temporary navigation with responsive `Navbar` component.
    -   Refined styling on `DashboardPage`.
    -   Added basic Framer Motion animations to `TaskItem` and `EditTaskModal`.
    -   Implemented basic `SettingsPage` display.
    -   Added task sorting functionality to Dashboard.
    -   Implemented visual drag-and-drop reordering using `@dnd-kit`.
    -   Fixed Dark/Light mode theme switching (enabled `darkMode: 'class'` in Tailwind config).

## What's Left to Build (High-Level)
-   **Frontend - UI/UX Enhancements & Remaining Features:**
    -   Persist drag-and-drop order (optional: requires backend changes).
    -   Settings page functionality enhanced with:
        -   Profile update (first name, last name).
        -   Password change.
    -   Further refine styling and ensure responsiveness across devices.
    -   Implement Tagging system (backend model, API, frontend UI).
-   **Testing & Deployment:**
    -   Unit/Integration tests (optional based on scope).
    -   Deployment strategy (TBD).

## Known Issues
-   The initial `npx tailwindcss init -p` command failed, requiring manual config file creation. This might have contributed to the `darkMode` setting being missed initially.

## Evolution of Project Decisions
-   Initial project setup based on the provided brief.
-   **Database Change:** Switched from the initially planned PostgreSQL to SQLite for development simplicity.
