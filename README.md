<div align="center">
  <a href="https://www.codechefvit.com" target="_blank">
    <img src="https://i.ibb.co/4J9LXxS/cclogo.png" width="160" title="CodeChef-VIT" alt="Codechef-VIT">
  </a>

  <h1>Cook-Off 10.0 Portal</h1>

  <p>
    CookOff 10.0 featured an in-house developed portal, the platform where we hosted the 10th edition of our premier competitive coding challenge, uniting hundreds of coders in an intense contest. This platform is designed to provide a seamless and robust experience for participants, featuring a powerful code editor, real-time scoring, and persistent progress tracking.
  </p>

  <p>
    <a href="https://cookoff.codechefvit.com/">
      <img src="https://img.shields.io/badge/STATUS-LIVE-green?style=for-the-badge" alt="Live">
    </a>
    <a href="https://github.com/CodeChefVIT/cookoff-portal-10.0/pulls">
      <img src="https://img.shields.io/badge/PRs-WELCOME-blue?style=for-the-badge" alt="PRs Welcome">
    </a>
    <a href="https://github.com/CodeChefVIT/cookoff-portal-10.0/blob/main/LICENSE">
      <img src="https://img.shields.io/badge/LICENSE-MIT-yellow?style=for-the-badge" alt="License">
    </a>
  </p>
</div>

## 🚀 Deploy

