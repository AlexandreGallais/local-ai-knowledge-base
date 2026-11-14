---
title: "Zone.js Testing Utilities"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/guide/testing/zone-js-testing-utilities.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Zone.js Testing Utilities

This guide describes testing utilities primarily used for managing and controlling async tasks in unit tests. These utilities are essentially the Zone.js-specific mock clock utilities, particularly relevant for controlling the flow of asynchronous operations within tests.

For general Angular testing utilities, including `TestBed` and `ComponentFixture`, see the Testing Utility APIs guide.

Here's a summary of Zone.js-specific functions:

| Function               | Details                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :--------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `waitForAsync`         | Tracks async tasks and completes the tests only once there are no longer any micro or macrotasks remaining in the test zone.                                                                                                                                                                                                                                                                                                                                                                                                               |
| `fakeAsync`            | Runs the body of a test \(`it`\) within a special _fakeAsync test zone_, enabling a linear control flow coding style.                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `tick`                 | Simulates the passage of time and the completion of pending asynchronous activities by flushing both _timer_ and _micro-task_ queues within the _fakeAsync test zone_. The curious, dedicated reader might enjoy this lengthy blog post, "_Tasks, microtasks, queues and schedules_". Accepts an optional argument that moves the virtual clock forward by the specified number of milliseconds, clearing asynchronous activities scheduled within that timeframe. |
| `discardPeriodicTasks` | Discards any periodic tasks (e.g. `setInterval`) that were created inside the `fakeAsync` Zone.                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `flushMicrotasks`      | When a `fakeAsync()` test ends with pending _micro-tasks_ such as unresolved promises, the test fails with a clear error message.  In general, a test should wait for micro-tasks to finish. When pending microtasks are expected, call `flushMicrotasks` to flush the _micro-task_ queue and avoid the error.                                                                                                                                                                                                                       |
