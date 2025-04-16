# 💸 Salary Calculator + AI Quality of Life Estimator

This is a **Next.js** project that calculates salary in **Net**, **Gross**, or **Employer Cost** formats based on one of the provided values. It also uses **OpenAI's API** to generate an **AI evaluation** of the quality of life the given salary could provide in the specified location.

## ✨ Features

- ✅ Convert between **Net**, **Gross**, and **Employer Cost** salary
- 🤖 Get an **AI-generated quality of life analysis** based on your salary

## 📦 Tech Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [Langchain](https://www.langchain.com/)
- [OpenAI API](https://platform.openai.com/docs/)
- [Tailwind CSS](https://tailwindcss.com/)

## 🛠 Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rasmus0000/nextjs-salary-calculator
   cd nextjs-salary-calculator
2. **Install dependencies**
    ```bash
    npm install
    # or
    yarn install

3. **Create a local environment file**
   ```bash
   cp .env.example .env.local

4. **Add API key**
   open .env.local and add:
   OPENAI_API_KEY=your-openai-api-key
