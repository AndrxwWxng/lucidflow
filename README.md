# LucidFlow 🧠✨🌊

Your personal AI-powered study companion!

LucidFlow is a comprehensive web application designed as an all-in-one dashboard to enhance your study sessions. It combines AI assistance, task management, planning, note-taking, and focus tools into a single, streamlined interface.

## ✨ Core Features

*   **AI Study Assistant 🤖:** Get explanations and answers to your study questions via a chat interface (powered by Groq ⚡).
*   **Study Tasks ✅:** Manage your learning workflow with a dedicated Kanban board (To Do, In Progress, Done).
*   **Focus Timer ⏱️:** Utilize a built-in Pomodoro timer (e.g., 25 minutes) to structure focused study intervals.
*   **Study Planner 🗓️:** Schedule and track upcoming study sessions by subject, topic, and duration. View completed sessions and stats.
*   **Study Notes 📝:** Create, edit, categorize, search, and sort rich study notes within the app.
*   **Study Music 🎵:** Integrate and control Spotify playlists directly within the app to set the mood for studying.
*   **Calculator 🧮:** Perform quick calculations without leaving the app.
*   **Customization:** Includes Dark/Light mode toggle 🌙/☀️ and settings access.

## 🛠️ Tech Stack

*   **Framework:** Next.js (App Router)
*   **Language:** TypeScript / React
*   **Styling:** Tailwind CSS
*   **AI Inference:** Groq

## 🚀 Live Demo

Check out the live version of LucidFlow here:

➡️ **https://lucidflow.vercel.app/** ⬅️

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18 or later recommended)
*   npm, yarn, or pnpm
*   Groq API Key (required for the AI Study Assistant feature - see Groq documentation)

### Installation

1.  Clone the repo:
    ```bash
    git clone https://github.com/your-username/lucidflow.git # Replace with your repo URL
    cd lucidflow
    ```
2.  Install NPM packages:
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```
3.  Set up environment variables:
    *   Create a `.env.local` file in the root directory.
    *   Add your Groq API key: `GROQ_API_KEY=your_api_key_here`

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result 💻.

## 🤔 How to Use

1.  Start a focused study session using the **Focus Timer**.
2.  Ask questions or request explanations from the **AI Study Assistant**.
3.  Add and manage tasks on the **Study Tasks** Kanban board.
4.  Plan future study blocks with the **Study Planner**.
5.  Capture key information in the **Study Notes** section.
6.  Link a Spotify playlist URL under **Study Music** to listen while you work.
7.  Use the **Calculator** for any quick math needs.
8.  Customize your view using the **Dark/Light mode** toggle.

## 🌱 Future Ideas

*   Implement persistence for tasks, notes, and planner sessions (e.g., using local storage or a database).
*   Add full Spotify API integration for searching playlists within the app.
*   Develop the "Stats" tab in the Study Planner.
*   Refine AI capabilities (e.g., summarizing notes, generating quizzes from notes).
*   Implement user authentication.

---

Happy Learning! 😊
