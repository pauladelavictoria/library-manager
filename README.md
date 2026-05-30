# 📚 Full-Stack E-Commerce & Management Platform

A full-stack e-commerce and management platform built to deliver a highly interactive, gamified library experience. Developed with **Next.js 15 (App Router)**, **React 19**, and strict **TypeScript**, the application features a robust headless UI architecture powered by **Radix UI** and **Tailwind CSS**. Data fetching and mutations are optimized using **TanStack React Query** and **Server Actions**, all backed by a real-time **Supabase PostgreSQL** database.

## 🚀 Technical Highlights & Architecture

### Modern Front-End Stack
*   **Framework**: Next.js 15 (App Router) leveraging the latest React 19 features.
*   **Language**: Strictly typed with TypeScript for robust, error-free development and excellent developer experience.
*   **Styling**: A scalable, utility-first approach using Tailwind CSS. 
*   **Component Architecture**: Implemented a custom, accessible design system utilizing **Radix UI** primitives, orchestrated with `class-variance-authority` (cva), `clsx`, and `tailwind-merge` for predictable and dynamic component styling (inspired by shadcn/ui patterns).

### Advanced Data Fetching & State Management
*   **Server-Side Rendering (SSR)**: Optimized page loads and SEO using Next.js Server Components.
*   **Data Mutations**: Secure form submissions and API calls using **Next.js Server Actions**, reducing client-side JavaScript.
*   **Client State & Caching**: Efficient data fetching, caching, and optimistic UI updates powered by **TanStack React Query**.
*   **Backend as a Service (BaaS)**: Fully integrated with **Supabase** (PostgreSQL) for database management and authentication (`@supabase/ssr`).

### Form Handling & Validation
*   **Type-Safe Forms**: End-to-end type safety for user inputs using **React Hook Form** coupled with **Zod** schema validation (`@hookform/resolvers`). This ensures robust client-side and server-side validation with minimal re-renders.

### Data Visualization & UI
*   **Interactive Dashboards**: Built comprehensive analytics dashboards for inventory and sales tracking.
*   **Charting Libraries**: Utilized **Recharts** for standard responsive charts and integrated **D3.js** (`d3-hierarchy`) for complex, custom data visualizations like packed bubble charts.
*   **Fluid Animations**: Enhanced User Experience with subtle micro-interactions and smooth transitions using `tailwindcss-animate`.
*   **Fuzzy Search**: Client-side, highly responsive search capabilities powered by **Fuse.js**, complementing server-side database filtering.

## 🧠 Key Design Patterns & Engineering Decisions

1.  **Separation of Concerns (RSC vs. Client Components)**: Strict boundary between Server Components (data fetching, heavy lifting) and Client Components (interactivity, hooks), minimizing the JavaScript bundle size shipped to the client.
2.  **Headless UI Approach**: By utilizing Radix UI, the application ensures full accessibility (WAI-ARIA compliance) and keyboard navigation without sacrificing design flexibility, a critical requirement for modern enterprise applications.
3.  **Optimistic Updates**: Using React Query to provide snappy, immediate responses to user actions before the server confirms the mutation, dramatically improving perceived performance.
4.  **Database-Level Computation**: Offloading heavy data aggregation (like sales statistics or inventory counts) to Supabase Views and SQL functions, rather than processing large datasets in the application layer.

## 📂 Project Structure Overview

*   `app/`: Next.js App Router structure (pages, layouts, routing conventions).
*   `components/`: Reusable UI components.
    *   `ui/`: Base design system components (buttons, inputs, dialogs).
*   `lib/`: Utility functions, Zod schemas, and Supabase client configurations.
*   `hooks/`: Custom React hooks for encapsulating complex client-side logic.

## ⚙️ Local Development Setup

To run this project locally and explore the codebase:

1.  **Install dependencies** (uses pnpm for fast, disk-space efficient installs):
    ```bash
    pnpm install
    ```
2.  **Environment Variables**: Create a `.env.local` file with your Supabase credentials:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```
3.  **Start the development server** (Uses Turbopack for lightning-fast HMR):
    ```bash
    pnpm dev
    ```
