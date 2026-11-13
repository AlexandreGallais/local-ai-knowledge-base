---
title: "Test a .NET class library (part 2 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tutorials/test-class-library.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Test a .NET class library (part 2 of 3)

## Add and run unit test methods

When a unit test runs, each method marked with the `Microsoft.VisualStudio.TestTools.UnitTesting.TestMethodAttribute` attribute in a class marked with the  `Microsoft.VisualStudio.TestTools.UnitTesting.TestClassAttribute` attribute executes automatically. A test method ends when the first failure is found or when all tests contained in the method succeed.

The most common tests call members of the `Microsoft.VisualStudio.TestTools.UnitTesting.Assert` class. Many assert methods include at least two parameters, one of which is the expected test result and the other of which is the actual test result. Some of the `Assert` class's most frequently called methods are shown in the following table:

| Assert methods     | Function |
| ------------------ | -------- |
| `Assert.AreEqual`  | Verifies that two values or objects are equal. The assert fails if the values or objects aren't equal. |
| `Assert.AreSame`   | Verifies that two object variables refer to the same object. The assert fails if the variables refer to different objects. |
| `Assert.IsFalse`   | Verifies that a condition is `false`. The assert fails if the condition is `true`. |
| `Assert.IsNotNull` | Verifies that an object isn't `null`. The assert fails if the object is `null`. |

You can also use the `Microsoft.VisualStudio.TestTools.UnitTesting.Assert.Throws*` method in a test method to indicate the type of exception it's expected to throw. The test fails if the specified exception isn't thrown.

In testing the `StringLibrary.StartsWithUpper` method, you want to provide a number of strings that begin with an uppercase character. You expect the method to return `true` in these cases, so you can call the `Microsoft.VisualStudio.TestTools.UnitTesting.Assert.IsTrue*` method. Similarly, you want to provide a number of strings that begin with something other than an uppercase character. You expect the method to return `false` in these cases, so you can call the `Microsoft.VisualStudio.TestTools.UnitTesting.Assert.IsFalse*` method.

Since your library method handles strings, you also want to make sure that it successfully handles an empty string (`String.Empty`) and a `null` string. An empty string is one that has no characters and whose `System.String.Length` is 0. A `null` string is one that hasn't been initialized. You can call `StartsWithUpper` directly as a static method and pass a single `System.String` argument. Or you can call `StartsWithUpper` as an extension method on a `string` variable assigned to `null`.

You'll define three methods, each of which calls an `Microsoft.VisualStudio.TestTools.UnitTesting.Assert` method for each element in a string array. You'll call a method overload that lets you specify an error message to be displayed in case of test failure. The message identifies the string that caused the failure.

To create the test methods:

**visualstudio:**

1. In the *Test1.cs* or *Test1.vb* code window, replace the code with the following code:

