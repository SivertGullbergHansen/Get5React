<img src="gh/logo_text.png">

-----

Welcome to Get5React, a React-based implementation of the popular Get5 Panel!

Get5React is created out of a passion for LAN parties and Open Source Software. While it's still in its early stages, I'm excited to share its progress with you.

This project is designed to work seamlessly with the popular CS2 plugin [MatchZy](https://github.com/shobhit-pathak/MatchZy). However, any plugin compatible with the original Get5 panel should, in theory, also work.

> [!CAUTION]
> This project is under active development and may undergo significant changes. Use it as inspiration and provide feedback rather than relying on it heavily at this stage.

## Features ✨

- [x] **Steam Authentication:** Secure login using Steam credentials.

## Planned Features 🚀

- [ ] **Docker Deployment:** Simplify the deployment process.
- [ ] **Player Registration:** Allow players to register for matches.
- [ ] **Team Management:** Create and manage teams.
- [ ] **Match Tracking:** Track ongoing (real-time) and past matches.
- [ ] **Map Management:** Manage maps available for matches.
- [ ] **Player Rating:** Analyze player performance and generate ELO ratings.
- [ ] **Demo Parsing:** Review match performance per player.
- [ ] **Demo Player:** Watch match replays directly in your browser.
- [ ] _More features coming soon!_

If you're familiar with Get5, these features should be familiar.

> [!IMPORTANT]
> Due to how Next.js handles environment variables in static files during the build process, adding this project to a docker-compose stack is currently not possible. Additionally, database schema migrations are required, complicating this method.

## Getting Started 👟

### Prerequisites 👌

- **PostgreSQL Database:** Ensure you have a PostgreSQL database set up.
- **Bun** (or any JavaScript runtime): Required for running database migrations, the development server and managing dependencies.

### 0. Set Up

1. **Clone the Repository:**

   ```sh
   git clone https://github.com/yourusername/Get5React.git get5react
   cd get5react
   ```

2. **Configure Environment Variables:**

   Copy the example environment file:

   ```sh
   cp .env.example .env
   ```

   Edit the copied `.env` file and set the required variables:

   ```sh
   # Steam API Key - Obtain from https://steamcommunity.com/dev/apikey
   STEAM_SECRET="long_string_here"

   # Your domain
   NEXTAUTH_URL="http://localhost:3000"

   # Generated secret - Please generate a new secret
   NEXTAUTH_SECRET="uHUIArmOK0Za6pY9KtIuhsiu0UYGJPEc"

   # Database URL - Update username, password, localhost, and db_name
   DATABASE_URL="postgresql://username:password@localhost:5432/db_name?schema=public"
   ```

3. **Run Database Migrations:**

   Set up your database schema using Prisma:

   ```sh
   npx prisma migrate deploy
   ```

   Your database is now set up with the correct tables and relational keys.

### 1. Deployment

The easiest way to deploy Get5React is using [Docker](https://www.docker.com/).

1. **Build the Docker Image:**

   ```sh
   docker build --tag=get5react .
   ```

2. **Start the Docker Container:**

   ```sh
   docker run --name=get5react -p 3000:3000 -d get5react
   ```

   You can now access Get5React at `http://localhost:3000`.

### 2. Development

1. **Install Dependencies:**

   Ensure you have a JavaScript runtime installed (e.g., [bun](https://bun.sh/)):

   ```sh
   bun install
   ```

2. **Start the Development Server:**

   ```sh
   bun dev
   ```

   You can now access Get5React at `http://localhost:3000`.

## Roadmap 🚙

- [ ] **Split Code into Multiple Packages:** Enhance readability and project structure for easier future development.

## Demo 🖥️

_(Coming soon!)_

## Contributions 🤝

Contributions are highly welcome! Whether you're interested in coding, testing, or providing feedback, your help is greatly appreciated. Please fork the repository and submit pull requests.

## How Can I Support This? 🌟

Share Get5React with your friends! The more people who know about it, the more feedback and contributions we can gather to improve it further.
