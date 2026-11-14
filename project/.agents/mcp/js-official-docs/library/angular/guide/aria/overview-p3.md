---
title: "Angular Aria (part 3 of 3)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/aria/overview.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Angular Aria (part 3 of 3)

- **Keyboard navigation**. Users need to open the menu with Enter or Space, navigate options with arrow keys, select with Enter, and close with Escape.
- **Screen readers** need to announce the menu's state, the number of options, and which option has focus.
- **Focus management** needs to move logically between the trigger and menu items.
- **Right-to-left languages** require the ability to navigate in reverse.

## What's included?

Angular Aria includes directives with comprehensive documentation, working examples and API references for common interactive patterns:

### Search and selection

| Component                               | Description                                                    |
| --------------------------------------- | -------------------------------------------------------------- |
| Autocomplete | Text input with filtered suggestions that appear as users type |
| Listbox           | Single or multi-select option lists with keyboard navigation   |
| Select             | Single-selection dropdown pattern with keyboard navigation     |
| Multiselect   | Multiple-selection dropdown pattern with compact display       |
| Combobox         | Primitive directive that coordinates a text input with a popup |

### Navigation and call to actions

| Component                     | Description                                                |
| ----------------------------- | ---------------------------------------------------------- |
| Menu       | Dropdown menus with nested submenus and keyboard shortcuts |
| Menubar | Horizontal navigation bar for persistent application menus |
| Toolbar | Grouped sets of controls with logical keyboard navigation  |

### Content organization

| Component                         | Description                                                            |
| --------------------------------- | ---------------------------------------------------------------------- |
| Accordion | Collapsible content panels that can expand individually or exclusively |
| Tabs           | Tabbed interfaces with automatic or manual activation modes            |
| Tree           | Hierarchical lists with expand/collapse functionality                  |
| Grid           | Two-dimensional data display with cell-by-cell keyboard navigation     |

## When to use Angular Aria

Angular Aria works well when you need accessible interactive components that are WCAG compliant with custom styling. Examples include:

- **Building a design system** - Your team maintains a component library with specific visual standards that need accessible implementations
- **Enterprise component libraries** - You're creating reusable components for multiple applications within an organization
- **Custom brand requirements** - The interface needs to match precise design specifications that pre-styled component libraries cannot easily accommodate

## When not to use Angular Aria

Angular Aria might not fit every scenario:

- **Pre-styled components** - If you need components that look complete without custom styling, use Angular Material instead
- **Simple forms** - Native HTML form controls like `` and `` provide built-in accessibility for straightforward use cases
- **Rapid prototyping** - When validating concepts quickly, pre-styled component libraries reduce initial development time

## Next steps

Check out a component from the side nav or list above, or start with Toolbar to see a complete example of how Angular Aria directives work!
