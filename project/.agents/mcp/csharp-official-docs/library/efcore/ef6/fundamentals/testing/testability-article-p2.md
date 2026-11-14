---
title: "Testability and Entity Framework 4.0 - EF6 (part 2 of 7)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/fundamentals/testing/testability-article.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Testability and Entity Framework 4.0 - EF6 (part 2 of 7)

## Design Patterns for Data Persistence

Both of the bad examples presented earlier had too many responsibilities. The first bad example had to perform a calculation *and* write to a file. The second bad example had to read data from a database *and* perform a business calculation *and* send email. By designing smaller methods that separate concerns and delegate responsibility to other components you’ll make great strides towards writing testable code. The goal is to build functionality by composing actions from small and focused abstractions.

When it comes to data persistence the small and focused abstractions we are looking for are so common they’ve been documented as design patterns. Martin Fowler’s book Patterns of Enterprise Application Architecture was the first work to describe these patterns in print. We’ll provide a brief description of these patterns in the following sections before we show how these ADO.NET Entity Framework implements and works with these patterns.

### The Repository Pattern

Fowler says a repository “mediates between the domain and data mapping layers using a collection-like interface for accessing domain objects”. The goal of the repository pattern is to isolate code from the minutiae of data access, and as we saw earlier isolation is a required trait for testability.

The key to the isolation is how the repository exposes objects using a collection-like interface. The logic you write to use the repository has no idea how the repository will materialize the objects you request. The repository might talk to a database, or it might just return objects from an in-memory collection. All your code needs to know is that the repository appears to maintain the collection, and you can retrieve, add, and delete objects from the collection.

In existing .NET applications a concrete repository often inherits from a generic interface like the following:

```csharp
    public interface IRepository<T> {       
        IEnumerable<T> FindAll();
        IEnumerable<T> FindBy(Expression<Func\<T, bool>> predicate);
        T FindById(int id);
        void Add(T newEntity);
        void Remove(T entity);
    }
```

We’ll make a few changes to the interface definition when we provide an implementation for EF4, but the basic <example-value> remains the same. Code can use a concrete repository implementing this interface to retrieve an entity by its primary key value, to retrieve a collection of entities based on the evaluation of a predicate, or simply retrieve all available entities. The code can also add and remove entities through the repository interface.

Given an IRepository of Employee objects, code can perform the following operations.

```csharp
    var employeesNamedScott =
        repository
            .FindBy(e => e.Name == "Scott")
            .OrderBy(e => e.HireDate);
    var firstEmployee = repository.FindById(1);
    var newEmployee = new Employee() {/*... */};
    repository.Add(newEmployee);
```

Since the code is using an interface (IRepository of Employee), we can provide the code with different implementations of the interface. One implementation might be an implementation backed by EF4 and persisting objects into a Microsoft SQL Server database. A different implementation (one we use during testing) might be backed by an in-memory List of Employee objects. The interface will help to achieve isolation in the code.

Notice the IRepository<T> interface does not expose a Save operation. How do we update existing objects? You might come across IRepository definitions that do include the Save operation, and implementations of these repositories will need to immediately persist an object into the database. However, in many applications we don’t want to persist objects individually. Instead, we want to bring objects to life, perhaps from different repositories, modify those objects as part of a business activity, and then persist all the objects as part of a single, atomic operation. Fortunately, there is a pattern to allow this type of behavior.

### The Unit of Work Pattern

Fowler says a unit of work will “maintain a list of objects affected by a business transaction and coordinates the writing out of changes and the resolution of concurrency problems”. It is the responsibility of the unit of work to track changes to the objects we bring to life from a repository and persist any changes we’ve made to the objects when we tell the unit of work to commit the changes. It’s also the responsibility of the unit of work to take the new objects we’ve added to all repositories and insert the objects into a database, and also mange deletion.

If you’ve ever done any work with ADO.NET DataSets then you’ll already be familiar with the unit of work pattern. ADO.NET DataSets had the ability to track our updates, deletions, and insertion of DataRow objects and could (with the help of a TableAdapter) reconcile all our changes to a database. However, DataSet objects model a disconnected subset of the underlying database. The unit of work pattern exhibits the same behavior, but works with business objects and domain objects that are isolated from data access code and unaware of the database.

An abstraction to model the unit of work in .NET code might look like the following:

```csharp
    public interface IUnitOfWork {
        IRepository<Employee> Employees { get; }
        IRepository<Order> Orders { get; }
        IRepository<Customer> Customers { get; }
        void Commit();
    }
```

By exposing repository references from the unit of work we can ensure a single unit of work object has the ability to track all entities materialized during a business transaction. The implementation of the Commit method for a real unit of work is where all the magic happens to reconcile in-memory changes with the database. 

Given an IUnitOfWork reference, code can make changes to business objects retrieved from one or more repositories and save all the changes using the atomic Commit operation.

```csharp
    var firstEmployee = unitofWork.Employees.FindById(1);
    var firstCustomer = unitofWork.Customers.FindById(1);
    firstEmployee.Name = "Alex";
    firstCustomer.Name = "Christopher";
    unitofWork.Commit();
```

### The Lazy Load Pattern

Fowler uses the name lazy load to describe “an object that doesn’t contain all of the data you need but knows how to get it”. Transparent lazy loading is an important feature to have when writing testable business code and working with a relational database. As an example, consider the following code.

```csharp
    var employee = repository.FindById(id);
    // ... and later ...
    foreach(var timeCard in employee.TimeCards) {
        // .. manipulate the timeCard
    }
```

How is the TimeCards collection populated? There are two possible answers. One answer is that the employee repository, when asked to fetch an employee, issues a query to retrieve both the employee along with the employee’s associated time card information. In relational databases this generally requires a query with a JOIN clause and may result in retrieving more information than an application needs. What if the application never needs to touch the TimeCards property?

A second answer is to load the TimeCards property “on demand”. This lazy loading is implicit and transparent to the business logic because the code does not invoke special APIs to retrieve time card information. The code assumes the time card information is present when needed. There is some magic involved with lazy loading that generally involves runtime interception of method invocations. The intercepting code is responsible for talking to the database and retrieving time card information while leaving the business logic free to be business logic. This lazy load magic allows the business code to isolate itself from data retrieval operations and results in more testable code.

The drawback to a lazy load is that when an application *does* need the time card information the code will execute an additional query. This isn’t a concern for many applications, but for performance sensitive applications or applications looping through a number of employee objects and executing a query to retrieve time cards during each iteration of the loop (a problem often referred to as the N+1 query problem), lazy loading is a drag. In these scenarios an application might want to eagerly load time card information in the most efficient manner possible.

Fortunately, we’ll see how EF4 supports both implicit lazy loads and efficient eager loads as we move into the next section and implement these patterns.
