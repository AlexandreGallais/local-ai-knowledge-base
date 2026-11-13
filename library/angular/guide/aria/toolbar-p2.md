---
title: "Toolbar (part 2 of 7)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/aria/toolbar.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Toolbar (part 2 of 7)

## Usage

Toolbar works best for grouping related controls that users access frequently. Consider using toolbar when:

- **Multiple related actions** - You have several controls that perform related functions (like text formatting buttons)
- **Keyboard efficiency matters** - Users benefit from quick keyboard navigation through arrow keys
- **Grouped controls** - You need to organize controls into logical sections with separators
- **Frequent access** - Controls are used repeatedly within a workflow

Avoid toolbar when:

- A simple button group is sufficient - For just 2-3 unrelated actions, individual buttons work better
- Controls aren't related - Toolbar implies a logical grouping; unrelated controls confuse users
- Complex nested navigation - Deep hierarchies are better served by menus or navigation components

## Features

Angular's toolbar provides a fully accessible toolbar implementation with:

- **Keyboard Navigation** - Navigate widgets with arrow keys, Home, and End using roving tabindex, while controls retain native activation
- **Screen Reader Support** - Built-in ARIA attributes for assistive technologies
- **Widget Groups** - Organize related widgets like radio button groups or toggle button groups
- **Flexible Orientation** - Horizontal or vertical layouts with automatic keyboard navigation
- **Signal-Based Reactivity** - Reactive state management using Angular signals
- **Bidirectional Text Support** - Automatically handles right-to-left (RTL) languages
- **Configurable Focus** - Choose between wrapping navigation or hard stops at edges
