---
title: "Testability and Entity Framework 4.0 - EF6 (part 1 of 7)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/fundamentals/testing/testability-article.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Testability and Entity Framework 4.0
Scott Allen

Published: May 2010

## Introduction

This white paper describes and demonstrates how to write testable code with the ADO.NET Entity Framework 4.0 and Visual Studio 2010. This paper does not try to focus on a specific testing methodology, like test-driven design (TDD) or behavior-driven design (BDD). Instead this paper will focus on how to write code that uses the ADO.NET Entity Framework yet remains easy to isolate and test in an automated fashion. We’ll look at common design patterns that facilitate testing in data access scenarios and see how to apply those patterns when using the framework. We’ll also look at specific features of the framework to see how those features can work in testable code.

## What Is Testable Code?

The ability to verify a piece of software using automated unit tests offers many desirable benefits. Everyone knows that good tests will reduce the number of software defects in an application and increase the application’s quality - but having unit tests in place goes far beyond just finding bugs.

A good unit test suite allows a development team to save time and remain in control of the software they create. A team can make changes to existing code, refactor, redesign, and restructure software to meet new requirements, and add new components into an application all while knowing the test suite can verify the application’s behavior. Unit tests are part of a quick feedback cycle to facilitate change and preserve the maintainability of software as complexity increases.

Unit testing comes with a price, however. A team has to invest the time to create and maintain unit tests. The amount of effort required to create these tests is directly related to the **testability** of the underlying software. How easy is the software to test? A team designing software with testability in mind will create effective tests faster than the team working with un-testable software.

Microsoft designed the ADO.NET Entity Framework 4.0 (EF4) with testability in mind. This doesn’t mean developers will be writing unit tests against framework code itself. Instead, the testability goals for EF4 make it easy to create testable code that builds on top of the framework. Before we look at specific examples, it’s worthwhile to understand the qualities of testable code.

### The Qualities of Testable Code

Code that is easy to test will always exhibit at least two traits. First, testable code is easy to **observe**. Given some set of inputs, it should be easy to observe the output of the code. For example, testing the following method is easy because the method directly returns the result of a calculation.

```csharp
    public int Add(int x, int y) {
        return x + y;
    }
```

Testing a method is difficult if the method writes the computed value into a network socket, a database table, or a file like the following code. The test has to perform additional work to retrieve the value.

```csharp
    public void AddAndSaveToFile(int x, int y) {
         var results = string.Format("The answer is {0}", x + y);
         File.WriteAllText("results.txt", results);
    }
```

Secondly, testable code is easy to **isolate**. Let’s use the following pseudo-code as a bad example of testable code.

```csharp
    public int ComputePolicyValue(InsurancePolicy policy) {
        using (var connection = new SqlConnection("dbConnection"))
        using (var command = new SqlCommand(query, connection)) {

            // business calculations omitted ...               

            if (totalValue > notificationThreshold) {
                var message = new MailMessage();
                message.Subject = "Warning!";
                var client = new SmtpClient();
                client.Send(message);
            }
        }
        return totalValue;
    }
```

The method is easy to observe – we can pass in an insurance policy and verify the return value matches an expected result. However, to test the method we’ll need to have a database installed with the correct schema, and configure the SMTP server in case the method tries to send an email.

The unit test only wants to verify the calculation logic inside the method, but the test might fail because the email server is offline, or because the database server moved. Both of these failures are unrelated to the behavior the test wants to verify. The behavior is difficult to isolate.

Software developers who strive to write testable code often strive to maintain a separation of concerns in the code they write. The above method should focus on the business calculations and delegate the database and email implementation details to other components. Robert C. Martin calls this the Single Responsibility Principle. An object should encapsulate a single, narrow responsibility, like calculating the value of a policy. All other database and notification work should be the responsibility of some other object. Code written in this fashion is easier to isolate because it is focused on a single task.

In .NET we have the abstractions we need to follow the Single Responsibility Principle and achieve isolation. We can use interface definitions and force the code to use the interface abstraction instead of a concrete type. Later in this paper we’ll see how a method like the bad example presented above can work with interfaces that *look* like they will talk to the database. At test time, however, we can substitute a dummy implementation that doesn’t talk to the database but instead holds data in memory. This dummy implementation will isolate the code from unrelated problems in the data access code or database configuration.

There are additional benefits to isolation. The business calculation in the last method should only take a few milliseconds to execute, but the test itself might run for several seconds as the code hops around the network and talks to various servers. Unit tests should run fast to facilitate small changes. Unit tests should also be repeatable and not fail because a component unrelated to the test has a problem. Writing code that is easy to observe and to isolate means developers will have an easier time writing tests for the code, spend less time waiting for tests to execute, and more importantly, spend less time tracking down bugs that do not exist.

Hopefully you can appreciate the benefits of testing and understand the qualities that testable code exhibits. We are about to address how to write code that works with EF4 to save data into a database while remaining observable and easy to isolate, but first we’ll narrow our focus to discuss testable designs for data access.
