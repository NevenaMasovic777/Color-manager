### Key Sections:

1. **Prerequisites**: Node.js version 18+ or 20+

2. **Getting Started**: git clone and cd to color-manager folder

3. **Running the Application**:
   To run server, stay in the root folder and:
   1. run npm install
   2. npm run dev

- this will start server on port 300
- if you want to change the port, you can do so by updating PORT variable in _server.js_ file and by changing target property in _vite.config.ts_ to `http://localhost:PORT_NAME`application.
- Since there's no database, you don't need to install or configure additional software like MySQL, PostgreSQL, or MongoDB.
- If necessary, you can manually edit the data.json file to add, update, or remove data.

  How It Works:
  The application reads data from the data.json file at runtime.
  Any changes made by the application (e.g., adding or removing data) are saved back to the data.json file.
  If you need to reset or modify the data, you can manually edit the _data.json_ file.

  To run frontend application, go to /frontend folder and:

  1.  run npm install
  2.  npm run dev

- This will start the application on `http://localhost:5173/`
- App is ready to use

4. **Linting**:
   This project uses ESLint to enforce consistent coding styles and catch potential errors in the codebase.

Run ESLint to check for errors:

```bash
npm run lint
```

. If there are any rule breaks, exceptions will be shown in console

5. **Testing**:
   This project uses **[Vitest](https://vitest.dev/)** for testing. Vitest is a fast and modern testing framework designed for Vite-based applications.

**Run all tests**:

```bash
npm run test
```
