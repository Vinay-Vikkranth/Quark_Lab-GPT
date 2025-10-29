# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

Steps to run the website
npm i react-markdown remark-gfm

On terminal 1
1.npm install
2.chmod +x node_modules/.bin/vite
3.rm -rf node_modules package-lock.json
4.npm install
5.npm run dev

On terminal 2
1.pip install langchain langchain-community pypdf chromadb sentence-transformers flask
2.ollama run llama3
or ollama run llama3.2:1b

On terminal 3
1.source .venv/bin/activate
or .venv\Scripts\Activate.ps1
2.cd backend
3.pip show python-multipart 4. pip install fastapi uvicorn python-multipart
5.uvicorn main:app --reload
(or) python run.py
