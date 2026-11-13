---
title: "Debug a .NET console application (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tutorials/debug-console-app.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Tutorial: Debug a .NET console application

**visualstudio:**

This tutorial introduces the debugging tools available in Visual Studio.

> **Important:**
> All of the keyboard shortcuts are based on the defaults from Visual Studio. Your keyboard shortcuts may vary, for more information see Keyboard shortcuts in Visual Studio.

**vscode:**

This tutorial introduces the debugging tools available in Visual Studio Code for working with .NET apps.

**codespaces:**

This tutorial introduces the debugging tools available in GitHub Codespaces for working with .NET apps.

## Prerequisites

This tutorial works with the console app that you create in Create a .NET console application.

**visualstudio:**

## Use Debug build configuration

*Debug* and *Release* are Visual Studio's built-in build configurations. You use the Debug build configuration for debugging and the Release configuration for the final release distribution.

In the Debug configuration, a program compiles with full symbolic debug information and no optimization. Optimization complicates debugging, because the relationship between source code and generated instructions is more complex. The release configuration of a program has no symbolic debug information and is fully optimized.

By default, Visual Studio uses the Debug build configuration, so you don't need to change it before debugging.

1. Start Visual Studio.

1. Open the project that you created in Create a .NET console application.

   The current build configuration is shown on the toolbar. The following toolbar image shows that Visual Studio is configured to compile the Debug version of the app:

## Set a breakpoint

A *breakpoint* temporarily interrupts the execution of the application before the line with the breakpoint is run.

**visualstudio:**

1. Set a *breakpoint* on the line that displays the name, date, and time, by clicking in the left margin of the code window on that line. The left margin is to the left of the line numbers.  Other ways to set a breakpoint are by placing the cursor in the line of code and then pressing `F9` or choosing **Debug** > **Toggle Breakpoint** from the menu bar.

   As the following image shows, Visual Studio indicates the line on which the breakpoint is set by highlighting it and displaying a red dot in the left margin.

1. Press `F5` to run the program in Debug mode. Another way to start debugging is by choosing **Debug** > **Start Debugging** from the menu.

1. Enter a string in the console window when the program prompts for a name, and then press `Enter`.

1. Program execution stops when it reaches the breakpoint and before the `Console.WriteLine` method executes. The **Locals** window displays the values of variables that are defined in the currently executing method.

**vscode:**

1. Start Visual Studio Code.

1. Open the folder of the project that you created in Create a .NET console application.

1. Open the *Program.cs* file.

1. Set a *breakpoint* on the line that displays the name, date, and time, by clicking in the left margin of the code window. The left margin is to the left of the line numbers. Other ways to set a breakpoint are by pressing `F9` or choosing **Run** > **Toggle Breakpoint** from the menu while the line of code is selected.

   Visual Studio Code indicates the line on which the breakpoint is set by displaying a red dot in the left margin.

**codespaces:**

1. Open your GitHub Codespace that you created in Create a .NET console application.

1. Open the *HelloWorld.cs* file.

1. Set a *breakpoint* on the line that displays the name, date, and time, by clicking in the left margin of the code window. The left margin is to the left of the line numbers. You can also set a breakpoint are by pressing `F9` while the line of code is selected.

## Start debugging

**visualstudio:**

Program execution stops when it reaches the breakpoint, as described in the previous section. The **Locals** window displays the values of variables that are defined in the currently executing method.

**vscode:**

*Debug* and *Release* are .NET's built-in build configurations. You use the Debug build configuration for debugging and the Release configuration for the final release distribution.

By default, Visual Studio Code launch settings use the Debug build configuration, so you don't need to change it before debugging.

1. Open the Debug view by selecting the Debugging icon on the left side menu.

1. Select **Run and Debug**. If asked, select **C#** and then select **C#: Launch startup project**. Other ways to start the program in debugging mode are by pressing `F5` or choosing **Run** > **Start Debugging** from the menu.

1. If asked to **Select Launch Configuration**, select **C#: Debug Active File**.

1. Select the **Debug Console** tab to see the "What is your name?" prompt that the program displays before waiting for a response.

1. Enter a string in the **Debug Console** window in response to the prompt for a name, and then press `Enter`.

   Program execution stops when it reaches the breakpoint and before the `Console.WriteLine` method runs. The **Locals** section of the **Variables** window displays the values of variables that are defined in the currently running method.

**codespaces:**

By default, GitHub Codespaces uses the Debug build configuration, so you don't need to change it before debugging.

1. Open the Debug view by selecting the Debugging icon on the left side menu.

1. Select **Run and Debug**. If asked, select **C#** as the debugger and then select **C#: Debug Active File** as the Launch Configuration.

1. Select the **Debug Console** tab to see the "What is your name?" prompt that the program displays before waiting for a response.

1. Enter a string in the **Debug Console** window in response to the prompt for a name, and then press `Enter`.

   Program execution stops when it reaches the breakpoint and before the `Console.WriteLine` method runs. The **Locals** section of the **Variables** window displays the values of variables that are defined in the currently running method.

**visualstudio:**

## Use the Immediate window

The **Immediate** window lets you interact with the application you're debugging. You can interactively change the value of variables to see how it affects your program.

1. If the **Immediate** window is not visible, display it by choosing **Debug** > **Windows** > **Immediate**.

