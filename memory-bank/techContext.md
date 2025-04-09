# Technical Context: Modern To-Do Application

## Technologies Used
-   **Frontend:**
    -   **Framework/Library:** React (using Vite for build tooling)
    -   **Language:** JavaScript (ES6+) / Potentially TypeScript if decided later
    -   **Styling:** TailwindCSS
    -   **State Management:** Redux Toolkit
    -   **Routing:** React Router
    -   **API Client:** Axios
    -   **Animations:** Framer Motion
    -   **Package Manager:** npm or yarn
-   **Backend:**
    -   **Framework:** Python Django (with Django REST Framework)
    -   **Language:** Python 3.x
    -   **Database:** SQLite
    -   **Authentication:** JWT (likely using `djangorestframework-simplejwt`)
    -   **API Specification:** REST
    -   **Package Manager:** pip (with `requirements.txt`)
-   **Development Environment:**
    -   Node.js (for frontend development)
    -   Python (for backend development)
    -   Virtual Environment (for Python dependencies)
    -   Git (for version control)
    -   VS Code (as the IDE)

## Development Setup Requirements
-   **Frontend:**
    -   Install Node.js and npm/yarn.
    -   Clone the repository.
    -   Navigate to the frontend directory.
    -   Run `npm install` or `yarn install` to install dependencies.
    -   Run `npm run dev` or `yarn dev` to start the Vite development server.
-   **Backend:**
    -   Install Python 3.x and pip.
    -   SQLite is file-based and requires no separate server installation or database creation steps. The database file will be created automatically by Django.
    -   Clone the repository.
    -   Navigate to the backend directory.
    -   Create and activate a Python virtual environment (e.g., `python -m venv venv`, `source venv/bin/activate` or `venv\Scripts\activate`).
    -   Run `pip install -r requirements.txt` to install dependencies.
    -   Configure database settings in `settings.py` to use SQLite (default setting).
    -   Run Django migrations (`python manage.py migrate`).
    -   Run `python manage.py runserver` to start the Django development server.
-   **Environment Variables:** Sensitive information like database credentials, JWT secret keys, and potentially API keys should be managed using environment variables (e.g., via a `.env` file and `python-dotenv` for Django, Vite's built-in env handling for React).

## Technical Constraints & Considerations
-   **CORS:** The Django backend must be configured with `django-cors-headers` (or similar) to allow requests from the frontend's origin (e.g., `http://localhost:5173` during development).
-   **JWT Handling:** Securely store the JWT on the client-side (e.g., in `localStorage` or `sessionStorage`, considering security implications) and send it in the `Authorization` header for authenticated requests. Implement token refresh logic if necessary.
-   **Database Schema:** Design an appropriate database schema in Django models for users and tasks, including relationships and necessary fields (title, description, due_date, completed_status, user foreign key, tags - potentially a ManyToManyField).
-   **API Versioning:** Consider API versioning (e.g., `/api/v1/tasks/`) if future breaking changes are anticipated, although not strictly necessary for the initial version.
-   **State Management Complexity:** Redux Toolkit helps manage state, but careful planning of slices, reducers, and actions is needed to keep it maintainable as the application grows.

## Key Dependencies (Initial List)
-   **Frontend (package.json):**
    -   `react`, `react-dom`
    -   `@vitejs/plugin-react`
    -   `tailwindcss`, `postcss`, `autoprefixer`
    -   `@reduxjs/toolkit`, `react-redux`
    -   `react-router-dom`
    -   `axios`
    -   `framer-motion`
-   **Backend (requirements.txt):**
    -   `django`
    -   `djangorestframework`
    # - `psycopg2-binary` (or `psycopg2`) - Not needed for SQLite
    -   `djangorestframework-simplejwt`
    -   `django-cors-headers`
    -   `python-dotenv` (optional, for managing .env files)
