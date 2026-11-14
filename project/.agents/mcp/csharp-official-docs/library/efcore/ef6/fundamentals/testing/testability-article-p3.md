---
title: "Testability and Entity Framework 4.0 - EF6 (part 3 of 7)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/fundamentals/testing/testability-article.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Testability and Entity Framework 4.0 - EF6 (part 3 of 7)

## Implementing Patterns with the Entity Framework

The good news is that all of the design patterns we described in the last section are straightforward to implement with EF4. To demonstrate we are going to use a simple ASP.NET MVC application to edit and display Employees and their associated time card information. We’ll start by using the following “plain old CLR objects” (POCOs). 

```csharp
    public class Employee {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime HireDate { get; set; }
        public ICollection<TimeCard> TimeCards { get; set; }
    }

    public class TimeCard {
        public int Id { get; set; }
        public int Hours { get; set; }
        public DateTime EffectiveDate { get; set; }
    }
```

These class definitions will change slightly as we explore different approaches and features of EF4, but the intent is to keep these classes as persistence ignorant (PI) as possible. A PI object doesn’t know *how*, or even *if*, the state it holds lives inside a database. PI and POCOs go hand in hand with testable software. Objects using a POCO approach are less constrained, more flexible, and easier to test because they can operate without a database present.

With the POCOs in place we can create an Entity Data Model (EDM) in Visual Studio (see figure 1). We will not use the EDM to generate code for our entities. Instead, we want to use the entities we lovingly craft by hand. We will only use the EDM to generate our database schema and provide the metadata EF4 needs to map objects into the database.

**Figure 1**

Note: if you want to develop the EDM model first, it is possible to generate clean, POCO code from the EDM. You can do this with a Visual Studio 2010 extension provided by the Data Programmability team. To download the extension, launch the Extension Manager from the Tools menu in Visual Studio and search the online gallery of templates for “POCO” (See figure 2). There are several POCO templates available for EF. For more information on using the template, see “ Walkthrough: POCO Template for the Entity Framework”.

**Figure 2**

From this POCO starting point we will explore two different approaches to testable code. The first approach I call the EF approach because it leverages abstractions from the Entity Framework API to implement units of work and repositories. In the second approach we will create our own custom repository abstractions and then see the advantages and disadvantages of each approach. We’ll start by exploring the EF approach.  

### An EF Centric Implementation

Consider the following controller action from an ASP.NET MVC project. The action retrieves an Employee object and returns a result to display a detailed view of the employee.

```csharp
    public ViewResult Details(int id) {
        var employee = _unitOfWork.Employees
                                  .Single(e => e.Id == id);
        return View(employee);
    }
```

Is the code testable? There are at least two tests we’d need to verify the action’s behavior. First, we’d like to verify the action returns the correct view – an easy test. We’d also want to write a test to verify the action retrieves the correct employee, and we’d like to do this without executing code to query the database. Remember we want to isolate the code under test. Isolation will ensure the test doesn’t fail because of a bug in the data access code or database configuration. If the test fails, we will know we have a bug in the controller logic, and not in some lower level system component.

To achieve isolation we’ll need some abstractions like the interfaces we presented earlier for repositories and units of work. Remember the repository pattern is designed to mediate between domain objects and the data mapping layer. In this scenario EF4 *is* the data mapping layer, and already provides a repository-like abstraction named IObjectSet<T> (from the System.Data.Objects namespace). The interface definition looks like the following.

```csharp
    public interface IObjectSet<TEntity> :
                     IQueryable<TEntity>,
                     IEnumerable<TEntity>,
                     IQueryable,
                     IEnumerable
                     where TEntity : class
    {
        void AddObject(TEntity entity);
        void Attach(TEntity entity);
        void DeleteObject(TEntity entity);
        void Detach(TEntity entity);
    }
```

IObjectSet<T> meets the requirements for a repository because it resembles a collection of objects (via IEnumerable<T>) and provides methods to add and remove objects from the simulated collection. The Attach and Detach methods expose additional capabilities of the EF4 API. To use IObjectSet<T> as the interface for repositories we need a unit of work abstraction to bind repositories together.

```csharp
    public interface IUnitOfWork {
        IObjectSet<Employee> Employees { get; }
        IObjectSet<TimeCard> TimeCards { get; }
        void Commit();
    }
```