```csharp
﻿using UtilityLibraries;

namespace StringLibraryTest
{
    [TestClass]
    public sealed class Test1
    {
        [TestMethod]
        public void TestStartsWithUpper()
        {
            // Tests that we expect to return true.
            string[] words = ["Alphabet", "Zebra", "ABC", "Αθήνα", "Москва"];
            foreach (var word in words)
            {
                bool result = word.StartsWithUpper();
                Assert.IsTrue(result, $"Expected for '{word}': true; Actual: {result}");
            }
        }

        [TestMethod]
        public void TestDoesNotStartWithUpper()
        {
            // Tests that we expect to return false.
            string[] words = ["alphabet", "zebra", "abc", "αυτοκινητοβιομηχανία", "государство",
                          "1234", ".", ";", " "];
            foreach (var word in words)
            {
                bool result = word.StartsWithUpper();
                Assert.IsFalse(result, $"Expected for '{word}': false; Actual: {result}");
            }
        }

        [TestMethod]
        public void DirectCallWithNullOrEmpty()
        {
            // Tests that we expect to return false.
            string?[] words = [string.Empty, null];
            foreach (var word in words)
            {
                bool result = StringLibrary.StartsWithUpper(word);
                Assert.IsFalse(result, $"Expected for '{word ?? "<null>"}': false; Actual: {result}");
            }
        }
    }
}
```
```vb
﻿Imports Microsoft.VisualStudio.TestTools.UnitTesting
Imports UtilityLibraries

Namespace StringLibraryTest
    <TestClass>
    Public Class UnitTest1
        <TestMethod>
        Public Sub TestStartsWithUpper()
            ' Tests that we expect to return true.
            Dim words() As String = {"Alphabet", "Zebra", "ABC", "Αθήνα", "Москва"}
            For Each word In words
                Dim result As Boolean = word.StartsWithUpper()
                Assert.IsTrue(result,
                       $"Expected for '{word}': true; Actual: {result}")
            Next
        End Sub

        <TestMethod>
        Public Sub TestDoesNotStartWithUpper()
            ' Tests that we expect to return false.
            Dim words() As String = {"alphabet", "zebra", "abc", "αυτοκινητοβιομηχανία", "государство",
                               "1234", ".", ";", " "}
            For Each word In words
                Dim result As Boolean = word.StartsWithUpper()
                Assert.IsFalse(result,
                       $"Expected for '{word}': false; Actual: {result}")
            Next
        End Sub

        <TestMethod>
        Public Sub DirectCallWithNullOrEmpty()
            ' Tests that we expect to return false.
            Dim words() As String = {String.Empty, Nothing}
            For Each word In words
                Dim result As Boolean = StringLibrary.StartsWithUpper(word)
                Assert.IsFalse(result,
                       $"Expected for '{If(word Is Nothing, "<null>", word)}': false; Actual: {result}")
            Next
        End Sub
    End Class
End Namespace
```
   The test of uppercase characters in the `TestStartsWithUpper` method includes the Greek capital letter alpha (U+0391) and the Cyrillic capital letter EM (U+041C). The test of lowercase characters in the `TestDoesNotStartWithUpper` method includes the Greek small letter alpha (U+03B1) and the Cyrillic small letter Ghe (U+0433).

1. On the menu bar, select **File** > **Save Test1.cs As** or **File** > **Save Test1.vb As**. In the **Save File As** dialog, select the arrow beside the **Save** button, and select **Save with Encoding**.

1. In the **Confirm Save As** dialog, select the **Yes** button to save the file.

1. In the **Advanced Save Options** dialog, select **Unicode (UTF-8 with signature) - Codepage 65001** from the **Encoding** drop-down list and select **OK**.

   If you fail to save your source code as a UTF8-encoded file, Visual Studio might save it as an ASCII file. When that happens, the runtime doesn't accurately decode the UTF8 characters outside of the ASCII range, and the test results aren't correct.

1. On the menu bar, select **Test** > **Run All Tests**. If the **Test Explorer** window doesn't open, open it by choosing **Test** > **Test Explorer**. The three tests are listed in the **Passed Tests** section, and the **Summary** section reports the result of the test run.

**vscode:**

1. Open *StringLibraryTest/Test1.cs* and replace all of the code with the following code.

```csharp
﻿using UtilityLibraries;

namespace StringLibraryTest
{
    [TestClass]
    public sealed class Test1
    {
        [TestMethod]
        public void TestStartsWithUpper()
        {
            // Tests that we expect to return true.
            string[] words = ["Alphabet", "Zebra", "ABC", "Αθήνα", "Москва"];
            foreach (var word in words)
            {
                bool result = word.StartsWithUpper();
                Assert.IsTrue(result, $"Expected for '{word}': true; Actual: {result}");
            }
        }

        [TestMethod]
        public void TestDoesNotStartWithUpper()
        {
            // Tests that we expect to return false.
            string[] words = ["alphabet", "zebra", "abc", "αυτοκινητοβιομηχανία", "государство",
                          "1234", ".", ";", " "];
            foreach (var word in words)
            {
                bool result = word.StartsWithUpper();
                Assert.IsFalse(result, $"Expected for '{word}': false; Actual: {result}");
            }
        }

        [TestMethod]
        public void DirectCallWithNullOrEmpty()
        {
            // Tests that we expect to return false.
            string?[] words = [string.Empty, null];
            foreach (var word in words)
            {
                bool result = StringLibrary.StartsWithUpper(word);
                Assert.IsFalse(result, $"Expected for '{word ?? "<null>"}': false; Actual: {result}");
            }
        }
    }
}
```
   The test of uppercase characters in the `TestStartsWithUpper` method includes the Greek capital letter alpha (U+0391) and the Cyrillic capital letter EM (U+041C). The test of lowercase characters in the `TestDoesNotStartWithUpper` method includes the Greek small letter alpha (U+03B1) and the Cyrillic small letter Ghe (U+0433).

