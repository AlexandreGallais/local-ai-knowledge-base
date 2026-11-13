---
title: "How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 1 of 102)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/asynchronous-programming-patterns/component-that-supports-the-event-based-asynchronous-pattern.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Implement a Component That Supports the Event-based Asynchronous Pattern

If you are writing a class with some operations that may incur noticeable delays, consider giving it asynchronous functionality by implementing the Event-based Asynchronous Pattern.

 This walkthrough illustrates how to create a component that implements the Event-based Asynchronous Pattern. It is implemented using helper classes from the `System.ComponentModel` namespace, which ensures that the component works correctly under any application model, including ASP.NET, Console applications and Windows Forms applications. This component is also designable with a `System.Windows.Forms.PropertyGrid` control and your own custom designers.

 When you are through, you will have an application that computes prime numbers asynchronously. Your application will have a main user interface (UI) thread and a thread for each prime number calculation. Although testing whether a large number is prime can take a noticeable amount of time, the main UI thread will not be interrupted by this delay, and the form will be responsive during the calculations. You will be able to run as many calculations as you like concurrently and selectively cancel pending calculations.

 Tasks illustrated in this walkthrough include:

- Creating the Component

- Defining Public Asynchronous Events and Delegates

- Defining Private Delegates

- Implementing Public Events

- Implementing the Completion Method

- Implementing the Worker Methods

- Implementing Start and Cancel Methods

 To copy the code in this topic as a single listing, see How to: Implement a Client of the Event-based Asynchronous Pattern.

## Creating the Component

 The first step is to create the component that will implement the Event-based Asynchronous Pattern.

### To create the component

- Create a class called `PrimeNumberCalculator` that inherits from `System.ComponentModel.Component`.
