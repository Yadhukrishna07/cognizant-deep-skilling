angular.json — Workspace configuration file for the Angular CLI; defines build targets, file paths, styles/scripts, and production budgets for the project.

tsconfig.json — Base TypeScript compiler configuration shared across the entire workspace (app, tests, etc.).

tsconfig.app.json — Extends tsconfig.json with settings specific to compiling the application source code (excludes test files).

package.json — Lists project dependencies, devDependencies, and npm scripts (ng serve, ng build, ng test) used to run and manage the project.

src/main.ts — The application's entry point; bootstraps the root standalone component (App) using bootstrapApplication() along with the app.config.ts providers.

src/app/app.config.ts — Standalone Angular's replacement for app.module.ts; registers app-wide providers such as the router and HTTP client.

src/app/app.ts — The root component of the application; contains the <router-outlet> where routed views are rendered.

src/index.html — The single HTML page the Angular app bootstraps into; contains the root <app-root> element.