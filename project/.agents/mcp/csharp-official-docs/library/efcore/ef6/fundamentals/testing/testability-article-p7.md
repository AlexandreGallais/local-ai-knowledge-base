---
title: "Testability and Entity Framework 4.0 - EF6 (part 7 of 7)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/fundamentals/testing/testability-article.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Testability and Entity Framework 4.0 - EF6 (part 7 of 7)

### State versus Interaction Testing

There are different techniques you can use to test software with mock objects. One approach is to use state based testing, which is what we have done in this paper so far. State based testing makes assertions about the state of the software. In the last test we invoked an action method on the controller and made an assertion about the model it should build. Here are some other examples of testing state:

-   Verify the repository contains the new employee object after Create executes.
-   Verify the model holds a list of all employees after Index executes.
-   Verify the repository does not contain a given employee after Delete executes.

Another approach you’ll see with mock objects is to verify *interactions*. While state based testing makes assertions about the state of objects, interaction based testing makes assertions about how objects interact. For example:

-   Verify the controller invokes the repository’s Add method when Create executes.
-   Verify the controller invokes the repository’s FindAll method when Index executes.
-   Verify the controller invokes the unit of work’s Commit method to save changes when Edit executes.

Interaction testing often requires less test data, because we aren’t poking inside of collections and verifying counts. For example, if we know the Details action invokes a repository’s FindById method with the correct value - then the action is probably behaving correctly. We can verify this behavior without setting up any test data to return from FindById.

```csharp
    [TestClass]
    public class EmployeeControllerDetailsActionTests
               : EmployeeControllerTestBase {
         // ...
        [TestMethod]
        public void ShouldInvokeRepositoryToFindEmployee() {
            var result = _controller.Details(_detailsId);
            _repository.Verify(r => r.FindById(_detailsId));
        }
        int _detailsId = 1;
    }
```

The only setup required in the above test fixture is the setup provided by the base class. When we invoke the controller action, Moq will record the interactions with the mock repository. Using the Verify API of Moq, we can ask Moq if the controller invoked FindById with the proper ID value. If the controller did not invoke the method, or invoked the method with an unexpected parameter value, the Verify method will throw an exception and the test will fail.

Here is another example to verify the Create action invokes Commit on the current unit of work.

```csharp
    [TestMethod]
    public void ShouldCommitUnitOfWork() {
        _controller.Create(_newEmployee);
        _unitOfWork.Verify(u => u.Commit());
    }
```

One danger with interaction testing is the tendency to over specify interactions. The ability of the mock object to record and verify every interaction with the mock object doesn’t mean the test should try to verify every interaction. Some interactions are implementation details and you should only verify the interactions *required* to satisfy the current test.

The choice between mocks or fakes largely depends on the system you are testing and your personal (or team) preferences. Mock objects can drastically reduce the amount of code you need to implement test doubles, but not everyone is comfortable programming expectations and verifying interactions.

## Conclusions

In this paper we’ve demonstrated several approaches to creating testable code while using the ADO.NET Entity Framework for data persistence. We can leverage built in abstractions like IObjectSet<T>, or create our own abstractions like IRepository<T>.  In both cases, the POCO support in the ADO.NET Entity Framework 4.0 allows the consumers of these abstractions to remain persistent ignorant and highly testable. Additional EF4 features like implicit lazy loading allows business and application service code to work without worrying about the details of a relational data store. Finally, the abstractions we create are easy to mock or fake inside of unit tests, and we can use these test doubles to achieve fast running, highly isolated, and reliable tests.

### Additional Resources

-   Martin Fowler, Catalog of Patterns from *Patterns of Enterprise Application Architecture*
-   Griffin Caprio, “ Dependency Injection”
-   Data Programmability Blog, “ Walkthrough: Test Driven Development with the Entity Framework 4.0”.
-   Data Programmability Blog, “ Using Repository and Unit of Work patterns with Entity Framework 4.0”
-   Aaron Jensen, “ Introducing Machine Specifications”
-   Eric Lee, “ BDD with MSTest”
-   Eric Evans, “ Domain Driven Design”
-   Martin Fowler, “ Mocks Aren’t Stubs”
-   Martin Fowler, “ Test Double”
-   Moq

### Biography

Scott Allen is a member of the technical staff at Pluralsight and the founder of OdeToCode.com. In 15 years of commercial software development, Scott has worked on solutions for everything from 8-bit embedded devices to highly scalable ASP.NET web applications. You can reach Scott on his blog at OdeToCode, or on Twitter at https://twitter.com/OdeToCode.
