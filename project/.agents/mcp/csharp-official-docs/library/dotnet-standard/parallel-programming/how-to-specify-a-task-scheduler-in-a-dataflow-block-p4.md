---
title: "How to: Specify a Task Scheduler in a Dataflow Block (part 4 of 5)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/how-to-specify-a-task-scheduler-in-a-dataflow-block.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Specify a Task Scheduler in a Dataflow Block (part 4 of 5)

```csharp
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Threading.Tasks.Dataflow;
using System.Windows.Forms;

namespace WriterReadersWinForms
{
   public partial class Form1 : Form
   {
      // Broadcasts values to an ActionBlock<int> object that is associated
      // with each check box.
      BroadcastBlock<int> broadcaster = new BroadcastBlock<int>(null);

      public Form1()
      {
         InitializeComponent();

         // Create an ActionBlock<CheckBox> object that toggles the state
         // of CheckBox objects.
         // Specifying the current synchronization context enables the
         // action to run on the user-interface thread.
         var toggleCheckBox = new ActionBlock<CheckBox>(checkBox =>
         {
            checkBox.Checked = !checkBox.Checked;
         },
         new ExecutionDataflowBlockOptions
         {
            TaskScheduler = TaskScheduler.FromCurrentSynchronizationContext()
         });

         // Create a ConcurrentExclusiveSchedulerPair object.
         // Readers will run on the concurrent part of the scheduler pair.
         // The writer will run on the exclusive part of the scheduler pair.
         var taskSchedulerPair = new ConcurrentExclusiveSchedulerPair();

         // Create an ActionBlock<int> object for each reader CheckBox object.
         // Each ActionBlock<int> object represents an action that can read
         // from a resource in parallel to other readers.
         // Specifying the concurrent part of the scheduler pair enables the
         // reader to run in parallel to other actions that are managed by
         // that scheduler.
         var readerActions =
            from checkBox in new CheckBox[] {checkBox1, checkBox2, checkBox3}
            select new ActionBlock<int>(milliseconds =>
            {
               // Toggle the check box to the checked state.
               toggleCheckBox.Post(checkBox);

               // Perform the read action. For demonstration, suspend the current
               // thread to simulate a lengthy read operation.
               Thread.Sleep(milliseconds);

               // Toggle the check box to the unchecked state.
               toggleCheckBox.Post(checkBox);
            },
            new ExecutionDataflowBlockOptions
            {
               TaskScheduler = taskSchedulerPair.ConcurrentScheduler
            });

         // Create an ActionBlock<int> object for the writer CheckBox object.
         // This ActionBlock<int> object represents an action that writes to
         // a resource, but cannot run in parallel to readers.
         // Specifying the exclusive part of the scheduler pair enables the
         // writer to run in exclusively with respect to other actions that are
         // managed by the scheduler pair.
         var writerAction = new ActionBlock<int>(milliseconds =>
         {
            // Toggle the check box to the checked state.
            toggleCheckBox.Post(checkBox4);

            // Perform the write action. For demonstration, suspend the current
            // thread to simulate a lengthy write operation.
            Thread.Sleep(milliseconds);

            // Toggle the check box to the unchecked state.
            toggleCheckBox.Post(checkBox4);
         },
         new ExecutionDataflowBlockOptions
         {
            TaskScheduler = taskSchedulerPair.ExclusiveScheduler
         });

         // Link the broadcaster to each reader and writer block.
         // The BroadcastBlock<T> class propagates values that it
         // receives to all connected targets.
         foreach (var readerAction in readerActions)
         {
            broadcaster.LinkTo(readerAction);
         }
         broadcaster.LinkTo(writerAction);

         // Start the timer.
         timer1.Start();
      }

      // Event handler for the timer.
      private void timer1_Tick(object sender, EventArgs e)
      {
         // Post a value to the broadcaster. The broadcaster
         // sends this message to each target.
         broadcaster.Post(1000);
      }
   }
}
```