One concrete implementation of this interface will talk to SQL Server and is easy to create using the ObjectContext class from EF4. The ObjectContext class is the real unit of work in the EF4 API.

```csharp
    public class SqlUnitOfWork : IUnitOfWork {
        public SqlUnitOfWork() {
            var connectionString =
                ConfigurationManager
                    .ConnectionStrings[ConnectionStringName]
                    .ConnectionString;
            _context = new ObjectContext(connectionString);
        }

        public IObjectSet<Employee> Employees {
            get { return _context.CreateObjectSet<Employee>(); }
        }

        public IObjectSet<TimeCard> TimeCards {
            get { return _context.CreateObjectSet<TimeCard>(); }
        }

        public void Commit() {
            _context.SaveChanges();
        }

        readonly ObjectContext _context;
        const string ConnectionStringName = "EmployeeDataModelContainer";
    }
```

Bringing an IObjectSet<T> to life is as easy as invoking the CreateObjectSet method of the ObjectContext object. Behind the scenes the framework will use the metadata we provided in the EDM to produce a concrete ObjectSet<T>. We’ll stick with returning the IObjectSet<T> interface because it will help preserve testability in client code.

This concrete implementation is useful in production, but we need to focus on how we’ll use our IUnitOfWork abstraction to facilitate testing.

### The Test Doubles

To isolate the controller action we’ll need the ability to switch between the real unit of work (backed by an ObjectContext) and a test double or “fake” unit of work (performing in-memory operations). The common approach to perform this type of switching is to not let the MVC controller instantiate a unit of work, but instead pass the unit of work into the controller as a constructor parameter.

```csharp
    class EmployeeController : Controller {
      publicEmployeeController(IUnitOfWork unitOfWork)  {
          _unitOfWork = unitOfWork;
      }
      ...
    }
```

The above code is an example of dependency injection. We don’t allow the controller to create it’s dependency (the unit of work) but inject the dependency into the controller. In an MVC project it is common to use a custom controller factory in combination with an inversion of control (IoC) container to automate dependency injection. These topics are beyond the scope of this article, but you can read more by following the references at the end of this article.

A fake unit of work implementation that we can use for testing might look like the following.

```csharp
    public class InMemoryUnitOfWork : IUnitOfWork {
        public InMemoryUnitOfWork() {
            Committed = false;
        }
        public IObjectSet<Employee> Employees {
            get;
            set;
        }

        public IObjectSet<TimeCard> TimeCards {
            get;
            set;
        }

        public bool Committed { get; set; }
        public void Commit() {
            Committed = true;
        }
    }
```

Notice the fake unit of work exposes a Commited property. It’s sometimes useful to add features to a fake class that facilitate testing. In this case it is easy to observe if code commits a unit of work by checking the Commited property.

We’ll also need a fake IObjectSet<T> to hold Employee and TimeCard objects in memory. We can provide a single implementation using generics.

```csharp
    public class InMemoryObjectSet<T> : IObjectSet<T> where T : class
        public InMemoryObjectSet()
            : this(Enumerable.Empty<T>()) {
        }
        public InMemoryObjectSet(IEnumerable<T> entities) {
            _set = new HashSet<T>();
            foreach (var entity in entities) {
                _set.Add(entity);
            }
            _queryableSet = _set.AsQueryable();
        }
        public void AddObject(T entity) {
            _set.Add(entity);
        }
        public void Attach(T entity) {
            _set.Add(entity);
        }
        public void DeleteObject(T entity) {
            _set.Remove(entity);
        }
        public void Detach(T entity) {
            _set.Remove(entity);
        }
        public Type ElementType {
            get { return _queryableSet.ElementType; }
        }
        public Expression Expression {
            get { return _queryableSet.Expression; }
        }
        public IQueryProvider Provider {
            get { return _queryableSet.Provider; }
        }
        public IEnumerator<T> GetEnumerator() {
            return _set.GetEnumerator();
        }
        IEnumerator IEnumerable.GetEnumerator() {
            return GetEnumerator();
        }

        readonly HashSet<T> _set;
        readonly IQueryable<T> _queryableSet;
    }
```

This test double delegates most of its work to an underlying HashSet<T> object. Note that IObjectSet<T> requires a generic constraint enforcing T as a class (a reference type), and also forces us to implement IQueryable<T>. It is easy to make an in-memory collection appear as an IQueryable<T> using the standard LINQ operator AsQueryable.
