# Oathentify

Oathentify is a modern platform for creating, signing, and managing legally-binding digital agreements with confidence. Built with Next.js and Firebase, it offers a fast, simple, and secure experience with distinct modes for corporate, casual, and relationship agreements.

## About The Project

In today's digital world, a reliable method for creating and authenticating agreements is essential. Oathentify addresses this need by providing a user-friendly interface to draft agreements, invite parties to sign using various methods, and manage everything from a centralized dashboard. With features like AI-powered term suggestions and a tamper-proof audit trail, Oathentify brings trust and simplicity to digital commitments.

## Key Features

- **Multi-Modal Agreements**: Tailored experiences for different contexts:
    - **Corporate Mode**: For business, freelance, and other professional or legally-focused agreements.
    - **Casual Mode**: For everyday commitments between friends, family, and roommates.
    - **Relationship Mode**: A sensitive, thoughtful space for couples to create commitments that strengthen their bond.
- **User Authentication**: Secure sign-up and login with Google or Email/Password, powered by Firebase Authentication.
- **Agreement Dashboard**: View and manage all your agreements in one place with filtering capabilities.
- **Multi-Step Agreement Creation**: An intuitive, step-by-step process to create new agreements.
- **AI-Powered Suggestions**: Leverage Genkit and Google's Gemini models to get AI-generated suggestions for agreement terms based on the agreement type.
- **Secure & Tamper-Proof**: Every action is logged, providing a complete, court-ready evidence package.
- **Modern UI**: A clean and responsive user interface built with ShadCN UI and Tailwind CSS.

## Tech Stack

This project is built on a modern, robust tech stack:

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [ShadCN UI](https://ui.shadcn.com/)
- **Authentication**: [Firebase Authentication](https://firebase.google.com/docs/auth)
- **Database**: [Firestore](https://firebase.google.com/docs/firestore) (for storing user and agreement data)
- **Generative AI**: [Genkit](https://firebase.google.com/docs/genkit) with Google's Gemini models.
- **Deployment**: Firebase App Hosting

## Getting Started

This project is set up to run in Firebase Studio.

1.  **Install Dependencies**: The project comes with all necessary dependencies listed in `package.json`. They will be installed automatically.
2.  **Run the Development Server**:
    ```bash
    npm run dev
    ```
    This will start the Next.js development server, typically on `http://localhost:9002`.

3.  **Run the Genkit Development Server**:
    For the AI features to work, you also need to run the Genkit server in a separate terminal.
    ```bash
    npm run genkit:dev
    ```

## Project Structure

- `src/app/`: Contains all the routes and pages for the Next.js application.
  - `(app)/`: Authenticated routes like the dashboard and new agreement page.
  - `(auth)/`: Routes for login and signup.
  - `landing/`: The public landing page.
- `src/components/`: Shared React components, including UI components from ShadCN.
- `src/firebase/`: Configuration and hooks for Firebase services (Auth, Firestore).
- `src/ai/`: Contains the Genkit flows for AI-powered features.
- `src/lib/`: Shared utilities, data, and type definitions.
- `docs/backend.json`: A blueprint of the app's data models and Firestore structure.
