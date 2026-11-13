---
title: "How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 94 of 102)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/asynchronous-programming-patterns/component-that-supports-the-event-based-asynchronous-pattern.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 94 of 102)

```csharp
            this.cancelButton.Size = new System.Drawing.Size(88, 23);
            this.cancelButton.TabIndex = 1;
            this.cancelButton.Text = "Cancel";
            this.cancelButton.Click += new System.EventHandler(this.cancelButton_Click);
            //
            // startAsyncButton
            //
            this.startAsyncButton.Location = new System.Drawing.Point(24, 24);
            this.startAsyncButton.Name = "startAsyncButton";
            this.startAsyncButton.Size = new System.Drawing.Size(88, 23);
            this.startAsyncButton.TabIndex = 0;
            this.startAsyncButton.Text = "Start New Task";
            this.startAsyncButton.Click += new System.EventHandler(this.startAsyncButton_Click);
            //
            // listView1
            //
            this.listView1.Columns.AddRange(new System.Windows.Forms.ColumnHeader[] {
                this.testNumberColHeader,
                this.progressColHeader,
                this.currentColHeader,
                this.taskIdColHeader,
                this.resultColHeader,
                this.firstDivisorColHeader});
            this.listView1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.listView1.FullRowSelect = true;
            this.listView1.GridLines = true;
            this.listView1.Location = new System.Drawing.Point(3, 16);
            this.listView1.Name = "listView1";
            this.listView1.Size = new System.Drawing.Size(602, 160);
            this.listView1.TabIndex = 0;
            this.listView1.View = System.Windows.Forms.View.Details;
            //
            // testNumberColHeader
            //
            this.testNumberColHeader.Text = "Test Number";
            this.testNumberColHeader.Width = 80;
            //
            // progressColHeader
            //
            this.progressColHeader.Text = "Progress";
            //
            // currentColHeader
            //
            this.currentColHeader.Text = "Current";
            //
            // taskIdColHeader
            //
            this.taskIdColHeader.Text = "Task ID";
            this.taskIdColHeader.Width = 200;
            //
            // resultColHeader
            //
            this.resultColHeader.Text = "Result";
            this.resultColHeader.Width = 80;
            //
            // firstDivisorColHeader
            //
            this.firstDivisorColHeader.Text = "First Divisor";
            this.firstDivisorColHeader.Width = 80;
            //
            // panel2
            //
            this.panel2.Location = new System.Drawing.Point(200, 128);
            this.panel2.Name = "panel2";
            this.panel2.TabIndex = 2;
            //
            // PrimeNumberCalculatorMain
            //
            this.ClientSize = new System.Drawing.Size(608, 254);
            this.Controls.Add(this.taskGroupBox);
            this.Name = "PrimeNumberCalculatorMain";
            this.Text = "Prime Number Calculator";
            this.taskGroupBox.ResumeLayout(false);
            this.buttonPanel.ResumeLayout(false);
            this.ResumeLayout(false);
        }

    }

    /////////////////////////////////////////////////////////////

    public delegate void ProgressChangedEventHandler(
        ProgressChangedEventArgs e);

    public delegate void CalculatePrimeCompletedEventHandler(
        object sender,
        CalculatePrimeCompletedEventArgs e);

    // This class implements the Event-based Asynchronous Pattern.
    // It asynchronously computes whether a number is prime or
    // composite (not prime).
    public class PrimeNumberCalculator : Component
    {
        private delegate void WorkerEventHandler(
            int numberToCheck,
            AsyncOperation asyncOp);

        private SendOrPostCallback onProgressReportDelegate;
        private SendOrPostCallback onCompletedDelegate;

        private HybridDictionary userStateToLifetime =
            new HybridDictionary();

        private System.ComponentModel.Container components = null;

        /////////////////////////////////////////////////////////////

        public event ProgressChangedEventHandler ProgressChanged;
        public event CalculatePrimeCompletedEventHandler CalculatePrimeCompleted;

        /////////////////////////////////////////////////////////////

        public PrimeNumberCalculator(IContainer container)
        {
            container.Add(this);
            InitializeComponent();

            InitializeDelegates();
        }

        public PrimeNumberCalculator()
        {
            InitializeComponent();

            InitializeDelegates();
        }

        protected virtual void InitializeDelegates()
        {
            onProgressReportDelegate =
                new SendOrPostCallback(ReportProgress);
            onCompletedDelegate =
                new SendOrPostCallback(CalculateCompleted);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (components != null)
                {
                    components.Dispose();
                }
            }
            base.Dispose(disposing);
        }

        /////////////////////////////////////////////////////////////
        ///

        // This method starts an asynchronous calculation.
        // First, it checks the supplied task ID for uniqueness.
        // If taskId is unique, it creates a new WorkerEventHandler
        // and calls its BeginInvoke method to start the calculation.
        public virtual void CalculatePrimeAsync(
            int numberToTest,
            object taskId)
        {
            // Create an AsyncOperation for taskId.
            AsyncOperation asyncOp =
                AsyncOperationManager.CreateOperation(taskId);

            // Multiple threads will access the task dictionary,
            // so it must be locked to serialize access.
            lock (userStateToLifetime.SyncRoot)
            {
                if (userStateToLifetime.Contains(taskId))
                {
                    throw new ArgumentException(
                        "Task ID parameter must be unique",
                        "taskId");
                }

                userStateToLifetime[taskId] = asyncOp;
            }

            // Start the asynchronous operation.
            WorkerEventHandler workerDelegate = new WorkerEventHandler(CalculateWorker);
            workerDelegate.BeginInvoke(
                numberToTest,
                asyncOp,
                null,
                null);
        }

        // Utility method for determining if a
        // task has been canceled.
        private bool TaskCanceled(object taskId)
        {
            return( userStateToLifetime[taskId] == null );
        }

        // This method cancels a pending asynchronous operation.
        public void CancelAsync(object taskId)
        {
            AsyncOperation asyncOp = userStateToLifetime[taskId] as AsyncOperation;
            if (asyncOp != null)
            {
                lock (userStateToLifetime.SyncRoot)
                {
                    userStateToLifetime.Remove(taskId);
                }
            }
        }

        // This method performs the actual prime number computation.
        // It is executed on the worker thread.
        private void CalculateWorker(
            int numberToTest,
            AsyncOperation asyncOp)
        {
            bool isPrime = false;
            int firstDivisor = 1;
            Exception e = null;

            // Check that the task is still active.
            // The operation may have been canceled before
            // the thread was scheduled.
            if (!TaskCanceled(asyncOp.UserSuppliedState))
            {
                try
                {
                    // Find all the prime numbers up to
                    // the square root of numberToTest.
                    ArrayList primes = BuildPrimeNumberList(
                        numberToTest,
                        asyncOp);

                    // Now we have a list of primes less than
                    // numberToTest.
                    isPrime = IsPrime(
                        primes,
                        numberToTest,
                        out firstDivisor);
                }
                catch (Exception ex)
                {
                    e = ex;
                }
            }

            //CalculatePrimeState calcState = new CalculatePrimeState(
            //        numberToTest,
            //        firstDivisor,
            //        isPrime,
            //        e,
            //        TaskCanceled(asyncOp.UserSuppliedState),
            //        asyncOp);

            //this.CompletionMethod(calcState);

            this.CompletionMethod(
                numberToTest,
                firstDivisor,
                isPrime,
                e,
                TaskCanceled(asyncOp.UserSuppliedState),
                asyncOp);

            //completionMethodDelegate(calcState);
        }

        // This method computes the list of prime numbers used by the
        // IsPrime method.
        private ArrayList BuildPrimeNumberList(
            int numberToTest,
            AsyncOperation asyncOp)
        {
            ProgressChangedEventArgs e = null;
            ArrayList primes = new ArrayList();
            int firstDivisor;
            int n = 5;

            // Add the first prime numbers.
            primes.Add(2);
            primes.Add(3);

            // Do the work.
            while (n < numberToTest &&
                   !TaskCanceled( asyncOp.UserSuppliedState ) )
            {
                if (IsPrime(primes, n, out firstDivisor))
                {
                    // Report to the client that a prime was found.
                    e = new CalculatePrimeProgressChangedEventArgs(
                        n,
                        (int)((float)n / (float)numberToTest * 100),
                        asyncOp.UserSuppliedState);

                    asyncOp.Post(this.onProgressReportDelegate, e);

                    primes.Add(n);

                    // Yield the rest of this time slice.
                    Thread.Sleep(0);
                }

                // Skip even numbers.
                n += 2;
            }

            return primes;
        }

        // This method tests n for primality against the list of
        // prime numbers contained in the primes parameter.
        private bool IsPrime(
            ArrayList primes,
            int n,
            out int firstDivisor)
        {
            bool foundDivisor = false;
            bool exceedsSquareRoot = false;

            int i = 0;
            int divisor = 0;
            firstDivisor = 1;

            // Stop the search if:
            // there are no more primes in the list,
            // there is a divisor of n in the list, or
            // there is a prime that is larger than
            // the square root of n.
            while (
                (i < primes.Count) &&
                !foundDivisor &&
                !exceedsSquareRoot)
            {
                // The divisor variable will be the smallest
                // prime number not yet tried.
                divisor = (int)primes[i++];

                // Determine whether the divisor is greater
                // than the square root of n.
                if (divisor * divisor > n)
                {
                    exceedsSquareRoot = true;
                }
                // Determine whether the divisor is a factor of n.
                else if (n % divisor == 0)
                {
                    firstDivisor = divisor;
                    foundDivisor = true;
                }
            }

            return !foundDivisor;
        }

        // This method is invoked via the AsyncOperation object,
        // so it is guaranteed to be executed on the correct thread.
        private void CalculateCompleted(object operationState)
        {
            CalculatePrimeCompletedEventArgs e =
                operationState as CalculatePrimeCompletedEventArgs;

            OnCalculatePrimeCompleted(e);
        }

        // This method is invoked via the AsyncOperation object,
        // so it is guaranteed to be executed on the correct thread.
        private void ReportProgress(object state)
        {
            ProgressChangedEventArgs e =
                state as ProgressChangedEventArgs;

            OnProgressChanged(e);
        }

        protected void OnCalculatePrimeCompleted(
            CalculatePrimeCompletedEventArgs e)
        {
            if (CalculatePrimeCompleted != null)
            {
                CalculatePrimeCompleted(this, e);
            }
        }

        protected void OnProgressChanged(ProgressChangedEventArgs e)
        {
            if (ProgressChanged != null)
            {
                ProgressChanged(e);
            }
        }

        // This is the method that the underlying, free-threaded
        // asynchronous behavior will invoke.  This will happen on
        // an arbitrary thread.
        private void CompletionMethod(
            int numberToTest,
            int firstDivisor,
            bool isPrime,
            Exception exception,
            bool canceled,
            AsyncOperation asyncOp )

        {
            // If the task was not previously canceled,
            // remove the task from the lifetime collection.
            if (!canceled)
            {
                lock (userStateToLifetime.SyncRoot)
                {
                    userStateToLifetime.Remove(asyncOp.UserSuppliedState);
                }
            }

            // Package the results of the operation in a
            // CalculatePrimeCompletedEventArgs.
            CalculatePrimeCompletedEventArgs e =
                new CalculatePrimeCompletedEventArgs(
                numberToTest,
                firstDivisor,
                isPrime,
                exception,
                canceled,
                asyncOp.UserSuppliedState);

            // End the task. The asyncOp object is responsible
            // for marshaling the call.
            asyncOp.PostOperationCompleted(onCompletedDelegate, e);

            // Note that after the call to OperationCompleted,
            // asyncOp is no longer usable, and any attempt to use it
            // will cause an exception to be thrown.
        }

        /////////////////////////////////////////////////////////////

        private void InitializeComponent()
        {
            components = new System.ComponentModel.Container();
        }

    }

    public class CalculatePrimeProgressChangedEventArgs :
            ProgressChangedEventArgs
    {
        private int latestPrimeNumberValue = 1;

        public CalculatePrimeProgressChangedEventArgs(
            int latestPrime,
            int progressPercentage,
```
