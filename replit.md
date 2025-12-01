# QRCGenius

## Overview

QRCGenius is a free, client-side QR code generator web application built with React and Express. The application allows users to create customizable QR codes for various content types (URLs, WiFi credentials, vCards, locations, etc.) without requiring sign-up or storing any user data. All QR code generation happens in the browser using the `qrcode` library, with customization options for colors, size, error correction, and logo embedding. The application features a modern, responsive UI built with shadcn/ui components and Tailwind CSS, supporting both light and dark themes.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR and optimized production builds
- Wouter for lightweight client-side routing (single-page application with Home and NotFound routes)

**UI Component System**
- shadcn/ui (New York style) component library built on Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- CSS variables for theme support (light/dark mode toggling)
- Design inspired by Canva and Google's Material Design with emphasis on clean lines and ample whitespace

**State Management & Data Fetching**
- TanStack Query (React Query) for server state management
- Local component state with React hooks for UI interactions
- localStorage for persisting recent QR code history and theme preferences
- No global state management library (Redux/Zustand) as application is primarily client-side

**QR Code Generation**
- Client-side generation using `qrcode` library (no server-side processing)
- Supports multiple output formats: PNG (canvas-based) and SVG (vector)
- Customization options: size, foreground/background colors, error correction levels (L/M/Q/H), and logo embedding
- Real-time preview with debounced updates for performance

**Key Components Structure**
- `Header`: Fixed navigation with theme toggle and smooth scroll navigation
- `Hero`: Landing section with gradient background and demo QR code
- `QRGenerator`: Main form card with accordion-based customization panel, color presets, and download functionality
- `Examples`: Pre-configured QR code templates with modal previews
- `FAQ`: Accordion-based frequently asked questions
- `Footer`: Privacy policy and terms dialogs, social links
- `ThemeProvider`: Context-based theme management with system preference detection

### Backend Architecture

**Server Framework**
- Express.js with TypeScript for type safety
- HTTP server created via Node's `http` module (prepared for WebSocket upgrades if needed)
- Middleware stack: JSON body parsing, URL-encoded form parsing, custom logging

**Development vs Production**
- Development: Vite dev server middleware integrated with Express for HMR
- Production: Static file serving from `dist/public` directory with SPA fallback routing
- Build process uses esbuild for server bundling with selective dependency bundling

**API Structure**
- Routes defined in `server/routes.ts` with `/api` prefix convention
- Currently minimal backend logic as QR generation is client-side
- Storage interface abstraction (`IStorage`) for potential future database integration

**Logging & Error Handling**
- Custom request/response logging middleware capturing duration and status codes
- Differentiated logging for API vs static file requests
- Runtime error overlay in development via Replit plugins

### Data Storage Solutions

**Current Implementation: In-Memory Storage**
- `MemStorage` class implementing `IStorage` interface
- Simple Map-based user storage (id → User object)
- UUID-based user ID generation via Node's `crypto` module

**Database Schema (Prepared for PostgreSQL)**
- Drizzle ORM configured for PostgreSQL dialect
- Schema defined in `shared/schema.ts` with `users` table:
  - `id`: UUID primary key with auto-generation
  - `username`: Unique text field
  - `password`: Text field for hashed passwords
- Zod schemas for runtime validation (`insertUserSchema`)
- Connection via Neon Database serverless driver (`@neondatabase/serverless`)
- Migrations output to `./migrations` directory

**Session Management (Prepared)**
- `connect-pg-simple` for PostgreSQL-backed sessions (not yet active)
- Session configuration ready for integration with Express session middleware

### Authentication & Authorization

**Current State**: Not implemented - application is designed to be authentication-free

**Prepared Infrastructure**:
- Passport.js dependencies included for potential future user accounts
- User schema and storage interface ready for authentication flow
- No current authorization requirements as all features are public

### External Dependencies

**Core Libraries**
- `qrcode` (v1.5.6): Client-side QR code generation with canvas and SVG support
- `@tanstack/react-query` (v5.60.5): Async state management and data fetching
- `wouter`: Minimal routing library (<2KB)
- `zod`: Runtime type validation and schema definition
- `date-fns`: Date manipulation utilities

**UI Framework**
- `@radix-ui/*`: Unstyled, accessible component primitives (accordion, dialog, slider, etc.)
- `tailwindcss`: Utility-first CSS framework
- `class-variance-authority`: Type-safe variant styling
- `cmdk`: Command palette component
- `lucide-react`: Icon library
- `react-icons`: Additional icon sets (Social icons via `si-*`)

**Database & ORM**
- `drizzle-orm` (v0.39.1): Type-safe ORM with PostgreSQL support
- `@neondatabase/serverless`: Serverless PostgreSQL driver for Neon Database
- `drizzle-kit`: CLI for migrations and schema management
- `drizzle-zod`: Automatic Zod schema generation from Drizzle schemas

**Development Tools**
- `vite`: Frontend build tool and dev server
- `esbuild`: Server-side bundling for production
- `tsx`: TypeScript execution for development and build scripts
- `@replit/vite-plugin-*`: Replit-specific development enhancements (error overlay, cartographer, dev banner)

**Build & Deployment**
- Production build combines Vite frontend build + esbuild server bundle
- Server bundle externalizes most dependencies except allowlisted packages for cold start optimization
- Static assets served from `dist/public` with SPA fallback routing

**Environment Variables**
- `DATABASE_URL`: PostgreSQL connection string (required for database operations)
- `NODE_ENV`: Development vs production environment flag