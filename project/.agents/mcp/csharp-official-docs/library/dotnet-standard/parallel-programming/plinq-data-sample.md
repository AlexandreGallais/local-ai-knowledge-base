---
title: "PLINQ Data Sample (part 1 of 8)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/plinq-data-sample.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# PLINQ Data Sample

This sample contains example data in .csv format, together with methods that transform it into in-memory collections of Customers, Products, Orders, and Order Details. To further experiment with PLINQ, you can paste code examples from certain other topics into the code in this topic and invoke it from the `Main` method. You can also use this data with your own PLINQ queries.

 The data represents a subset of the Northwind database. Fifty (50) customer records are included, but not all fields. A subset of the rows from the Orders and corresponding Order_Detail data for every Customer is included. All Products are included.

> **Note:**
> The data set is not large enough to demonstrate that PLINQ is faster than LINQ to Objects for queries that contain just basic `where` and `select` clauses. To observe speed increases for small data sets such as this, use queries that contain computationally expensive operations on every element in the data set.
