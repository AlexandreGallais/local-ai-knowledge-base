---
title: "Debug a .NET console application (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tutorials/debug-console-app.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Debug a .NET console application (part 2 of 2)

## Step through a program

**visualstudio:**

Visual Studio also allows you to step line by line through a program and monitor its execution. Ordinarily, you'd set a breakpoint and follow program flow through a small part of your program code. Since this program is small, you can step through the entire program.

1. Set a breakpoint on the line of code that displays the "What is your name?" prompt.

1. Choose **Debug** > **Step Into**. Another way to debug one statement at a time is by pressing `F11`.

   Visual Studio highlights and displays an arrow beside the next line of execution.

   At this point, the **Locals** window shows that the `args` array is empty, and `name` and `currentDate` have default values. In addition, Visual Studio has opened a blank console window.

1. Press `F11`. Visual Studio highlights the statement that includes the `name` variable assignment. The **Locals** window shows that `name` is `null`, and the console window displays the string "What is your name?".

1. Respond to the prompt by entering a string in the console window and pressing `Enter`. The console is unresponsive, and the string you entered isn't displayed in the console window, but the `System.Console.ReadLine*` method will nevertheless capture your input.

1. Press `F11`. Visual Studio highlights the statement that includes the `currentDate` variable assignment. The **Locals** window shows the value returned by the call to the `System.Console.ReadLine*` method. The console window also displays the string you entered at the prompt.

1. Press `F11`. The **Locals** window shows the value of the `currentDate` variable after the assignment from the `System.DateTime.Now` property. The console window is unchanged.

1. Press `F11`. Visual Studio calls the `System.Console.WriteLine(System.String,System.Object,System.Object)` method. The console window displays the formatted string.

1. Choose **Debug** > **Step Out**. Another way to stop step-by-step execution is by pressing `Shift`+`F11`.

   The console window displays a message and waits for you to press a key.

1. Press any key to close the console window and stop debugging.

**vscode,codespaces:**

Visual Studio Code also allows you to step line by line through a program and monitor its execution. Ordinarily, you'd set a breakpoint and follow program flow through a small part of your program code. Since this program is small, you can step through the entire program.

1. Set a breakpoint on the line of code that displays the "What is your name?" prompt.

1. Press `F5` to start debugging.

   Visual Studio Code highlights the breakpoint line.

   At this point, the **Variables** window shows that the `args` array is empty, and `name` and `currentDate` have default values.

1. Select **Step Into** from the Debug toolbar or press `F11`.

   Visual Studio Code highlights the next line.

1. Visual Studio Code runs the `Console.WriteLine` for the name prompt and highlights the next line of execution. The next line is the `Console.ReadLine` for the `name`. The **Variables** window is unchanged, and the **Terminal** tab shows the "What is your name?" prompt.

1. Select **Step Into** or press `F11`.

   Visual Studio Code highlights the `name` variable assignment. The **Variables** window shows that `name` is still `null`.

1. Respond to the prompt by entering a string in the Terminal tab and pressing `Enter`.

   The **Debug Console** tab might not display the string you enter while you're entering it, but the `System.Console.ReadLine*` method will capture your input.

1. Select **Step Into** or press `F11`.

   Visual Studio Code highlights the `currentDate` variable assignment. The **Variables** window shows the value returned by the call to the `System.Console.ReadLine*` method. The **Terminal** tab displays the string you entered at the prompt.

1. Select **Step Into** or press `F11`.

   The **Variables** window shows the value of the `currentDate` variable after the assignment from the `System.DateTime.Now` property.

1. Select **Step Into** or press `F11`.

   Visual Studio Code calls the `System.Console.WriteLine(System.String,System.Object,System.Object)` method. The console window displays the formatted string.

1. Select **Step Out** or press `Shift`+`F11`.

   The terminal displays "Press any key to exit..."

1. Press any key to exit the program.

## Use Release build configuration

Once you've tested the Debug version of your application, you should also compile and test the Release version. The Release version incorporates compiler optimizations that can sometimes negatively affect the behavior of an application. For example, compiler optimizations that are designed to improve performance can create race conditions in multithreaded applications.

**visualstudio:**

To build and test the Release version of your console application, change the build configuration on the toolbar from **Debug** to **Release**.

When you press `F5` or choose **Build Solution** from the **Build** menu, Visual Studio compiles the Release version of the application. You can test it as you did the Debug version.

**vscode:**

To build and test the Release version of your console application, open the **Terminal** and run the following command:

```dotnetcli
dotnet run --configuration Release
```

**codespaces:**

To build and test the Release version of your console application, run the following command in the terminal:

```dotnetcli
dotnet run --configuration Release HelloWorld.cs
```

## Next steps

In this tutorial, you used debugging tools. In the next tutorial, you publish a deployable version of the app.

> Publish a .NET console application
