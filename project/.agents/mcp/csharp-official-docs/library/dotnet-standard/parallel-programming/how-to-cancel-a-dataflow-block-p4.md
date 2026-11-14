---
title: "How to: Cancel a Dataflow Block (part 4 of 6)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/how-to-cancel-a-dataflow-block.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Cancel a Dataflow Block (part 4 of 6)

```csharp
using System;
using System.Threading;
using System.Threading.Tasks;
using System.Threading.Tasks.Dataflow;
using System.Windows.Forms;

namespace CancellationWinForms
{
   public partial class Form1 : Form
   {
      // A placeholder type that performs work.
      class WorkItem
      {
         // Performs work for the provided number of milliseconds.
         public void DoWork(int milliseconds)
         {
            // For demonstration, suspend the current thread.
            Thread.Sleep(milliseconds);
         }
      }

      // Enables the user interface to signal cancellation.
      CancellationTokenSource cancellationSource;

      // The first node in the dataflow pipeline.
      TransformBlock<WorkItem, WorkItem> startWork;

      // The second, and final, node in the dataflow pipeline.
      ActionBlock<WorkItem> completeWork;

      // Increments the value of the provided progress bar.
      ActionBlock<ToolStripProgressBar> incrementProgress;

      // Decrements the value of the provided progress bar.
      ActionBlock<ToolStripProgressBar> decrementProgress;

      // Enables progress bar actions to run on the UI thread.
      TaskScheduler uiTaskScheduler;

      public Form1()
      {
         InitializeComponent();

         // Create the UI task scheduler from the current synchronization
         // context.
         uiTaskScheduler = TaskScheduler.FromCurrentSynchronizationContext();
      }

      // Creates the blocks that participate in the dataflow pipeline.
      private void CreatePipeline()
      {
         // Create the cancellation source.
         cancellationSource = new CancellationTokenSource();

         // Create the first node in the pipeline.
         startWork = new TransformBlock<WorkItem, WorkItem>(workItem =>
         {
            // Perform some work.
            workItem.DoWork(250);

            // Decrement the progress bar that tracks the count of
            // active work items in this stage of the pipeline.
            decrementProgress.Post(toolStripProgressBar1);

            // Increment the progress bar that tracks the count of
            // active work items in the next stage of the pipeline.
            incrementProgress.Post(toolStripProgressBar2);

            // Send the work item to the next stage of the pipeline.
            return workItem;
         },
         new ExecutionDataflowBlockOptions
         {
            CancellationToken = cancellationSource.Token
         });

         // Create the second, and final, node in the pipeline.
         completeWork = new ActionBlock<WorkItem>(workItem =>
         {
            // Perform some work.
            workItem.DoWork(1000);

            // Decrement the progress bar that tracks the count of
            // active work items in this stage of the pipeline.
            decrementProgress.Post(toolStripProgressBar2);

            // Increment the progress bar that tracks the overall
            // count of completed work items.
            incrementProgress.Post(toolStripProgressBar3);
         },
         new ExecutionDataflowBlockOptions
         {
            CancellationToken = cancellationSource.Token,
            MaxDegreeOfParallelism = 2
         });

         // Connect the two nodes of the pipeline. When the first node completes,
         // set the second node also to the completed state.
         startWork.LinkTo(
            completeWork, new DataflowLinkOptions { PropagateCompletion = true });

         // Create the dataflow action blocks that increment and decrement
         // progress bars.
         // These blocks use the task scheduler that is associated with
         // the UI thread.

         incrementProgress = new ActionBlock<ToolStripProgressBar>(
            progressBar => progressBar.Value++,
            new ExecutionDataflowBlockOptions
            {
               CancellationToken = cancellationSource.Token,
               TaskScheduler = uiTaskScheduler
            });

         decrementProgress = new ActionBlock<ToolStripProgressBar>(
            progressBar => progressBar.Value--,
            new ExecutionDataflowBlockOptions
            {
               CancellationToken = cancellationSource.Token,
               TaskScheduler = uiTaskScheduler
            });
      }

      // Event handler for the Add Work Items button.
      private void toolStripButton1_Click(object sender, EventArgs e)
      {
         // The Cancel button is disabled when the pipeline is not active.
         // Therefore, create the pipeline and enable the Cancel button
         // if the Cancel button is disabled.
         if (!toolStripButton2.Enabled)
         {
            CreatePipeline();

            // Enable the Cancel button.
            toolStripButton2.Enabled = true;
         }

         // Post several work items to the head of the pipeline.
         for (int i = 0; i < 5; i++)
         {
            toolStripProgressBar1.Value++;
            startWork.Post(new WorkItem());
         }
      }

      // Event handler for the Cancel button.
      private async void toolStripButton2_Click(object sender, EventArgs e)
      {
         // Disable both buttons.
         toolStripButton1.Enabled = false;
         toolStripButton2.Enabled = false;

         // Trigger cancellation.
         cancellationSource.Cancel();

         try
         {
            // Asynchronously wait for the pipeline to complete processing and for
            // the progress bars to update.
            await Task.WhenAll(
               completeWork.Completion,
               incrementProgress.Completion,
               decrementProgress.Completion);
         }
         catch (OperationCanceledException)
         {
         }

         // Increment the progress bar that tracks the number of cancelled
         // work items by the number of active work items.
         toolStripProgressBar4.Value += toolStripProgressBar1.Value;
         toolStripProgressBar4.Value += toolStripProgressBar2.Value;

         // Reset the progress bars that track the number of active work items.
         toolStripProgressBar1.Value = 0;
         toolStripProgressBar2.Value = 0;

         // Enable the Add Work Items button.
         toolStripButton1.Enabled = true;
      }

      ~Form1()
      {
         cancellationSource.Dispose();
      }
   }
}
```

