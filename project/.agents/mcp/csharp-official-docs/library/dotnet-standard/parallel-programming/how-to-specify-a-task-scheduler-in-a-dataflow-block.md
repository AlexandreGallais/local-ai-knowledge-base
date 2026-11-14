---
title: "How to: Specify a Task Scheduler in a Dataflow Block (part 1 of 5)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/how-to-specify-a-task-scheduler-in-a-dataflow-block.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Specify a Task Scheduler in a Dataflow Block

This document demonstrates how to associate a specific task scheduler when you use dataflow in your application. The example uses the `System.Threading.Tasks.ConcurrentExclusiveSchedulerPair` class in a Windows Forms application to show when reader tasks are active and when a writer task is active. It also uses the `System.Threading.Tasks.TaskScheduler.FromCurrentSynchronizationContext*` method to enable a dataflow block to run on the user-interface thread.

> **Note:**
> The TPL dataflow library (the `System.Threading.Tasks.Dataflow` namespace) is included in .NET 6 and later versions. For .NET Framework and .NET Standard projects, you need to install the 📦 System.Threading.Tasks.Dataflow NuGet package.

## To Create the Windows Forms Application

1. Create a Visual C# or Visual Basic **Windows Forms Application** project. In the following steps, the project is named `WriterReadersWinForms`.

2. On the form designer for the main form, Form1.cs (Form1.vb for Visual Basic), add four `System.Windows.Forms.CheckBox` controls. Set the `System.Windows.Forms.Control.Text` property to **Reader 1** for `checkBox1`, **Reader 2** for `checkBox2`, **Reader 3** for `checkBox3`, and **Writer** for `checkBox4`. Set the `System.Windows.Forms.Control.Enabled` property for each control to `False`.

3. Add a `System.Windows.Forms.Timer` control to the form. Set the `System.Windows.Forms.Timer.Interval` property to `2500`.
