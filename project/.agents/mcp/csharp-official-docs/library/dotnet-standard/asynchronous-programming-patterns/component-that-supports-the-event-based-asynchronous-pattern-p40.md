---
title: "How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 40 of 102)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/asynchronous-programming-patterns/component-that-supports-the-event-based-asynchronous-pattern.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Implement a Component That Supports the Event-based Asynchronous Pattern (part 40 of 102)

```csharp
using System;
using System.Collections;
using System.Collections.Specialized;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Globalization;
using System.Threading;
using System.Windows.Forms;

namespace AsyncPattern
{
    // This form tests the PrimeNumberCalculator component.
    public class PrimeNumberCalculatorMain : System.Windows.Forms.Form
	{
        /////////////////////////////////////////////////////////////
		// Private fields
        //

        private PrimeNumberCalculator primeNumberCalculator1;
        private System.Windows.Forms.GroupBox taskGroupBox;
        private System.Windows.Forms.ListView listView1;
        private System.Windows.Forms.ColumnHeader taskIdColHeader;
        private System.Windows.Forms.ColumnHeader progressColHeader;
        private System.Windows.Forms.ColumnHeader currentColHeader;
        private System.Windows.Forms.Panel buttonPanel;
        private System.Windows.Forms.Panel panel2;
        private System.Windows.Forms.Button startAsyncButton;
        private System.Windows.Forms.Button cancelButton;
        private System.Windows.Forms.ColumnHeader testNumberColHeader;
        private System.Windows.Forms.ColumnHeader resultColHeader;
        private System.Windows.Forms.ColumnHeader firstDivisorColHeader;
        private System.ComponentModel.IContainer components;
        private int progressCounter;
        private int progressInterval = 100;

        /////////////////////////////////////////////////////////////
        // Construction and destruction
        //
		public PrimeNumberCalculatorMain ()
		{
			//
			// Required for Windows Form Designer support
			//
			InitializeComponent();

            // Hook up event handlers.
            this.primeNumberCalculator1.CalculatePrimeCompleted +=
                new CalculatePrimeCompletedEventHandler(
                primeNumberCalculator1_CalculatePrimeCompleted);

            this.primeNumberCalculator1.ProgressChanged +=
                new ProgressChangedEventHandler(
                primeNumberCalculator1_ProgressChanged);

            this.listView1.SelectedIndexChanged +=
                new EventHandler(listView1_SelectedIndexChanged);
		}

		protected override void Dispose( bool disposing )
		{
			if( disposing )
			{
				if (components != null)
				{
					components.Dispose();
				}
			}
			base.Dispose( disposing );
		}

        /////////////////////////////////////////////////////////////
        //

        // This event handler selects a number randomly to test
        // for primality. It then starts the asynchronous
        // calculation by calling the PrimeNumberCalculator
        // component's CalculatePrimeAsync method.
        private void startAsyncButton_Click (
            System.Object sender, System.EventArgs e)
        {
            // Randomly choose test numbers
            // up to 200,000 for primality.
            Random rand = new Random();
            int testNumber = rand.Next(200000);

            // Task IDs are Guids.
            Guid taskId = Guid.NewGuid();
            this.AddListViewItem(taskId, testNumber);

            // Start the asynchronous task.
            this.primeNumberCalculator1.CalculatePrimeAsync(
                testNumber,
                taskId);
        }

        private void listView1_SelectedIndexChanged(
            object sender,
            EventArgs e)
        {
            this.cancelButton.Enabled = CanCancel();
        }

        // This event handler cancels all pending tasks that are
        // selected in the ListView control.
        private void cancelButton_Click(
            System.Object sender,
            System.EventArgs e)
        {
            Guid taskId = Guid.Empty;

            // Cancel all selected tasks.
            foreach(ListViewItem lvi in this.listView1.SelectedItems)
            {
                // Tasks that have been completed or canceled have
                // their corresponding ListViewItem.Tag property
                // set to null.
                if (lvi.Tag != null)
                {
                    taskId = (Guid)lvi.Tag;
                    this.primeNumberCalculator1.CancelAsync(taskId);
                    lvi.Selected = false;
                }
            }

            cancelButton.Enabled = false;
        }

        // This event handler updates the ListView control when the
        // PrimeNumberCalculator raises the ProgressChanged event.
        //
        // On fast computers, the PrimeNumberCalculator can raise many
        // successive ProgressChanged events, so the user interface
        // may be flooded with messages. To prevent the user interface
        // from hanging, progress is only reported at intervals.
        private void primeNumberCalculator1_ProgressChanged(
            ProgressChangedEventArgs e)
        {
            if (this.progressCounter++ % this.progressInterval == 0)
            {
                Guid taskId = (Guid)e.UserState;

                if (e is CalculatePrimeProgressChangedEventArgs)
                {
                    CalculatePrimeProgressChangedEventArgs cppcea =
                        e as CalculatePrimeProgressChangedEventArgs;

                    this.UpdateListViewItem(
                        taskId,
                        cppcea.ProgressPercentage,
                        cppcea.LatestPrimeNumber);
                }
                else
                {
                    this.UpdateListViewItem(
                        taskId,
                        e.ProgressPercentage);
                }
            }
            else if (this.progressCounter > this.progressInterval)
            {
                this.progressCounter = 0;
            }
        }

        // This event handler updates the ListView control when the
        // PrimeNumberCalculator raises the CalculatePrimeCompleted
        // event. The ListView item is updated with the appropriate
        // outcome of the calculation: Canceled, Error, or result.
        private void primeNumberCalculator1_CalculatePrimeCompleted(
            object sender,
            CalculatePrimeCompletedEventArgs e)
        {
            Guid taskId = (Guid)e.UserState;

            if (e.Cancelled)
            {
                string result = "Canceled";

                ListViewItem lvi = UpdateListViewItem(taskId, result);

                if (lvi != null)
                {
                    lvi.BackColor = Color.Pink;
                    lvi.Tag = null;
                }
            }
            else if (e.Error != null)
            {
                string result = "Error";

                ListViewItem lvi = UpdateListViewItem(taskId, result);

                if (lvi != null)
                {
                    lvi.BackColor = Color.Red;
                    lvi.ForeColor = Color.White;
                    lvi.Tag = null;
                }
            }
            else
            {
                bool result = e.IsPrime;

                ListViewItem lvi = UpdateListViewItem(
                    taskId,
                    result,
                    e.FirstDivisor);

                if (lvi != null)
                {
                    lvi.BackColor = Color.LightGray;
                    lvi.Tag = null;
                }
            }
        }

        /////////////////////////////////////////////////////////////
        //

        private ListViewItem AddListViewItem(
            Guid guid,
            int testNumber )
        {
            ListViewItem lvi = new ListViewItem();
            lvi.Text = testNumber.ToString(
                CultureInfo.CurrentCulture.NumberFormat);

            lvi.SubItems.Add("Not Started");
            lvi.SubItems.Add("1");
            lvi.SubItems.Add(guid.ToString());
            lvi.SubItems.Add("---");
            lvi.SubItems.Add("---");
            lvi.Tag = guid;

            this.listView1.Items.Add( lvi );

            return lvi;
        }

        private ListViewItem UpdateListViewItem(
            Guid guid,
            int percentComplete,
            int current )
        {
            ListViewItem lviRet = null;

            foreach (ListViewItem lvi in this.listView1.Items)
            {
                if (lvi.Tag != null)
                {
                    if ((Guid)lvi.Tag == guid)
                    {
                        lvi.SubItems[1].Text =
                            percentComplete.ToString(
                            CultureInfo.CurrentCulture.NumberFormat);
                        lvi.SubItems[2].Text =
                            current.ToString(
                            CultureInfo.CurrentCulture.NumberFormat);
                        lviRet = lvi;
                        break;
                    }
                }
            }

            return lviRet;
        }

        private ListViewItem UpdateListViewItem(
            Guid guid,
            int percentComplete,
            int current,
            bool result,
            int firstDivisor )
        {
            ListViewItem lviRet = null;

            foreach (ListViewItem lvi in this.listView1.Items)
            {
                if ((Guid)lvi.Tag == guid)
                {
                    lvi.SubItems[1].Text =
                        percentComplete.ToString(
                        CultureInfo.CurrentCulture.NumberFormat);
                    lvi.SubItems[2].Text =
                        current.ToString(
                        CultureInfo.CurrentCulture.NumberFormat);
                    lvi.SubItems[4].Text =
                        result ? "Prime" : "Composite";
                    lvi.SubItems[5].Text =
                        firstDivisor.ToString(
                        CultureInfo.CurrentCulture.NumberFormat);

                    lviRet = lvi;

                    break;
                }
            }

            return lviRet;
        }

        private ListViewItem UpdateListViewItem(
            Guid guid,
            int percentComplete )
        {
            ListViewItem lviRet = null;

            foreach (ListViewItem lvi in this.listView1.Items)
            {
                if (lvi.Tag != null)
                {
                    if ((Guid)lvi.Tag == guid)
                    {
                        lvi.SubItems[1].Text =
                            percentComplete.ToString(
                            CultureInfo.CurrentCulture.NumberFormat);
                        lviRet = lvi;
                        break;
                    }
                }
            }

            return lviRet;
        }

        private ListViewItem UpdateListViewItem(
            Guid guid,
            bool result,
            int firstDivisor )
        {
            ListViewItem lviRet = null;

            foreach (ListViewItem lvi in this.listView1.Items)
            {
                if (lvi.Tag != null)
                {
                    if ((Guid)lvi.Tag == guid)
                    {
                        lvi.SubItems[4].Text =
                            result ? "Prime" : "Composite";
                        lvi.SubItems[5].Text =
                            firstDivisor.ToString(
                            CultureInfo.CurrentCulture.NumberFormat);
                        lviRet = lvi;
                        break;
                    }
                }
            }

            return lviRet;
        }

        private ListViewItem UpdateListViewItem(
            Guid guid,
            string result)
        {
            ListViewItem lviRet = null;

            foreach (ListViewItem lvi in this.listView1.Items)
            {
                if (lvi.Tag != null)
                {
                    if ((Guid)lvi.Tag == guid)
                    {
                        lvi.SubItems[4].Text = result;
                        lviRet = lvi;
                        break;
                    }
                }
            }

            return lviRet;
        }

        private bool CanCancel()
        {
            bool oneIsActive = false;

            foreach(ListViewItem lvi in this.listView1.SelectedItems)
            {
                if (lvi.Tag != null)
                {
                    oneIsActive = true;
                    break;
                }
            }

            return( oneIsActive == true );
        }

		
		private void InitializeComponent()
		{
            this.components = new System.ComponentModel.Container();
            this.taskGroupBox = new System.Windows.Forms.GroupBox();
            this.buttonPanel = new System.Windows.Forms.Panel();
            this.cancelButton = new System.Windows.Forms.Button();
            this.startAsyncButton = new System.Windows.Forms.Button();
            this.listView1 = new System.Windows.Forms.ListView();
            this.testNumberColHeader = new System.Windows.Forms.ColumnHeader();
            this.progressColHeader = new System.Windows.Forms.ColumnHeader();
            this.currentColHeader = new System.Windows.Forms.ColumnHeader();
            this.taskIdColHeader = new System.Windows.Forms.ColumnHeader();
            this.resultColHeader = new System.Windows.Forms.ColumnHeader();
            this.firstDivisorColHeader = new System.Windows.Forms.ColumnHeader();
            this.panel2 = new System.Windows.Forms.Panel();
            this.primeNumberCalculator1 = new AsyncPattern.PrimeNumberCalculator(this.components);
            this.taskGroupBox.SuspendLayout();
            this.buttonPanel.SuspendLayout();
            this.SuspendLayout();
            //
            // taskGroupBox
            //
            this.taskGroupBox.Controls.Add(this.buttonPanel);
            this.taskGroupBox.Controls.Add(this.listView1);
            this.taskGroupBox.Dock = System.Windows.Forms.DockStyle.Fill;
            this.taskGroupBox.Location = new System.Drawing.Point(0, 0);
            this.taskGroupBox.Name = "taskGroupBox";
            this.taskGroupBox.Size = new System.Drawing.Size(608, 254);
            this.taskGroupBox.TabIndex = 1;
            this.taskGroupBox.TabStop = false;
            this.taskGroupBox.Text = "Tasks";
            //
            // buttonPanel
            //
            this.buttonPanel.Controls.Add(this.cancelButton);
            this.buttonPanel.Controls.Add(this.startAsyncButton);
            this.buttonPanel.Dock = System.Windows.Forms.DockStyle.Bottom;
            this.buttonPanel.Location = new System.Drawing.Point(3, 176);
            this.buttonPanel.Name = "buttonPanel";
            this.buttonPanel.Size = new System.Drawing.Size(602, 75);
            this.buttonPanel.TabIndex = 1;
            //
            // cancelButton
            //
            this.cancelButton.Enabled = false;
            this.cancelButton.Location = new System.Drawing.Point(128, 24);
            this.cancelButton.Name = "cancelButton";
```
