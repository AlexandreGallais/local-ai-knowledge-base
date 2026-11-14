---
title: "DevTools Overview"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/tools/devtools/overview.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# DevTools Overview

Angular DevTools is a browser extension that provides debugging and profiling capabilities for Angular applications.

Install Angular DevTools from the Chrome Web Store or from Firefox Addons.

You can open Chrome or Firefox DevTools on any web page by pressing `F12` or <kbd>`Ctrl`+`Shift`+`I`</kbd> (Windows or Linux) and <kbd>`Fn`+`F12`</kbd> or <kbd>`Cmd`+`Option`+`I`</kbd> (Mac).
Once browser DevTools is open and Angular DevTools is installed, you can find it under the "Angular" tab.

HELPFUL: Chrome's new tab page does not run installed extensions, so the Angular tab will not appear in DevTools. Visit any other page to see it.

## Open your application

When you open the extension, you'll see four additional tabs:

| Tabs                                      | Details                                                                                                                |
| :---------------------------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| Components    | Lets you explore the components and directives in your application and preview or edit their state.                    |
| Profiler       | Lets you profile your application and understand what the performance bottleneck is during change detection execution. |
| Injector Tree | Lets you visualize the Environment and Element Injector hierarchy                                                      |
| Router Tree      | Lets you visualize the routing tree of your application.                                                               |

A `Transfer State` tab also appears when the application uses hydration.

HELPFUL: For users of Chromium based browsers, you might be interested in the Performance panel integration.

In the top-right corner of Angular DevTools you'll find the information button which open a popover.
The information popover contains among others what version of Angular is running on the page as well as the devtools version.

### Angular application not detected

If you see an error message "Angular application not detected" when opening Angular DevTools, this means it is not able to communicate with an Angular app on the page.
The most common reason for this is because the web page you are inspecting does not contain an Angular application.
Double check that you are inspecting the right web page and that the Angular app is running.

### We detected an application built with production configuration

If you see an error message "We detected an application built with production configuration. Angular DevTools only supports development builds.", this means that an Angular application was found on the page, but it was compiled with production optimizations.
When compiling for production, Angular CLI removes various debug features to minimize the amount of the JavaScript on the page to improve performance. This includes features needed to communicate with DevTools.

To run DevTools, you need to compile your application with optimizations disabled. `ng serve` does this by default.
If you need to debug a deployed application, disable optimizations in your build with the `optimization` configuration option (`{"optimization": false}`).
