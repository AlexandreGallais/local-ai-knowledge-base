---
title: "How to: Use Components That Support the Event-based Asynchronous Pattern (part 1 of 5)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/asynchronous-programming-patterns/how-to-use-components-that-support-the-event-based-asynchronous-pattern.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Use Components That Support the Event-based Asynchronous Pattern

Many components provide you with the option of performing their work asynchronously. The `System.Media.SoundPlayer` and `System.Windows.Forms.PictureBox` components, for example, enable you to load sounds and images "in the background" while your main thread continues running without interruption.

 Using asynchronous methods on a class that supports the Event-based Asynchronous Pattern Overview can be as simple as attaching an event handler to the component's _MethodName_**Completed** event, just as you would for any other event. When you call the _MethodName_**Async** method, your application will continue running without interruption until the _MethodName_**Completed** event is raised. In your event handler, you can examine the `System.ComponentModel.AsyncCompletedEventArgs` parameter to determine if the asynchronous operation successfully completed or if it was canceled.

 For more information about using event handlers, see Event Handlers Overview.

 The following procedure shows how to use the asynchronous image-loading capability of a `System.Windows.Forms.PictureBox` control.