1. Enter `name = "Gracie"` in the **Immediate** window and press the `Enter` key.

1. Enter `currentDate = DateTime.Parse("2026-02-05T20:25:00Z").ToUniversalTime()` in the **Immediate** window and press the `Enter` key.

   The **Immediate** window displays the value of the string variable and the properties of the `System.DateTime` value. In addition, the values of the variables are updated in the **Locals** window.

1. Press `F5` to continue program execution. Another way to continue is by choosing **Debug** > **Continue** from the menu.

   The values displayed in the console window correspond to the changes you made in the **Immediate** window.

1. Press any key to exit the application and stop debugging.

**vscode,codespaces:**

## Use the Debug Console

The **Debug Console** window lets you interact with the application you're debugging. You can change the value of variables to see how it affects your program.

1. Select the **Debug Console** tab.

1. Enter `name = "Gracie"` at the prompt at the bottom of the **Debug Console** window and press `Enter`.

1. Enter `currentDate = DateTime.Parse("2026-01-28T20:54:00Z").ToUniversalTime()` at the bottom of the **Debug Console** window and press `Enter`.

   The **Variables** window displays the new values of the `name` and `currentDate` variables.

1. Continue program execution by selecting the **Continue** button in the toolbar. Another way to continue is by pressing `F5`.

   The values displayed in the console window correspond to the changes you made in the **Debug Console**.

1. Press `Enter` to exit the application and stop debugging.

## Set a conditional breakpoint

The program displays the string that the user enters. What happens if the user doesn't enter anything? You can test this with a useful debugging feature called a *conditional breakpoint*.

**visualstudio:**

1. Right-click on the red dot that represents the breakpoint. In the context menu, select **Conditions** to open the **Breakpoint Settings** dialog. Select the box for **Conditions** if it's not already selected.

1. For the **Conditional Expression**, enter the following code in the text field.

   ```csharp
   string.IsNullOrEmpty(name)
   ```

   ```vb
   String.IsNullOrEmpty(name)
   ```

   Each time the breakpoint is hit, the debugger calls the `String.IsNullOrWhiteSpace(name)` method, and it breaks on this line only if the method call returns `true`.

   Instead of a conditional expression, you can specify a *hit count*, which interrupts program execution before a statement is executed a specified number of times. Another option is to specify a *filter condition*, which interrupts program execution based on such attributes as a thread identifier, process name, or thread name.

1. Select **Close** to close the dialog.

1. Start the program with debugging by pressing `F5`.

1. In the console window, press the `Enter` key when prompted to enter your name.

1. Because the condition you specified (`name` is either `null` or `System.String.Empty`) has been satisfied, program execution stops when it reaches the breakpoint and before the `Console.WriteLine` method executes.

1. Select the **Locals** window, which shows the values of variables that are local to the currently executing method. In this case, `Main` is the currently executing method. Observe that the value of the `name` variable is `""`, or `System.String.Empty`.

1. Confirm the value is an empty string by entering the following statement in the **Immediate** window and pressing `Enter`. The result is `true`.

   ```csharp
   ? name == String.Empty
   ```

   ```vb
   ? String.IsNullOrEmpty(name)
   ```

   The question mark directs the immediate window to evaluate an expression.

1. Press `F5` to continue program execution.

1. Press any key to close the console window and stop debugging.

1. Clear the breakpoint by clicking on the dot in the left margin of the code window. Other ways to clear a breakpoint are by pressing `F9` or choosing **Debug > Toggle Breakpoint** while the line of code is selected.

**vscode,codespaces:**

1. Right-click (`Ctrl`-click on macOS) on the red dot that represents the breakpoint. In the context menu, select **Edit Breakpoint** to open a dialog that lets you enter a conditional expression.

1. Select `Expression` in the drop-down, enter the following conditional expression, and press `Enter`.

   ```csharp
   String.IsNullOrEmpty(name)
   ```

   Each time the breakpoint is hit, the debugger calls the `String.IsNullOrEmpty(name)` method, and it breaks on this line only if the method call returns `true`.

   Instead of a conditional expression, you can specify a *hit count*, which interrupts program execution before a statement is run a specified number of times. Another option is to specify a *filter condition*, which interrupts program execution based on such attributes as a thread identifier, process name, or thread name.

1. Start the program with debugging by pressing `F5`.

1. In the **Debug Console** tab, press `Enter` when prompted to enter your name.

   Because the condition you specified (`name` is either `null` or `System.String.Empty`) has been satisfied, program execution stops when it reaches the breakpoint and before the `Console.WriteLine` method runs.

   The **Variables** window shows that the value of the `name` variable is `""`, or `System.String.Empty`.

1. Confirm the value is an empty string by entering the following statement at the **Debug Console** prompt and pressing `Enter`. The result is `true`.

   ```csharp
   name == String.Empty
   ```

1. Select the **Continue** button on the toolbar to continue program execution.

1. Press `Enter` to exit the program and stop debugging.

1. Clear the breakpoint by clicking on the dot in the left margin of the code window. Other ways to clear a breakpoint are by pressing `F9` or choosing **Run > Toggle Breakpoint** from the menu while the line of code is selected.

1. If you get a warning that the breakpoint condition will be lost, select **Remove Breakpoint**.
