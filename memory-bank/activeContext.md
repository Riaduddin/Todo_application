# Active Context: Modern To-Do Application

## Current Work Focus
-   **Core Features Implemented:** Backend API and Frontend UI for core task management (CRUD), user authentication (Register/Login/Logout), task filtering (All/Active/Completed), task sorting, drag-and-drop reordering, and Dark/Light mode theme switching are functional.
-   **Next Steps:**
    -   Refine styling and responsiveness.
    -   Implement Tagging system.
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
    -   Fixed Dark/Light mode theme switching by adding `darkMode: 'class'` to `tailwind.config.js`.
    -   Enhanced `SettingsPage.jsx` to:
        -   Remove the email field from the update profile form.
        -   Add first name and last name fields to the update profile form.
        -   Update the `handleProfileUpdate` function to send the `first_name` and `last_name` to the backend.
    -   Updated the `updateUser` action in `authSlice` to handle the `first_name` and `last_name` fields.
-   **Backend:**
    -   Created API endpoints for updating user profile and changing password (`UpdateProfileView`, `ChangePasswordView`).
    -   Configured URLs for these endpoints in `backend/tasks/urls.py`.
    -   Updated `UpdateProfileView` to handle `first_name` and `last_name`.

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
-   **Theme Management:** Dark/Light mode state is managed locally within `App.jsx` using `useState` and persisted in `localStorage`. It is *not* currently part of the Redux store. The theme state and toggle function are passed down as props (e.g., to `Navbar`).
-   Tailwind's `darkMode: 'class'` configuration is essential for class-based theme switching to work correctly.
