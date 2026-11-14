---
title: "Testability and Entity Framework 4.0 - EF6 (part 6 of 7)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/fundamentals/testing/testability-article.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# Testability and Entity Framework 4.0 - EF6 (part 6 of 7)

## Custom Repositories

When we first presented the unit of work design pattern in this article we provided some sample code for what the unit of work might look like. Let’s re-present this original idea using the employee and employee time card scenario we’ve been working with.

```csharp
    public interface IUnitOfWork {
        IRepository<Employee> Employees { get; }
        IRepository<TimeCard> TimeCards { get;  }
        void Commit();
    }
```

The primary difference between this unit of work and the unit of work we created in the last section is how this unit of work does not use any abstractions from the EF4 framework (there is no IObjectSet<T>). IObjectSet<T> works well as a repository interface, but the API it exposes might not perfectly align with our application’s needs. In this upcoming approach we will represent repositories using a custom IRepository<T> abstraction.

Many developers who follow test-driven design, behavior-driven design, and domain driven methodologies design prefer the IRepository<T> approach for several reasons. First, the IRepository<T> interface represents an “anti-corruption” layer. As described by Eric Evans in his Domain Driven Design book an anti-corruption layer keeps your domain code away from infrastructure APIs, like a persistence API. Secondly, developers can build methods into the repository that meet the exact needs of an application (as discovered while writing tests). For example, we might frequently need to locate a single entity using an ID value, so we can add a FindById method to the repository interface.  Our IRepository<T> definition will look like the following.

```csharp
    public interface IRepository<T>
                    where T : class, IEntity {
        IQueryable<T> FindAll();
        IQueryable<T> FindWhere(Expression<Func\<T, bool>> predicate);
        T FindById(int id);       
        void Add(T newEntity);
        void Remove(T entity);
    }
```

Notice we’ll drop back to using an IQueryable<T> interface to expose entity collections. IQueryable<T> allows LINQ expression trees to flow into the EF4 provider and give the provider a holistic view of the query. A second option would be to return IEnumerable<T>, which means the EF4 LINQ provider will only see the expressions built inside of the repository. Any grouping, ordering, and projection done outside of the repository will not be composed into the SQL command sent to the database, which can hurt performance. On the other hand, a repository returning only IEnumerable<T> results will never surprise you with a new SQL command. Both approaches will work, and both approaches remain testable.

It’s straightforward to provide a single implementation of the IRepository<T> interface using generics and the EF4 ObjectContext API.

```csharp
    public class SqlRepository<T> : IRepository<T>
                                    where T : class, IEntity {
        public SqlRepository(ObjectContext context) {
            _objectSet = context.CreateObjectSet<T>();
        }
        public IQueryable<T> FindAll() {
            return _objectSet;
        }
        public IQueryable<T> FindWhere(
                               Expression<Func\<T, bool>> predicate) {
            return _objectSet.Where(predicate);
        }
        public T FindById(int id) {
            return _objectSet.Single(o => o.Id == id);
        }
        public void Add(T newEntity) {
            _objectSet.AddObject(newEntity);
        }
        public void Remove(T entity) {
            _objectSet.DeleteObject(entity);
        }
        protected ObjectSet<T> _objectSet;
    }
```

The IRepository<T> approach gives us some additional control over our queries because a client has to invoke a method to get to an entity. Inside the method we could provide additional checks and LINQ operators to enforce application constraints. Notice the interface has two constraints on the generic type parameter. The first constraint is the class cons taint required by ObjectSet<T>, and the second constraint forces our entities to implement IEntity – an abstraction created for the application. The IEntity interface forces entities to have a readable Id property, and we can then use this property in the FindById method. IEntity is defined with the following code.

```csharp
    public interface IEntity {
        int Id { get; }
    }
```

IEntity could be considered a small violation of persistence ignorance since our entities are required to implement this interface. Remember persistence ignorance is about tradeoffs, and for many the FindById functionality will outweigh the constraint imposed by the interface. The interface has no impact on testability.

Instantiating a live IRepository<T> requires an EF4 ObjectContext, so a concrete unit of work implementation should manage the instantiation.

```csharp
    public class SqlUnitOfWork : IUnitOfWork {
        public SqlUnitOfWork() {
            var connectionString =
                ConfigurationManager
                    .ConnectionStrings[ConnectionStringName]
                    .ConnectionString;

            _context = new ObjectContext(connectionString);
            _context.ContextOptions.LazyLoadingEnabled = true;
        }

        public IRepository<Employee> Employees {
            get {
                if (_employees == null) {
                    _employees = new SqlRepository<Employee>(_context);
                }
                return _employees;
            }
        }

        public IRepository<TimeCard> TimeCards {
            get {
                if (_timeCards == null) {
                    _timeCards = new SqlRepository<TimeCard>(_context);
                }
                return _timeCards;
            }
        }

        public void Commit() {
            _context.SaveChanges();
        }

        SqlRepository<Employee> _employees = null;
        SqlRepository<TimeCard> _timeCards = null;
        readonly ObjectContext _context;
        const string ConnectionStringName = "EmployeeDataModelContainer";
    }
```

### Using the Custom Repository

Using our custom repository is not significantly different from using the repository based on IObjectSet<T>. Instead of applying LINQ operators directly to a property, we’ll first need to invoke one the repository’s methods to grab an IQueryable<T> reference.

```csharp
    public ViewResult Index() {
        var model = _repository.FindAll()
                               .Include("TimeCards")
                               .OrderBy(e => e.HireDate);
        return View(model);
    }
```

Notice the custom Include operator we implemented previously will work without change. The repository’s FindById method removes duplicated logic from actions trying to retrieve a single entity.