The portal is deployed and accessible at:
**[https://cookoff.codechefvit.com/](https://cookoff.codechefvit.com/)**

## 🛠️ Tech Stack

This project is built with a modern, robust, and scalable tech stack:

- **Framework**: [Next.js](https://nextjs.org/) (with Turbopack)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with `tailwind-merge` and `clsx`
- **UI Components**: [Shadcn/UI](https://ui.shadcn.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Code Editor**: [CodeMirror](https://codemirror.net/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Authentication**: [Firebase Authentication](https://firebase.google.com/docs/auth)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

## ✨ Features

- **Advanced Code Editor**: Powered by CodeMirror, supporting multiple languages (Python, Java, C++, etc.), themes, and keybindings.
- **Progress Restoration**: Your code, selected language, and current round are automatically saved to `localStorage`, allowing you to resume your session anytime.
- **Auto-Submission**: Code is automatically submitted when the timer runs out, ensuring no progress is lost.
- **Resizable Layout**: A flexible and resizable panel layout to customize your workspace.
- **Real-time Scoreboard**: Users can monitor their scores in real time as they complete rounds.
- **Multi-language Support**: The portal uses the Monaco editor, with support for many languages like Python, Java, C++, etc.
- **Secure Authentication**:
- **Real-time Compiler Feedback**: Get instant feedback on your code with detailed compiler messages and test case results.

## 📸 Screenshots

### Login

<img src="/public/login.png" alt="Login" width="100%">

### Dashboard

<img src="/public/dashboard.png" alt="Dashboard" width="100%">

### Kitchen

<img src="/public/kitchen.jpg" alt="Kitchen" width="100%">

---

## 🏛️ Frontend System Design & State Management

The application is designed as a highly interactive and real-time single-page application (SPA) built on Next.js. The frontend architecture is centered around a clean, component-based structure and a centralized state management system.

### Frontend Architecture

1.  **Component-Based Structure**: The UI is built using React and organized into a set of reusable components. Larger components, such as the `Dashboard` and `Editor`, are composed of smaller, more focused components.

2.  **Routing**: Next.js App Router is used for navigation, providing a file-system-based routing mechanism that supports nested layouts and server-side rendering.

3.  **State Management**: Zustand is employed for global state management. It offers a simple, unopinionated, and scalable way to manage state that is shared across multiple components, such as user authentication status, editor content, and submission results.

### Zustand State Management (`useKitchenStore`)

The core of the application's state is managed by a single Zustand store, `useKitchenStore`. This store is the single source of truth for the "Kitchen" (the main coding environment).

- **State Slices**: The store is organized into logical slices:

  - **Session State**: `round`, `selectedQuestionId`, `submissionStatus`.
  - **Editor State**: `codeByQuestion`, `languageByQuestion`, `selectedLanguage`.
  - **Data**: `questions`, `testCases`.
  - **UI State**: `fullScreenEditor`, `showModal`, etc.
  - **Results**: `testResults`, `compilerDetails`.

- **Persistence**: The `persist` middleware is used to save critical state to `localStorage`. This includes:

  - `codeByQuestion`: The code for each question.
  - `languageByQuestion`: The selected language for each question.
  - `round`: The user's current round.

  This ensures that a user can refresh the page or close the tab without losing their progress.

- **Component Interaction**:
  - **`Editor`**: The editor component reads and writes code to the store using `setCodeForQuestion`.
  - **`LanguageSelector`**: This component updates the `selectedLanguage` and `languageByQuestion` slices.
  - **`TestCases`**: Displays results from `testResults` and `compilerDetails`.

---

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v20 or later)
- pnpm

### Installation

1.  Fork the repository.
2.  Clone your forked repository:
    ```bash
    git clone https://github.com/<Your-Username>/cookoff-portal-10.0.git
    ```
3.  Install the dependencies:
    ```bash
    pnpm install
    ```
4.  Set up your environment variables by creating a `.env` file. You can use `example.env` as a template.
5.  Start the development server:
    ```bash
    pnpm dev
    ```

The application will be available at `http://localhost:3000`.

## 🔗 Related Projects

- **Backend**: [https://github.com/CodeChefVIT/cookoff-10.0-be](https://github.com/CodeChefVIT/cookoff-10.0-be)
- **Admin Panel**: [https://github.com/CodeChefVIT/cookoff-admin-X](https://github.com/CodeChefVIT/cookoff-admin-X)

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 🚀 Contributors (Alphabetical)

<table align="center">
<tr align="center">
<td>
<p align="center">
<img src="https://avatars.githubusercontent.com/Abh1noob" width="120" height="120" alt="Abhinav Ganeshan Kalpathy" style="border-radius:50%">
</p>
<p align="center">
<a href="https://github.com/Abh1noob" target="_blank">Abhinav Ganeshan Kalpathy</a>
</p>
<p align="center">
<a href="https://github.com/Abh1noob"><img src="http://www.iconninja.com/files/241/825/211/round-collaboration-social-github-code-circle-network-icon.svg" width="36" height="36" alt="GitHub"/></a>
<a href="https://www.linkedin.com/in/abhinav-gk/">
<img src="http://www.iconninja.com/files/863/607/751/network-linkedin-social-connection-circular-circle-media-icon.svg" width="36" height="36" alt="LinkedIn"/>
</a>
</p>
</td>
<td>
<p align="center">
<img src="https://avatars.githubusercontent.com/abhitrueprogrammer" width="120" height="120" alt="Abhinav Pant" style="border-radius:50%">
</p>
<p align="center">
<a href="https://github.com/abhitrueprogrammer" target="_blank">Abhinav Pant</a>
</p>
<p align="center">
<a href="https://github.com/abhitrueprogrammer"><img src="http://www.iconninja.com/files/241/825/211/round-collaboration-social-github-code-circle-network-icon.svg" width="36" height="36" alt="GitHub"/></a>
<a href="https://www.linkedin.com/in/abhinav-pant-081b79243/">
<img src="http://www.iconninja.com/files/863/607/751/network-linkedin-social-connection-circular-circle-media-icon.svg" width="36" height="36" alt="LinkedIn"/>
</a>
</p>
</td>
<td>
<p align="center">
<img src="https://avatars.githubusercontent.com/Advik-Gupta" width="120" height="120" alt="Advik Gupta" style="border-radius:50%">
</p>
<p align="center">
<a href="https://github.com/Advik-Gupta" target="_blank">Advik Gupta</a>
</p>
<p align="center">
<a href="https://github.com/Advik-Gupta"><img src="http://www.iconninja.com/files/241/825/211/round-collaboration-social-github-code-circle-network-icon.svg" width="36" height="36" alt="GitHub"/></a>
<a href="https://www.linkedin.com/in/advik-guptaa">
<img src="http://www.iconninja.com/files/863/607/751/network-linkedin-social-connection-circular-circle-media-icon.svg" width="36" height="36" alt="LinkedIn"/>
</a>
</p>
</td>
<td>
<p align="center">
<img src="https://avatars.githubusercontent.com/equestrian2296" width="120" height="120" alt="Atharva Sharma" style="border-radius:50%">
</p>
<p align="center">
<a href="https://github.com/equestrian2296" target="_blank">Atharva Sharma</a>
</p>
<p align="center">
<a href="https://github.com/equestrian2296"><img src="http://www.iconninja.com/files/241/825/211/round-collaboration-social-github-code-circle-network-icon.svg" width="36" height="36" alt="GitHub"/></a>
<a href="https://www.linkedin.com/in/atharva-sharma-vit">
<img src="http://www.iconninja.com/files/863/607/751/network-linkedin-social-connection-circular-circle-media-icon.svg" width="36" height="36" alt="LinkedIn"/>
</a>
</p>
</td>
</tr>
<tr align="center">
<td>
<p align="center">
<img src="https://avatars.githubusercontent.com/edum0" width="120" height="120" alt="Edum Shivansh Gupta" style="border-radius:50%">
</p>
<p align="center">
<a href="https://github.com/edum0" target="_blank">Edum Shivansh Gupta</a>
</p>
<p align="center">
<a href="https://github.com/edum0"><img src="http://www.iconninja.com/files/241/825/211/round-collaboration-social-github-code-circle-network-icon.svg" width="36" height="36" alt="GitHub"/></a>
<a href="mailto:etg9415@gmail.com">
<img src="https://img.icons8.com/color/48/000000/gmail-new.png" width="36" height="36" alt="Email"/>
</a>
</p>
</td>
<td>
<p align="center">
<img src="https://avatars.githubusercontent.com/naren06-afk" width="120" height="120" alt="Narendra Sadhukhan" style="border-radius:50%">
</p>
<p align="center">
<a href="https://github.com/naren06-afk" target="_blank">Narendra Sadhukhan</a>
</p>
<p align="center">
<a href="https://github.com/naren06-afk"><img src="http://www.iconninja.com/files/241/825/211/round-collaboration-social-github-code-circle-network-icon.svg" width="36" height="36" alt="GitHub"/></a>
<a href="mailto:hemlockharry9@gmail.com">
<img src="https://img.icons8.com/color/48/000000/gmail-new.png" width="36" height="36" alt="Email"/>
</a>
</p>
</td>
<td>
<p align="center">
<img src="https://avatars.githubusercontent.com/samyamehta16" width="120" height="120" alt="Samya Mehta" style="border-radius:50%">
</p>
<p align="center">
<a href="https://github.com/samyamehta16" target="_blank">Samya Mehta</a>
</p>
<p align="center">
<a href="https://github.com/samyamehta16"><img src="http://www.iconninja.com/files/241/825/211/round-collaboration-social-github-code-circle-network-icon.svg" width="36" height="36" alt="GitHub"/></a>
<a href="https://www.linkedin.com/in/samyamehta16">
<img src="http://www.iconninja.com/files/863/607/751/network-linkedin-social-connection-circular-circle-media-icon.svg" width="36" height="36" alt="LinkedIn"/>
</a>
</p>
</td>
<td>
<p align="center">
<img src="https://avatars.githubusercontent.com/Skywalker-organa" width="120" height="120" alt="Sanjana Shyamsundar" style="border-radius:50%">
</p>
<p align="center">
<a href="https://github.com/Skywalker-organa" target="_blank">Sanjana Shyamsundar</a>
</p>
<p align="center">
<a href="https://github.com/Skywalker-organa"><img src="http://www.iconninja.com/files/241/825/211/round-collaboration-social-github-code-circle-network-icon.svg" width="36" height="36" alt="GitHub"/></a>
</p>
</td>
</tr>
<tr align="center">
<td>
<p align="center">
<img src="https://avatars.githubusercontent.com/ShouryaUpadhyaya" width="120" height="120" alt="Shourya Upadhyaya" style="border-radius:50%">
</p>
<p align="center">
<a href="https://github.com/ShouryaUpadhyaya" target="_blank">Shourya Upadhyaya</a>
</p>
<p align="center">
<a href="https://github.com/ShouryaUpadhyaya"><img src="http://www.iconninja.com/files/241/825/211/round-collaboration-social-github-code-circle-network-icon.svg" width="36" height="36" alt="GitHub"/></a>
<a href="https://in.linkedin.com/in/shourya-upadhyaya-998535332">
<img src="http://www.iconninja.com/files/863/607/751/network-linkedin-social-connection-circular-circle-media-icon.svg" width="36" height="36" alt="LinkedIn"/>
</a>
</p>
</td>
<td>
<p align="center">
<img src="https://avatars.githubusercontent.com/smritisreeram" width="120" height="120" alt="smritisreeram" style="border-radius:50%">
</p>
<p align="center">
<a href="https://github.com/smritisreeram" target="_blank">smritisreeram</a>
</p>
<p align="center">
<a href="https://github.com/smritisreeram"><img src="http://www.iconninja.com/files/241/825/211/round-collaboration-social-github-code-circle-network-icon.svg" width="36" height="36" alt="GitHub"/></a>
</p>
</td>
<td>
<p align="center">
<img src="https://avatars.githubusercontent.com/upayanmazumder" width="120" height="120" alt="Upayan Mazumder" style="border-radius:50%">
</p>
<p align="center">
<a href="https://github.com/upayanmazumder" target="_blank">Upayan Mazumder</a>
</p>
<p align="center">
<a href="https://github.com/upayanmazumder"><img src="http://www.iconninja.com/files/241/825/211/round-collaboration-social-github-code-circle-network-icon.svg" width="36" height="36" alt="GitHub"/></a>
<a href="https://www.linkedin.com/in/upayanmazumder/">
<img src="http://www.iconninja.com/files/863/607/751/network-linkedin-social-connection-circular-circle-media-icon.svg" width="36" height="36" alt="LinkedIn"/>
</a>
</p>
</td>
<td>
<p align="center">
<img src="https://avatars.githubusercontent.com/RustyDev24" width="120" height="120" alt="Vedant Matanhelia" style="border-radius:50%">
</p>
<p align="center">
<a href="https://github.com/RustyDev24" target="_blank">Vedant Matanhelia</a>
</p>
<p align="center">
<a href="https://github.com/RustyDev24"><img src="http://www.iconninja.com/files/241/825/211/round-collaboration-social-github-code-circle-network-icon.svg" width="36" height="36" alt="GitHub"/></a>
<a href="mailto:vedant.matanhelia@gmail.com">
<img src="https://img.icons8.com/color/48/000000/gmail-new.png" width="36" height="36" alt="Email"/>
</a>
</p>
</td>
</tr>
</table>

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="center">
  Made with ❤️ by <a href="https://www.codechefvit.com" target="_blank">CodeChef-VIT</a>
</p>
