# Switch App

This application helps users select activities based on their mood, available time, and preferred type of activity.  It provides tailored suggestions to enhance leisure time and decision-making.

## Features and Functionality

-   **Activity Selection:** Dynamically suggests activities based on user-defined criteria (intensity, duration, type).
-   **Customizable Options:** Users can select their desired activity intensity (low, medium, high), duration (5 minutes, 10 minutes, 10+ minutes), and type (internal, external).
-   **Random Suggestion:** Provides a completely random activity suggestion if the user is unsure what they want.
-   **Theming:**  Supports both light and dark themes, allowing users to switch based on their preference.  Theme preference is persisted using local storage.
-   **Developer Information:** Displays information about the developer and a link to the project's GitHub repository.
-   **User-Friendly Interface:** Uses a clean, responsive design with clear visual cues and easy navigation.
-   **Localized Experience:**  The application is fully localized for Arabic, with right-to-left (RTL) layout support.

## Technology Stack

-   **Framework:** Angular Ionic
-   **Styling:** Tailwind CSS
-   **Alerts:** SweetAlert2
-   **Language:** TypeScript
-   **Platform:** Capacitor

## Prerequisites

Before running the application, ensure you have the following installed:

-   **Node.js:** (version 16 or higher) - [https://nodejs.org/](https://nodejs.org/)
-   **npm:** (usually comes with Node.js) or yarn:  [https://yarnpkg.com/](https://yarnpkg.com/)
-   **Angular CLI:**  Install globally using `npm install -g @angular/cli`
-   **Ionic CLI:** Install globally with `npm install -g @ionic/cli`, or locally with `npm install --save-dev @ionic/cli` and use via `npm run ionic`.
-   **Capacitor CLI:** Install globally using `npm install -g @capacitor/cli`
-   **Android Studio:** (If building for Android) - [https://developer.android.com/studio](https://developer.android.com/studio)

## Installation Instructions

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/abq0/switch-app.git
    cd switch-app
    ```

2.  **Install dependencies:**

    ```bash
    npm install # or yarn install
    ```

## Usage Guide

1.  **Run the application in the browser:**

    ```bash
    ionic serve
    ```

    This command will build the application and open it in your default browser.  You can access it at `http://localhost:8100` (or a similar address).

2.  **Building for Android (example):**

    a.  Add the Android platform:

     ```bash
    ionic cordova platform add android
    ```

     b.  Build app for Android:  
     ```bash
    ionic cordova build android
    ```
