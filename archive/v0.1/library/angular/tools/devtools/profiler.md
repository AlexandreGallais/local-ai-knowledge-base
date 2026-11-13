---
title: "Profile your application"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/tools/devtools/profiler.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Profile your application

The **Profiler** tab lets you visualize the execution of Angular's change detection.
This is useful for determining when and how change detection impacts your application's performance.

The Profiler tab lets you start profiling the current application or import an existing profile from a previous run.
To start profiling your application, hover over the circle in the top-left corner within the **Profiler** tab and click **Start recording**.

During profiling, Angular DevTools captures execution events, such as change detection and lifecycle hook execution.
Interact with your application to trigger change detection and generate data Angular DevTools can use.
To finish recording, click the circle again to **Stop recording**.

You can also import an existing recording.
Read more about this feature in the Import recording section.

## Understand your application's execution

After recording or importing a profile, Angular DevTools displays a visualization of change detection cycles.

Each bar in the sequence represents a change detection cycle in your app.
The taller a bar is, the longer the application spent running change detection in this cycle.
When you select a bar, DevTools displays useful information about it including:

- A bar chart with all the components and directives that it captured during this cycle
- How much time Angular spent running change detection in this cycle.
- An estimated frame rate as experienced by the user (if below 60fps)

## Understand component execution

The bar chart displayed after clicking on a change detection cycle displays a detailed view about how much time your application spent running change detection in that particular component or directive.

This example shows the total time spent by the `NgForOf` directive and which method was called on it.

## Hierarchical views

You can also visualize the change detection execution in a flame graph-like view.

Each tile in the graph represents an element on the screen at a specific position in the render tree.
For example, consider a change detection cycle where a `LoggedOutUserComponent` is removed and in its place Angular rendered a `LoggedInUserComponent`. In this scenario both components will be displayed in the same tile.

The x-axis represents the full time it took to render this change detection cycle.
The y-axis represents the element hierarchy. Running change detection for an element requires rendering its directives and child components.
Together, this graph visualizes which components are taking the longest time to render and where that time is going.

Each tile is colored depending on how much time Angular spent there.
Angular DevTools determines the intensity of the color by the time spent relative to the tile where rendering took the most time.

When you click on a certain tile, you'll see details about it in the panel on the right.
Double-clicking the tile zooms it in so you can more easily view its nested children.

## Debug change detection and `OnPush` components

Normally, the graph visualizes the time it takes to _render_ an application, for any given change detection frame. However some components such as `OnPush` components will only re-render if their input properties change. It can be useful to visualize the flame graph without these components for particular frames.

To visualize only the components in a change detection frame that went through the change detection process, select the **Change detection** checkbox at the top, above the flame graph.

This view highlights all the components that went through change detection and displays those that did not in gray, such as `OnPush` components that did not re-render.

## Import and export recordings

Click the **Save Profile** button at the top-right of a recorded profiling session to export it as a JSON file and save it to the disk.
Later, import the file in the initial view of the profiler by clicking the **Choose file** input.