1. Save your changes.

## Build and run your tests

1. In **Solution Explorer**, right-click the solution and select **Build** or from the Command Palette, select **.NET: Build**.

1. Select the **Testing** window, select **Run Tests** or from the Command Palette, select **Test: Run all Tests**.

**codespaces:**

1. Open *StringLibraryTest/Test1.cs* and replace all of the code with the following code:

```csharp
﻿using UtilityLibraries;

namespace StringLibraryTest
{
    [TestClass]
    public sealed class Test1
    {
        [TestMethod]
        public void TestStartsWithUpper()
        {
            // Tests that we expect to return true.
            string[] words = ["Alphabet", "Zebra", "ABC", "Αθήνα", "Москва"];
            foreach (var word in words)
            {
                bool result = word.StartsWithUpper();
                Assert.IsTrue(result, $"Expected for '{word}': true; Actual: {result}");
            }
        }

        [TestMethod]
        public void TestDoesNotStartWithUpper()
        {
            // Tests that we expect to return false.
            string[] words = ["alphabet", "zebra", "abc", "αυτοκινητοβιομηχανία", "государство",
                          "1234", ".", ";", " "];
            foreach (var word in words)
            {
                bool result = word.StartsWithUpper();
                Assert.IsFalse(result, $"Expected for '{word}': false; Actual: {result}");
            }
        }

        [TestMethod]
        public void DirectCallWithNullOrEmpty()
        {
            // Tests that we expect to return false.
            string?[] words = [string.Empty, null];
            foreach (var word in words)
            {
                bool result = StringLibrary.StartsWithUpper(word);
                Assert.IsFalse(result, $"Expected for '{word ?? "<null>"}': false; Actual: {result}");
            }
        }
    }
}
```
   The test of uppercase characters in the `TestStartsWithUpper` method includes the Greek capital letter alpha (U+0391) and the Cyrillic capital letter EM (U+041C). The test of lowercase characters in the `TestDoesNotStartWithUpper` method includes the Greek small letter alpha (U+03B1) and the Cyrillic small letter Ghe (U+0433).

1. Save your changes and run the tests:

   ```dotnetcli
   dotnet test
   ```

   The tests should pass.

## Handle test failures

If you're doing test-driven development (TDD), you write tests first and they fail the first time you run them. Then you add code to the app that makes the test succeed. For this tutorial, you created the test after writing the app code that it validates, so you haven't seen the test fail. To validate that a test fails when you expect it to fail, add an invalid value to the test input.

1. Modify the `words` array in the `TestDoesNotStartWithUpper` method to include the string "Error".

   ```csharp
   string[] words = { "alphabet", "Error", "zebra", "abc", "αυτοκινητοβιομηχανία", "государство",
                      "1234", ".", ";", " " };
   ```

   ```vb
   Dim words() As String = { "alphabet", "Error", "zebra", "abc", "αυτοκινητοβιομηχανία", "государство",
                      "1234", ".", ";", " " }

   ```

**visualstudio:**

1. Run the test by selecting **Test** > **Run All Tests** from the menu bar. The **Test Explorer** window indicates that two tests succeeded and one failed.

1. Select the failed test, `TestDoesNotStartWith`.

   The **Test Explorer** window displays the message produced by the assert: "Assert.IsFalse failed. Expected for 'Error': false; actual: True." Because of the failure, the strings in the array after "Error" weren't tested.

**vscode:**

1. Run the tests by clicking on the green error next to the test in the editor.

   The output shows that the test fails, and it provides an error message for the failed test: "Assert.IsFalse failed. Expected for 'Error': false; actual: True". Because of the failure, no strings in the array after "Error" were tested.

**codespaces:**

1. Run the tests:

   ```dotnetcli
   dotnet test
   ```

   The output shows that the test fails, and it provides an error message for the failed test: "Assert.IsFalse failed. Expected for 'Error': false; actual: True". Because of the failure, no strings in the array after "Error" were tested.

1. Remove the string "Error" that you added.

1. Rerun the test and the tests pass.
