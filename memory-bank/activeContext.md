# Active Context: Modern To-Do Application

## Current Work Focus
-   **Core Features Implemented:** Backend API and Frontend UI for core task management (CRUD), user authentication (Register/Login/Logout), and task filtering (All/Active/Completed) are functional.
-   **Next Steps:**
    -   Implement remaining UI/UX features (Dark Mode, animations).
    -   Implement sorting functionality.
    -   Refine styling and responsiveness.
    -   Testing.

## Recent Changes
-   **Frontend:**
    -   Created folder structure (`components`, `pages`, `store`, etc.).
    -   Configured Redux store (`store.js`).
    -   Wrapped App in `Provider` and `BrowserRouter` (`main.jsx`).
    -   Implemented basic routing (`App.jsx`).
    -   Created placeholder page components (`LoginPage`, `RegisterPage`, `DashboardPage`, `SettingsPage`).
    -   Created `authSlice` and `tasksSlice` with async thunks (using `apiClient`).
    -   Implemented Login and Register forms, connecting them to Redux actions.
    -   Created `ProtectedRoute` component and applied it to relevant routes.
    -   Created `apiClient` utility for Axios requests with JWT interceptor.
    -   Implemented `TaskItem`, `TaskList`, `AddTaskForm`, `EditTaskModal` components.
    -   Implemented task fetching, adding, updating (completion toggle & edit modal), and deleting on the Dashboard.
    -   Added Logout functionality.
    -   Added task filtering UI and logic to Dashboard.
    -   Implemented Dark/Light mode toggle in App layout.
    -   Replaced temporary navigation with responsive `Navbar` component.
    -   Refined styling on `DashboardPage`.
    -   Added basic Framer Motion animations to `TaskItem` and `EditTaskModal`.
    -   Implemented basic `SettingsPage` display.
    -   Added task sorting functionality to Dashboard.
    -   Implemented visual drag-and-drop reordering using `@dnd-kit`.
-   **Backend:** (Previous changes)
    -   Created `tasks` app, defined `Task` model, applied migrations.
    -   Created serializers, views (ViewSet, CreateView), and URLs for tasks and user registration.
    -   Configured main URLs.

## Active Decisions & Considerations
-   Following the technical stack and architecture outlined in `projectbrief.md` and `systemPatterns.md`, with the exception of the database.
-   **Database Choice:** Switched from PostgreSQL to SQLite for simplicity during development. This change is reflected in the updated Memory Bank files.
-   Decision pending on using JavaScript vs. TypeScript for the frontend (defaulting to JavaScript for now as per `techContext.md`).

## Important Patterns & Preferences
-   Maintain clear separation between frontend and backend concerns.
-   Utilize utility-first CSS with TailwindCSS for styling.
-   Employ Redux Toolkit for predictable state management.
-   Follow REST principles for API design.
-   Keep Memory Bank files updated consistently.

## Learnings & Project Insights
-   Project setup phase. No specific implementation insights yet.