6. In the `Form1` constructor, start the `System.Windows.Forms.Timer` object.

     ```csharp
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Threading.Tasks.Dataflow;
using System.Windows.Forms;

namespace WriterReadersWinForms
{
   public partial class Form1 : Form
   {
      // Broadcasts values to an ActionBlock<int> object that is associated
      // with each check box.
      BroadcastBlock<int> broadcaster = new BroadcastBlock<int>(null);

      public Form1()
      {
         InitializeComponent();

         // Create an ActionBlock<CheckBox> object that toggles the state
         // of CheckBox objects.
         // Specifying the current synchronization context enables the
         // action to run on the user-interface thread.
         var toggleCheckBox = new ActionBlock<CheckBox>(checkBox =>
         {
            checkBox.Checked = !checkBox.Checked;
         },
         new ExecutionDataflowBlockOptions
         {
            TaskScheduler = TaskScheduler.FromCurrentSynchronizationContext()
         });

         // Create a ConcurrentExclusiveSchedulerPair object.
         // Readers will run on the concurrent part of the scheduler pair.
         // The writer will run on the exclusive part of the scheduler pair.
         var taskSchedulerPair = new ConcurrentExclusiveSchedulerPair();

         // Create an ActionBlock<int> object for each reader CheckBox object.
         // Each ActionBlock<int> object represents an action that can read
         // from a resource in parallel to other readers.
         // Specifying the concurrent part of the scheduler pair enables the
         // reader to run in parallel to other actions that are managed by
         // that scheduler.
         var readerActions =
            from checkBox in new CheckBox[] {checkBox1, checkBox2, checkBox3}
            select new ActionBlock<int>(milliseconds =>
            {
               // Toggle the check box to the checked state.
               toggleCheckBox.Post(checkBox);

               // Perform the read action. For demonstration, suspend the current
               // thread to simulate a lengthy read operation.
               Thread.Sleep(milliseconds);

               // Toggle the check box to the unchecked state.
               toggleCheckBox.Post(checkBox);
            },
            new ExecutionDataflowBlockOptions
            {
               TaskScheduler = taskSchedulerPair.ConcurrentScheduler
            });

         // Create an ActionBlock<int> object for the writer CheckBox object.
         // This ActionBlock<int> object represents an action that writes to
         // a resource, but cannot run in parallel to readers.
         // Specifying the exclusive part of the scheduler pair enables the
         // writer to run in exclusively with respect to other actions that are
         // managed by the scheduler pair.
         var writerAction = new ActionBlock<int>(milliseconds =>
         {
            // Toggle the check box to the checked state.
            toggleCheckBox.Post(checkBox4);

            // Perform the write action. For demonstration, suspend the current
            // thread to simulate a lengthy write operation.
            Thread.Sleep(milliseconds);

            // Toggle the check box to the unchecked state.
            toggleCheckBox.Post(checkBox4);
         },
         new ExecutionDataflowBlockOptions
         {
            TaskScheduler = taskSchedulerPair.ExclusiveScheduler
         });

         // Link the broadcaster to each reader and writer block.
         // The BroadcastBlock<T> class propagates values that it
         // receives to all connected targets.
         foreach (var readerAction in readerActions)
         {
            broadcaster.LinkTo(readerAction);
         }
         broadcaster.LinkTo(writerAction);

         // Start the timer.
         timer1.Start();
      }

      // Event handler for the timer.
      private void timer1_Tick(object sender, EventArgs e)
      {
         // Post a value to the broadcaster. The broadcaster
         // sends this message to each target.
         broadcaster.Post(1000);
      }
   }
}
```

7. On the form designer for the main form, create an event handler for the `System.Windows.Forms.Timer.Tick` event for the timer.