```csharp
    public ViewResult Details(int id) {
        var model = _repository.FindById(id);
        return View(model);
    }
```

There is no significant difference in the testability of the two approaches we’ve examined. We could provide fake implementations of IRepository<T> by building concrete classes backed by HashSet<Employee> - just like what we did in the last section. However, some developers prefer to use mock objects and mock object frameworks instead of building fakes. We’ll look at using mocks to test our implementation and discuss the differences between mocks and fakes in the next section.

### Testing with Mocks

There are different approaches to building what Martin Fowler calls a “test double”. A test double (like a movie stunt double) is an object you build to “stand in” for real, production objects during tests. The in-memory repositories we created are test doubles for the repositories that talk to SQL Server. We’ve seen how to use these test-doubles during the unit tests to isolate code and keep tests running fast.

The test doubles we’ve built have real, working implementations. Behind the scenes each one stores a concrete collection of objects, and they will add and remove objects from this collection as we manipulate the repository during a test. Some developers like to build their test doubles this way – with real code and working implementations.  These test doubles are what we call *fakes*. They have working implementations, but they aren’t real enough for production use. The fake repository doesn’t actually write to the database. The fake SMTP server doesn’t actually send an email message over the network.

### Mocks versus Fakes

There is another type of test double known as a *mock*. While fakes have working implementations, mocks come with no implementation. With the help of a mock object framework we construct these mock objects at run time and use them as test doubles. In this section we’ll be using the open source mocking framework Moq. Here is a simple example of using Moq to dynamically create a test double for an employee repository.

```csharp
    Mock<IRepository<Employee>> mock =
        new Mock<IRepository<Employee>>();
    IRepository<Employee> repository = mock.Object;
    repository.Add(new Employee());
    var employee = repository.FindById(1);
```

We ask Moq for an IRepository<Employee> implementation and it builds one dynamically. We can get to the object implementing IRepository<Employee> by accessing the Object property of the Mock<T> object. It is this inner object we can pass into our controllers, and they won’t know if this is a test double or the real repository. We can invoke methods on the object just like we would invoke methods on an object with a real implementation.

You must be wondering what the mock repository will do when we invoke the Add method. Since there is no implementation behind the mock object, Add does nothing. There is no concrete collection behind the scenes like we had with the fakes we wrote, so the employee is discarded. What about the return value of FindById? In this case the mock object does the only thing it can do, which is return a default value. Since we are returning a reference type (an Employee), the return value is a null value.

Mocks might sound worthless; however, there are two more features of mocks we haven’t talked about. First, the Moq framework records all the calls made on the mock object. Later in the code we can ask Moq if anyone invoked the Add method, or if anyone invoked the FindById method. We’ll see later how we can use this “black box” recording feature in tests.

The second great feature is how we can use Moq to program a mock object with *expectations*. An expectation tells the mock object how to respond to any given interaction. For example, we can program an expectation into our mock and tell it to return an employee object when someone invokes FindById. The Moq framework uses a Setup API and lambda expressions to program these expectations.

```csharp
    [TestMethod]
    public void MockSample() {
        Mock<IRepository<Employee>> mock =
            new Mock<IRepository<Employee>>();
        mock.Setup(m => m.FindById(5))
            .Returns(new Employee {Id = 5});
        IRepository<Employee> repository = mock.Object;
        var employee = repository.FindById(5);
        Assert.IsTrue(employee.Id == 5);
    }
```

In this sample we ask Moq to dynamically build a repository, and then we program the repository with an expectation. The expectation tells the mock object to return a new employee object with an Id value of 5 when someone invokes the FindById method passing a value of 5. This test passes, and we didn’t need to build a full implementation to fake IRepository<T>.

Let’s revisit the tests we wrote earlier and rework them to use mocks instead of fakes. Just like before, we’ll use a base class to setup the common pieces of infrastructure we need for all of the controller’s tests.

```csharp
    public class EmployeeControllerTestBase {
        public EmployeeControllerTestBase() {
            _employeeData = EmployeeObjectMother.CreateEmployees()
                                                .AsQueryable();
            _repository = new Mock<IRepository<Employee>>();
            _unitOfWork = new Mock<IUnitOfWork>();
            _unitOfWork.Setup(u => u.Employees)
                       .Returns(_repository.Object);
            _controller = new EmployeeController(_unitOfWork.Object);
        }

        protected IQueryable<Employee> _employeeData;
        protected Mock<IUnitOfWork> _unitOfWork;
        protected EmployeeController _controller;
        protected Mock<IRepository<Employee>> _repository;
    }
```

The setup code remains mostly the same. Instead of using fakes, we’ll use Moq to construct mock objects. The base class arranges for the mock unit of work to return a mock repository when code invokes the Employees property. The rest of the mock setup will take place inside the test fixtures dedicated to each specific scenario. For example, the test fixture for the Index action will setup the mock repository to return a list of employees when the action invokes the FindAll method of the mock repository.

```csharp
    [TestClass]
    public class EmployeeControllerIndexActionTests
               : EmployeeControllerTestBase {
        public EmployeeControllerIndexActionTests() {
            _repository.Setup(r => r.FindAll())
                        .Returns(_employeeData);
        }
        // .. tests
        [TestMethod]
        public void ShouldBuildModelWithAllEmployees() {
            var result = _controller.Index();
            var model = result.ViewData.Model
                          as IEnumerable<Employee>;
            Assert.IsTrue(model.Count() == _employeeData.Count());
        }
        // .. and more tests
    }
```

Except for the expectations, our tests look similar to the tests we had before. However, with the recording ability of a mock framework we can approach testing from a different angle. We’ll look at this new perspective in the next section.
