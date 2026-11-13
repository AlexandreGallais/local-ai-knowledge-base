---
title: "Inspect the component tree"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/tools/devtools/component.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Inspect the component tree

## Debug your application

The **Components** tab lets you explore the structure of your application.
You can visualize the component and directive instances in the DOM and inspect or modify their state.

### Explore the application structure

The component tree displays a hierarchical relationship of the _components and directives_ within your application.

Click the individual components or directives in the component explorer to select them and preview their properties.
Angular DevTools displays properties and metadata on the right side of the component tree.

To look up a component or directive by name use the search box above the component tree.

### Navigate to the host node

To go to the host element of a particular component or directive, double-click it in the component explorer.
Angular DevTools will open the Elements tab in Chrome or the Inspector tab in Firefox, and select the associated DOM node.

### Navigate to source

For components, Angular DevTools lets you navigate to the component definition in the Sources tab (Chrome) and Debugger tab (Firefox).
After you select a particular component, click the icon at the top-right of the properties view:

` icon. An adjacent tooltip reads 'Open component source'.">

### Update property value

Like browsers' DevTools, the properties view lets you edit the value of an input, output, or other properties.
Right-click on the property value and if edit functionality is available for this value type, a text input will appear.
Type the new value and press `Enter` to apply this value to the property.

### Access selected component or directive in console

As a shortcut in the console, Angular DevTools provides access to instances of recently selected components or directives.
Type `$ng0` to get a reference to the instance of the currently selected component or directive, and type `$ng1` for the previously selected instance, `$ng2` for the instance selected before that, and so on.

### Select a directive or component

Similar to browsers' DevTools, you can inspect the page to select a particular component or directive.
Click the **_Inspect element_** icon in the top left corner within Angular DevTools and hover over a DOM element on the page.
The extension recognizes the associated directives and/or components and lets you select the corresponding element in the Component tree.

` label displayed in an adjacent tooltip.">

### Inspect Deferrable views

Alongside the directives, the directive tree also includes `@defer` blocks.

Clicking a defer block shows more details in the properties sidebar: the different optional blocks (for example `@loading`, `@placeholder`, and `@error`), the configured triggers (defer triggers, prefetch triggers, and hydrate triggers), and timing options such as the `minimum` and `after` values.

### Hydration

When hydration is enabled on your SSR/SSG application, the directive tree shows the hydration status of each component.

In case of errors, an error message is displayed on the affected component.

The hydration status can also be visualized on the application itself by enabling the overlay.

Here is an illustration of the hydration overlays on a Angular e-shop example app.

### Debug the signal graph

To visualize how the signals, computeds, and effects of a component depend on each other, see Debug the signal graph.