5. Add the following method, `CreatePipeline`, to the `Form1` class.

     ```csharp
using System;
using System.Threading;
using System.Threading.Tasks;
using System.Threading.Tasks.Dataflow;
using System.Windows.Forms;

namespace CancellationWinForms
{
   public partial class Form1 : Form
   {
      // A placeholder type that performs work.
      class WorkItem
      {
         // Performs work for the provided number of milliseconds.
         public void DoWork(int milliseconds)
         {
            // For demonstration, suspend the current thread.
            Thread.Sleep(milliseconds);
         }
      }

      // Enables the user interface to signal cancellation.
      CancellationTokenSource cancellationSource;

      // The first node in the dataflow pipeline.
      TransformBlock<WorkItem, WorkItem> startWork;

      // The second, and final, node in the dataflow pipeline.
      ActionBlock<WorkItem> completeWork;

      // Increments the value of the provided progress bar.
      ActionBlock<ToolStripProgressBar> incrementProgress;

      // Decrements the value of the provided progress bar.
      ActionBlock<ToolStripProgressBar> decrementProgress;

      // Enables progress bar actions to run on the UI thread.
      TaskScheduler uiTaskScheduler;

      public Form1()
      {
         InitializeComponent();

         // Create the UI task scheduler from the current synchronization
         // context.
         uiTaskScheduler = TaskScheduler.FromCurrentSynchronizationContext();
      }

      // Creates the blocks that participate in the dataflow pipeline.
      private void CreatePipeline()
      {
         // Create the cancellation source.
         cancellationSource = new CancellationTokenSource();

         // Create the first node in the pipeline.
         startWork = new TransformBlock<WorkItem, WorkItem>(workItem =>
         {
            // Perform some work.
            workItem.DoWork(250);

            // Decrement the progress bar that tracks the count of
            // active work items in this stage of the pipeline.
            decrementProgress.Post(toolStripProgressBar1);

            // Increment the progress bar that tracks the count of
            // active work items in the next stage of the pipeline.
            incrementProgress.Post(toolStripProgressBar2);

            // Send the work item to the next stage of the pipeline.
            return workItem;
         },
         new ExecutionDataflowBlockOptions
         {
            CancellationToken = cancellationSource.Token
         });

         // Create the second, and final, node in the pipeline.
         completeWork = new ActionBlock<WorkItem>(workItem =>
         {
            // Perform some work.
            workItem.DoWork(1000);

            // Decrement the progress bar that tracks the count of
            // active work items in this stage of the pipeline.
            decrementProgress.Post(toolStripProgressBar2);

            // Increment the progress bar that tracks the overall
            // count of completed work items.
            incrementProgress.Post(toolStripProgressBar3);
         },
         new ExecutionDataflowBlockOptions
         {
            CancellationToken = cancellationSource.Token,
            MaxDegreeOfParallelism = 2
         });

         // Connect the two nodes of the pipeline. When the first node completes,
         // set the second node also to the completed state.
         startWork.LinkTo(
            completeWork, new DataflowLinkOptions { PropagateCompletion = true });

         // Create the dataflow action blocks that increment and decrement
         // progress bars.
         // These blocks use the task scheduler that is associated with
         // the UI thread.

         incrementProgress = new ActionBlock<ToolStripProgressBar>(
            progressBar => progressBar.Value++,
            new ExecutionDataflowBlockOptions
            {
               CancellationToken = cancellationSource.Token,
               TaskScheduler = uiTaskScheduler
            });

         decrementProgress = new ActionBlock<ToolStripProgressBar>(
            progressBar => progressBar.Value--,
            new ExecutionDataflowBlockOptions
            {
               CancellationToken = cancellationSource.Token,
               TaskScheduler = uiTaskScheduler
            });
      }

      // Event handler for the Add Work Items button.
      private void toolStripButton1_Click(object sender, EventArgs e)
      {
         // The Cancel button is disabled when the pipeline is not active.
         // Therefore, create the pipeline and enable the Cancel button
         // if the Cancel button is disabled.
         if (!toolStripButton2.Enabled)
         {
            CreatePipeline();

            // Enable the Cancel button.
            toolStripButton2.Enabled = true;
         }

         // Post several work items to the head of the pipeline.
         for (int i = 0; i < 5; i++)
         {
            toolStripProgressBar1.Value++;
            startWork.Post(new WorkItem());
         }
      }

      // Event handler for the Cancel button.
      private async void toolStripButton2_Click(object sender, EventArgs e)
      {
         // Disable both buttons.
         toolStripButton1.Enabled = false;
         toolStripButton2.Enabled = false;

         // Trigger cancellation.
         cancellationSource.Cancel();

         try
         {
            // Asynchronously wait for the pipeline to complete processing and for
            // the progress bars to update.
            await Task.WhenAll(
               completeWork.Completion,
               incrementProgress.Completion,
               decrementProgress.Completion);
         }
         catch (OperationCanceledException)
         {
         }

         // Increment the progress bar that tracks the number of cancelled
         // work items by the number of active work items.
         toolStripProgressBar4.Value += toolStripProgressBar1.Value;
         toolStripProgressBar4.Value += toolStripProgressBar2.Value;

         // Reset the progress bars that track the number of active work items.
         toolStripProgressBar1.Value = 0;
         toolStripProgressBar2.Value = 0;

         // Enable the Add Work Items button.
         toolStripButton1.Enabled = true;
      }

      ~Form1()
      {
         cancellationSource.Dispose();
      }
   }
}
```

 Because the `incrementProgress` and `decrementProgress` dataflow blocks act on the user interface, it is important that these actions occur on the user-interface thread. To accomplish this, during construction these objects each provide an `System.Threading.Tasks.Dataflow.ExecutionDataflowBlockOptions` object that has the `System.Threading.Tasks.Dataflow.DataflowBlockOptions.TaskScheduler` property set to `System.Threading.Tasks.TaskScheduler.FromCurrentSynchronizationContext*`. The `System.Threading.Tasks.TaskScheduler.FromCurrentSynchronizationContext*` method creates a `System.Threading.Tasks.TaskScheduler` object that performs work on the current synchronization context. Because the `Form1` constructor is called from the user-interface thread, the actions for the `incrementProgress` and `decrementProgress` dataflow blocks also run on the user-interface thread.

 This example sets the `System.Threading.Tasks.Dataflow.DataflowBlockOptions.CancellationToken` property when it constructs the members of the pipeline. Because the `System.Threading.Tasks.Dataflow.DataflowBlockOptions.CancellationToken` property permanently cancels dataflow block execution, the whole pipeline must be recreated after the user cancels the operation and then wants to add more work items to the pipeline. For an example that demonstrates an alternative way to cancel a dataflow block so that other work can be performed after an operation is canceled, see Walkthrough: Using Dataflow in a Windows Forms Application.
