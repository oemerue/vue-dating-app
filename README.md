VueDating - Dating Web Application
A modern, responsive dating platform built with Vue.js 3, TypeScript, and TailwindCSS.

Project Overview
VueDating is a web application designed to help people find meaningful connections. Users can create profiles, browse other members, and interact through an intuitive interface.

Tech Stack
Framework: Vue.js 3 (Composition API)

Language: TypeScript

Styling: TailwindCSS 4

State Management: Pinia

Routing: Vue Router 4

Build Tool: Vite

Validation: Yup (planned)

HTTP Client: Axios (planned)

Project Structure
text
vue-dating-app/
├── src/
│   ├── assets/              # Static assets (images, fonts)
│   ├── components/          # Vue components
│   │   ├── atoms/           # Basic UI elements (Button, Input, Badge)
│   │   ├── molecules/       # Composite components (ProfileCard, SearchBar)
│   │   └── organisms/       # Complex components (NavBar, Modal)
│   ├── composables/         # Reusable composition functions
│   │   └── useModal.ts      # Modal state management
│   ├── data/                # Mock data
│   │   └── mockProfiles.ts  # Sample user profiles
│   ├── router/              # Vue Router configuration
│   │   └── index.ts         # Routes definition
│   ├── stores/              # Pinia stores
│   │   └── user.ts          # User state management
│   ├── types/               # TypeScript type definitions
│   │   └── profile.types.ts # Profile interfaces
│   ├── views/               # Page components
│   │   ├── HomeView.vue
│   │   ├── ProfilesView.vue
│   │   ├── LoginView.vue
│   │   ├── RegisterView.vue
│   │   ├── HelpView.vue
│   │   └── ImprintView.vue
│   ├── App.vue             # Root component
│   └── main.ts             # Application entry point
├── public/                 # Public static files
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── REA