
# Angular Kanban Board

A modern, professional Kanban board built with Angular, Angular Material, and Angular CDK. This project demonstrates advanced frontend engineering practices, modular architecture, robust state management, and a polished user experience. Perfect for real-world productivity use.

## Features

- **Modern UI/UX**: Responsive, accessible, and visually appealing design using Angular Material.
- **Drag & Drop**: Move cards and columns with smooth animations (powered by Angular CDK).
- **Undo/Redo**: Full undo/redo support for all board actions, using stack-based state management.
- **LocalStorage Persistence**: Board state is saved in the browser, with SSR/browser safety.
- **Modular Architecture**: Standalone, reusable components and services for maintainability and scalability.
- **Card & Column Editing**: Rename, delete, and add cards/columns with dialogs and inline actions.
- **Color Picker**: Assign custom colors to columns.
- **Tech Used Info**: Floating info button opens a dialog with project tech/concepts.
- **Accessibility**: Keyboard navigation, focus states, and ARIA labels throughout.

## Folder Structure

```
angular-kanban/
├── src/
│   └── app/
│       ├── kanban/
│       │   ├── kanban-board.component.ts      # Main Kanban board logic
│       │   ├── kanban-board.component.html    # Board UI
│       │   ├── kanban-board.component.scss    # Board styles
│       │   ├── kanban-card.component.ts       # Card UI/logic
│       │   ├── kanban-card.component.scss     # Card styles
│       │   ├── kanban-storage.service.ts      # LocalStorage persistence
│       │   └── create-card-dialog.component.ts# Dialog for card creation/edit
│       ├── app.component.ts                   # App shell
│       ├── app.component.html
│       ├── app.component.scss
│       └── ...
├── angular.json
├── package.json
└── ...
```

## Key Concepts & Libraries

- **Angular**: Component-based architecture, standalone components, dependency injection.
- **Angular Material**: UI components, dialogs, buttons, icons, theming.
- **Angular CDK**: Drag & drop, accessibility utilities.
- **SweetAlert2**: Modern dialogs for editing, confirmation, and color picking.
- **State Management**: Immutable state, undo/redo stacks, localStorage sync.
- **Accessibility**: ARIA labels, keyboard support, focus management.

## Usage

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Run the app locally:**
   ```sh
   npm start
   ```
3. **Build for production:**
   ```sh
   npm run build
   ```


## 📸 Screenshots

### Board view
![Board View](https://github.com/m-n9/kanban-board/blob/main/screenshots/app-screen.png?raw=true)

### Card view
![Card View](https://github.com/m-n9/kanban-board/blob/main/screenshots/tech-used-screen.png?raw=true)


## Why This Project?

- Showcases advanced Angular and frontend engineering skills.
- Demonstrates modular, scalable architecture and best practices.
- Delivers a robust, user-friendly Kanban experience for real-world use.

---

© 2025 Your Name. All rights reserved.
