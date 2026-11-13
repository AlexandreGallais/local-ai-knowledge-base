---
title: "Walkthrough: Using Dataflow in a Windows Forms Application (part 8 of 12)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/walkthrough-using-dataflow-in-a-windows-forms-application.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Walkthrough: Using Dataflow in a Windows Forms Application (part 8 of 12)

Because the `displayCompositeBitmap` and `operationCancelled` dataflow blocks act on the user interface, it is important that these actions occur on the user-interface thread. To accomplish this, during construction, these objects each provide an `System.Threading.Tasks.Dataflow.ExecutionDataflowBlockOptions` object that has the `System.Threading.Tasks.Dataflow.DataflowBlockOptions.TaskScheduler` property set to `System.Threading.Tasks.TaskScheduler.FromCurrentSynchronizationContext*`. The `System.Threading.Tasks.TaskScheduler.FromCurrentSynchronizationContext*` method creates a `System.Threading.Tasks.TaskScheduler` object that performs work on the current synchronization context. Because the `CreateImageProcessingNetwork` method is called from the handler of the **Choose Folder** button, which runs on the user-interface thread, the actions for the `displayCompositeBitmap` and `operationCancelled` dataflow blocks also run on the user-interface thread.

 This example uses a shared cancellation token instead of setting the `System.Threading.Tasks.Dataflow.DataflowBlockOptions.CancellationToken` property because the `System.Threading.Tasks.Dataflow.DataflowBlockOptions.CancellationToken` property permanently cancels dataflow block execution. A cancellation token enables this example to reuse the same dataflow network multiple times, even when the user cancels one or more operations. For an example that uses `System.Threading.Tasks.Dataflow.DataflowBlockOptions.CancellationToken` to permanently cancel the execution of a dataflow block, see How to: Cancel a Dataflow Block.