8. Implement the `System.Windows.Forms.Timer.Tick` event for the timer.

     ```csharp
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Threading.Tasks.Dataflow;
using System.Windows.Forms;

namespace WriterReadersWinForms
{
   public partial class Form1 : Form
   {
      // Broadcasts values to an ActionBlock<int> object that is associated
      // with each check box.
      BroadcastBlock<int> broadcaster = new BroadcastBlock<int>(null);

      public Form1()
      {
         InitializeComponent();

         // Create an ActionBlock<CheckBox> object that toggles the state
         // of CheckBox objects.
         // Specifying the current synchronization context enables the
         // action to run on the user-interface thread.
         var toggleCheckBox = new ActionBlock<CheckBox>(checkBox =>
         {
            checkBox.Checked = !checkBox.Checked;
         },
         new ExecutionDataflowBlockOptions
         {
            TaskScheduler = TaskScheduler.FromCurrentSynchronizationContext()
         });

         // Create a ConcurrentExclusiveSchedulerPair object.
         // Readers will run on the concurrent part of the scheduler pair.
         // The writer will run on the exclusive part of the scheduler pair.
         var taskSchedulerPair = new ConcurrentExclusiveSchedulerPair();

         // Create an ActionBlock<int> object for each reader CheckBox object.
         // Each ActionBlock<int> object represents an action that can read
         // from a resource in parallel to other readers.
         // Specifying the concurrent part of the scheduler pair enables the
         // reader to run in parallel to other actions that are managed by
         // that scheduler.
         var readerActions =
            from checkBox in new CheckBox[] {checkBox1, checkBox2, checkBox3}
            select new ActionBlock<int>(milliseconds =>
            {
               // Toggle the check box to the checked state.
               toggleCheckBox.Post(checkBox);

               // Perform the read action. For demonstration, suspend the current
               // thread to simulate a lengthy read operation.
               Thread.Sleep(milliseconds);

               // Toggle the check box to the unchecked state.
               toggleCheckBox.Post(checkBox);
            },
            new ExecutionDataflowBlockOptions
            {
               TaskScheduler = taskSchedulerPair.ConcurrentScheduler
            });

         // Create an ActionBlock<int> object for the writer CheckBox object.
         // This ActionBlock<int> object represents an action that writes to
         // a resource, but cannot run in parallel to readers.
         // Specifying the exclusive part of the scheduler pair enables the
         // writer to run in exclusively with respect to other actions that are
         // managed by the scheduler pair.
         var writerAction = new ActionBlock<int>(milliseconds =>
         {
            // Toggle the check box to the checked state.
            toggleCheckBox.Post(checkBox4);

            // Perform the write action. For demonstration, suspend the current
            // thread to simulate a lengthy write operation.
            Thread.Sleep(milliseconds);

            // Toggle the check box to the unchecked state.
            toggleCheckBox.Post(checkBox4);
         },
         new ExecutionDataflowBlockOptions
         {
            TaskScheduler = taskSchedulerPair.ExclusiveScheduler
         });

         // Link the broadcaster to each reader and writer block.
         // The BroadcastBlock<T> class propagates values that it
         // receives to all connected targets.
         foreach (var readerAction in readerActions)
         {
            broadcaster.LinkTo(readerAction);
         }
         broadcaster.LinkTo(writerAction);

         // Start the timer.
         timer1.Start();
      }

      // Event handler for the timer.
      private void timer1_Tick(object sender, EventArgs e)
      {
         // Post a value to the broadcaster. The broadcaster
         // sends this message to each target.
         broadcaster.Post(1000);
      }
   }
}
```

 Because the `toggleCheckBox` dataflow block acts on the user interface, it is important that this action occur on the user-interface thread. To accomplish this, during construction this object provides an `System.Threading.Tasks.Dataflow.ExecutionDataflowBlockOptions` object that has the `System.Threading.Tasks.Dataflow.DataflowBlockOptions.TaskScheduler` property set to `System.Threading.Tasks.TaskScheduler.FromCurrentSynchronizationContext*`. The `System.Threading.Tasks.TaskScheduler.FromCurrentSynchronizationContext*` method creates a `System.Threading.Tasks.TaskScheduler` object that performs work on the current synchronization context. Because the `Form1` constructor is called from the user-interface thread, the action for the `toggleCheckBox` dataflow block also runs on the user-interface thread.

 This example also uses the `System.Threading.Tasks.ConcurrentExclusiveSchedulerPair` class to enable some dataflow blocks to act concurrently, and another dataflow block to act exclusive with respect to all other dataflow blocks that run on the same `System.Threading.Tasks.ConcurrentExclusiveSchedulerPair` object. This technique is useful when multiple dataflow blocks share a resource and some require exclusive access to that resource, because it eliminates the requirement to manually synchronize access to that resource. The elimination of manual synchronization can make code more efficient.
