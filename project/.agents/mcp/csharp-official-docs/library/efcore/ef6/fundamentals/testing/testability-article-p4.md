---
title: "Testability and Entity Framework 4.0 - EF6 (part 4 of 7)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/fundamentals/testing/testability-article.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Testability and Entity Framework 4.0 - EF6 (part 4 of 7)

### The Tests

Traditional unit tests will use a single test class to hold all of the tests for all of the actions in a single MVC controller. We can write these tests, or any type of unit test, using the in memory fakes we’ve built. However, for this article we will avoid the monolithic test class approach and instead group our tests to focus on a specific piece of functionality.  For example, “create new employee” might be the functionality we want to test, so we will use a single test class to verify the single controller action responsible for creating a new employee.

There is some common setup code we need for all these fine grained test classes. For example, we always need to create our in-memory repositories and fake unit of work. We also need an instance of the employee controller with the fake unit of work injected. We’ll share this common setup code across test classes by using a base class.

```csharp
    public class EmployeeControllerTestBase {
        public EmployeeControllerTestBase() {
            _employeeData = EmployeeObjectMother.CreateEmployees()
                                                .ToList();
            _repository = new InMemoryObjectSet<Employee>(_employeeData);
            _unitOfWork = new InMemoryUnitOfWork();
            _unitOfWork.Employees = _repository;
            _controller = new EmployeeController(_unitOfWork);
        }

        protected IList<Employee> _employeeData;
        protected EmployeeController _controller;
        protected InMemoryObjectSet<Employee> _repository;
        protected InMemoryUnitOfWork _unitOfWork;
    }
```

The “object mother” we use in the base class is one common pattern for creating test data. An object mother contains factory methods to instantiate test entities for use across multiple test fixtures.

```csharp
    public static class EmployeeObjectMother {
        public static IEnumerable<Employee> CreateEmployees() {
            yield return new Employee() {
                Id = 1, Name = "Scott", HireDate=new DateTime(2002, 1, 1)
            };
            yield return new Employee() {
                Id = 2, Name = "Poonam", HireDate=new DateTime(2001, 1, 1)
            };
            yield return new Employee() {
                Id = 3, Name = "Simon", HireDate=new DateTime(2008, 1, 1)
            };
        }
        // ... more fake data for different scenarios
    }
```

We can use the EmployeeControllerTestBase as the base class for a number of test fixtures (see figure 3). Each test fixture will test a specific controller action. For example, one test fixture will focus on testing the Create action used during an HTTP GET request (to display the view for creating an employee), and a different fixture will focus on the Create action used in an HTTP POST request (to take information submitted by the user to create an employee). Each derived class is only responsible for the setup needed in its specific context, and to provide the assertions needed to verify the outcomes for its specific test context.

**Figure 3**

The naming convention and test style presented here isn’t required for testable code – it’s just one approach. Figure 4 shows the tests running in the Jet Brains Resharper test runner plugin for Visual Studio 2010.

**Figure 4**

With a base class to handle the shared setup code, the unit tests for each controller action are small and easy to write. The tests will execute quickly (since we are performing in-memory operations), and shouldn’t fail because of unrelated infrastructure or environmental concerns (because we’ve isolated the unit under test).

```csharp
    [TestClass]
    public class EmployeeControllerCreateActionPostTests
               : EmployeeControllerTestBase {
        [TestMethod]
        public void ShouldAddNewEmployeeToRepository() {
            _controller.Create(_newEmployee);
            Assert.IsTrue(_repository.Contains(_newEmployee));
        }
        [TestMethod]
        public void ShouldCommitUnitOfWork() {
            _controller.Create(_newEmployee);
            Assert.IsTrue(_unitOfWork.Committed);
        }
        // ... more tests

        Employee _newEmployee = new Employee() {
            Name = "NEW EMPLOYEE",
            HireDate = new System.DateTime(2010, 1, 1)
        };
    }
```

In these tests, the base class does most of the setup work. Remember the base class constructor creates the in-memory repository, a fake unit of work, and an instance of the EmployeeController class. The test class derives from this base class and focuses on the specifics of testing the Create method. In this case the specifics boil down to the “arrange, act, and assert” steps you’ll see in any unit testing procedure:

-   Create a newEmployee object to simulate incoming data.
-   Invoke the Create action of the EmployeeController and pass in the newEmployee.
-   Verify the Create action produces the expected results (the employee appears in the repository).

What we’ve built allows us to test any of the EmployeeController actions. For example, when we write tests for the Index action of the Employee controller we can inherit from the test base class to establish the same base setup for our tests. Again the base class will create the in-memory repository, the fake unit of work, and an instance of the EmployeeController. The tests for the Index action only need to focus on invoking the Index action and testing the qualities of the model the action returns.

```csharp
    [TestClass]
    public class EmployeeControllerIndexActionTests
               : EmployeeControllerTestBase {
        [TestMethod]
        public void ShouldBuildModelWithAllEmployees() {
            var result = _controller.Index();
            var model = result.ViewData.Model
                          as IEnumerable<Employee>;
            Assert.IsTrue(model.Count() == _employeeData.Count);
        }
        [TestMethod]
        public void ShouldOrderModelByHiredateAscending() {
            var result = _controller.Index();
            var model = result.ViewData.Model
                         as IEnumerable<Employee>;
            Assert.IsTrue(model.SequenceEqual(
                           _employeeData.OrderBy(e => e.HireDate)));
        }
        // ...
    }
```

The tests we are creating with in-memory fakes are oriented towards testing the *state* of the software. For example, when testing the Create action we want to inspect the state of the repository after the create action executes – does the repository hold the new employee?

```csharp
    [TestMethod]
    public void ShouldAddNewEmployeeToRepository() {
        _controller.Create(_newEmployee);
        Assert.IsTrue(_repository.Contains(_newEmployee));
    }
```

Later we’ll look at interaction based testing. Interaction based testing will ask if the code under test invoked the proper methods on our objects and passed the correct parameters. For now we’ll move on the cover another design pattern – the lazy load.
