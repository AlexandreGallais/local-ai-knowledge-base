---
title: "Merge Options in PLINQ (part 3 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/merge-options-in-plinq.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Merge Options in PLINQ (part 3 of 4)

```csharp
                     // aggregate results after all threads are done.
                     (total, thisThread) => total + thisThread,

                    // perform standard deviation calc on the aggregated result.
                    (finalSum) => Math.Sqrt((finalSum / (source.Length - 1)))
                );
                Console.WriteLine($"Mean value is = {mean}");
                Console.WriteLine($"Standard deviation is {standardDev}");
                Console.ReadLine();
            }
        }
    }

    partial class PLINQProgram
    {

        //} end namespace
    }
    // This class contains a subset of data from the Northwind database
    // in the form of string arrays. The methods such as GetCustomers, GetOrders, and so on
    // transform the strings into object arrays that you can query in an object-oriented way.
    // Many of the code examples in the PLINQ How-to topics are designed to be pasted into
    // the PLINQDataSample class and invoked from the Main method.
    partial class PLINQDataSample
    {

        public static void Main()
        {
            ////Call methods here.
            TestDataSource();

            Console.WriteLine("Press any key to exit.");
            Console.ReadKey();
        }

        static void TestDataSource()
        {
            Console.WriteLine($"Customer count: {GetCustomers().Count()}");
            Console.WriteLine($"Product count: {GetProducts().Count()}");
            Console.WriteLine($"Order count: {GetOrders().Count()}");
            Console.WriteLine($"Order Details count: {GetOrderDetails().Count()}");
        }

        public class Order
        {
            private Lazy<OrderDetail[]> _orderDetails;
            public Order()
            {
                _orderDetails = new Lazy<OrderDetail[]>(() => GetOrderDetailsForOrder(OrderID));
            }
            public int OrderID { get; set; }
            public string? CustomerID { get; set; }
            public DateTime OrderDate { get; set; }
            public DateTime ShippedDate { get; set; }
            public OrderDetail[] OrderDetails { get { return _orderDetails.Value; } }
        }

        public class Customer
        {
            private Lazy<Order[]> _orders;
            public Customer()
            {
                _orders = new Lazy<Order[]>(() => GetOrdersForCustomer(CustomerID));
            }
            public string? CustomerID { get; set; }
            public string? CustomerName { get; set; }
            public string? Address { get; set; }
            public string? City { get; set; }
            public string? PostalCode { get; set; }
            public Order[] Orders
            {
                get
                {
                    return _orders.Value;
                }
            }
        }

        public class Product
        {
            public string? ProductName { get; set; }
            public int ProductID { get; set; }
            public double UnitPrice { get; set; }
        }

        public class OrderDetail
        {
            public int OrderID { get; set; }
            public int ProductID { get; set; }
            public double UnitPrice { get; set; }
            public double Quantity { get; set; }
            public double Discount { get; set; }
        }

        public static IEnumerable<string> GetCustomersAsStrings()
        {
            return System.IO.File.ReadAllLines(@"..\..\plinqdata.csv")
                                            .SkipWhile((line) => line.StartsWith("CUSTOMERS") == false)
                                             .Skip(1)
                                            .TakeWhile((line) => line.StartsWith("END CUSTOMERS") == false);
        }

        public static IEnumerable<Customer> GetCustomers()
        {
            var customers = System.IO.File.ReadAllLines(@"..\..\plinqdata.csv")
                                             .SkipWhile((line) => line.StartsWith("CUSTOMERS") == false)
                                             .Skip(1)
                                             .TakeWhile((line) => line.StartsWith("END CUSTOMERS") == false);
            return (from line in customers
                    let fields = line.Split(',')
                    let custID = fields[0].Trim()
                    select new Customer()
                    {
                        CustomerID = custID,
                        CustomerName = fields[1].Trim(),
                        Address = fields[2].Trim(),
                        City = fields[3].Trim(),
                        PostalCode = fields[4].Trim()
                    });
        }

        public static Order[] GetOrdersForCustomer(string? id)
        {
            // Assumes we copied the file correctly!
            var orders = System.IO.File.ReadAllLines(@"..\..\plinqdata.csv")
                                             .SkipWhile((line) => line.StartsWith("ORDERS") == false)
                                              .Skip(1)
                                            .TakeWhile((line) => line.StartsWith("END ORDERS") == false);
            var orderStrings = from line in orders
                               let fields = line.Split(',')
                               where fields[1].CompareTo(id) == 0
                               select new Order()
                               {
                                   OrderID = Convert.ToInt32(fields[0]),
                                   CustomerID = fields[1].Trim(),
                                   OrderDate = DateTime.Parse(fields[2]),
                                   ShippedDate = DateTime.Parse(fields[3])
                               };
            return orderStrings.ToArray();
        }

        //  "10248, VINET, 7/4/1996 12:00:00 AM, 7/16/1996 12:00:00 AM
        public static IEnumerable<Order> GetOrders()
        {
            // Assumes we copied the file correctly!
            var orders = System.IO.File.ReadAllLines(@"..\..\plinqdata.csv")
                                            .SkipWhile((line) => line.StartsWith("ORDERS") == false)
                                             .Skip(1)
                                            .TakeWhile((line) => line.StartsWith("END ORDERS") == false);
            return from line in orders
                   let fields = line.Split(',')

                   select new Order()
                   {
                       OrderID = Convert.ToInt32(fields[0]),
                       CustomerID = fields[1].Trim(),
                       OrderDate = DateTime.Parse(fields[2]),
                       ShippedDate = DateTime.Parse(fields[3])
                   };
        }

        public static IEnumerable<Product> GetProducts()
        {
            // Assumes we copied the file correctly!
            var products = System.IO.File.ReadAllLines(@"..\..\plinqdata.csv")
                                            .SkipWhile((line) => line.StartsWith("PRODUCTS") == false)
                                             .Skip(1)
                                            .TakeWhile((line) => line.StartsWith("END PRODUCTS") == false);
            return from line in products
                   let fields = line.Split(',')
                   select new Product()
                   {
                       ProductID = Convert.ToInt32(fields[0]),
                       ProductName = fields[1].Trim(),
                       UnitPrice = Convert.ToDouble(fields[2])
                   };
        }

        public static IEnumerable<OrderDetail> GetOrderDetails()
        {
            // Assumes we copied the file correctly!
            var orderDetails = System.IO.File.ReadAllLines(@"..\..\plinqdata.csv")
                                            .SkipWhile((line) => line.StartsWith("ORDER DETAILS") == false)
                                             .Skip(1)
                                            .TakeWhile((line) => line.StartsWith("END ORDER DETAILS") == false);

            return from line in orderDetails
                   let fields = line.Split(',')
                   select new OrderDetail()
                   {
                       OrderID = Convert.ToInt32(fields[0]),
                       ProductID = Convert.ToInt32(fields[1]),
                       UnitPrice = Convert.ToDouble(fields[2]),
                       Quantity = Convert.ToDouble(fields[3]),
                       Discount = Convert.ToDouble(fields[4])
                   };
        }

        public static OrderDetail[] GetOrderDetailsForOrder(int id)
        {
            // Assumes we copied the file correctly!
            var orderDetails = System.IO.File.ReadAllLines(@"..\..\plinqdata.csv")
                                            .SkipWhile((line) => line.StartsWith("ORDER DETAILS") == false)
                                             .Skip(1)
                                            .TakeWhile((line) => line.StartsWith("END ORDER DETAILS") == false);

            var orderDetailStrings = from line in orderDetails
                                     let fields = line.Split(',')
                                     let ordID = Convert.ToInt32(fields[0])
                                     where ordID == id
                                     select new OrderDetail()
                                     {
                                         OrderID = ordID,
                                         ProductID = Convert.ToInt32(fields[1]),
                                         UnitPrice = Convert.ToDouble(fields[2]),
                                         Quantity = Convert.ToDouble(fields[3]),
                                         Discount = Convert.ToDouble(fields[4])
                                     };

            return orderDetailStrings.ToArray();
        }
    }

    partial class PLINQDataSample
    {

        // Paste into PLINQDataSample class.
        static void SimpleOrdering()
        {

            var customers = GetCustomers();

            // Take the first 20, preserving the original order
            var firstTwentyCustomers = customers
                                        .AsParallel()
                                        .AsOrdered()
                                        .Take(20);

            foreach (var c in firstTwentyCustomers)
                Console.Write("{0} ", c.CustomerID);

            // All elements in reverse order.
            var reverseOrder = customers
                                .AsParallel()
                                .AsOrdered()
                                .Reverse();

            foreach (var v in reverseOrder)
                Console.Write("{0} ", v.CustomerID);

            // Get the element at a specified index.
            var cust = customers.AsParallel()
                                .AsOrdered()
                                .ElementAt(48);

            Console.WriteLine($"Element #48 is: {cust.CustomerID}");
        }

        // Paste into PLINQDataSample class.
        static void OrderedThenUnordered()
        {

            var orders = GetOrders();
            var orderDetails = GetOrderDetails();

            var q2 = orders.AsParallel()
               .Where(o => o.OrderDate < DateTime.Parse("07/04/1997"))
               .Select(o => o)
               .OrderBy(o => o.CustomerID) // Preserve original ordering for Take operation.
               .Take(20)
               .AsUnordered()  // Remove ordering constraint to make join faster.
               .Join(
                      orderDetails.AsParallel(),
                      ord => ord.OrderID,
                      od => od.OrderID,
                      (ord, od) =>
                      new
                      {
                          ID = ord.OrderID,
                          Customer = ord.CustomerID,
                          Product = od.ProductID
                      }
                     )
               .OrderBy(i => i.Product); // Apply new ordering to final result sequence.

            foreach (var v in q2)
                Console.WriteLine($"{v.ID} {v.Customer} {v.Product}");
        }

        static void NestedLoops()
        {
            var date = DateTime.Now;
            var customers = GetCustomers();
            var q = from cust in customers.AsParallel()
                    from order in cust.Orders.AsParallel()
                    where order.OrderDate > date
                    select new { cust, order };
        }

        // Paste into PLINQDataSample class.
        static void ForceParallel()
        {
            var customers = GetCustomers();
            var parallelQuery = (from cust in customers.AsParallel()
                                    .WithExecutionMode(ParallelExecutionMode.ForceParallelism)
                                 where cust.City == "Berlin"
                                 select cust.CustomerName)
                                .ToList();
        }

        // Paste into PLINQDataSample class.
        static void SequentialDemo()
        {
            var orders = GetOrders();
            var query = (from order in orders.AsParallel()
                         orderby order.OrderID
                         select new
                         {
                             order.OrderID,
                             OrderedOn = order.OrderDate,
                             ShippedOn = order.ShippedDate
                         })
                         .AsSequential().Take(5);
        }

        class FileIteration
        {
            static void Main() { }
        }

        // Paste into PLINQDataSample class.
        static void PLINQExceptions_1()
        {
            // Using the raw string array here. See PLINQ Data Sample.
            string[] customers = GetCustomersAsStrings().ToArray();

            // First, we must simulate some corrupt input.
            customers[54] = "###";

            var parallelQuery = from cust in customers.AsParallel()
                                let fields = cust.Split(',')
                                where fields[3].StartsWith("C") //throw indexoutofrange
                                select new { city = fields[3], thread = Thread.CurrentThread.ManagedThreadId };
            try
            {
                // We use ForAll although it doesn't really improve performance
                // since all output is serialized through the Console.
                parallelQuery.ForAll(e => Console.WriteLine("City: {0}, Thread:{1}", e.city, e.thread));
            }

            // In this design, we stop query processing when the exception occurs.
            catch (AggregateException e)
            {
                foreach (var ex in e.InnerExceptions)
                {
                    Console.WriteLine(ex.Message);
                    if (ex is IndexOutOfRangeException)
```
