---
title: "Walkthrough: Using BatchBlock and BatchedJoinBlock to Improve Efficiency (part 1 of 9)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/parallel-programming/walkthrough-using-batchblock-and-batchedjoinblock-to-improve-efficiency.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Walkthrough: Using BatchBlock and BatchedJoinBlock to Improve Efficiency

The TPL Dataflow Library provides the `System.Threading.Tasks.Dataflow.BatchBlock`1` and `System.Threading.Tasks.Dataflow.BatchedJoinBlock`2` classes so that you can receive and buffer data from one or more sources and then propagate out that buffered data as one collection. This batching mechanism is useful when you collect data from one or more sources and then process multiple data elements as a batch. For example, consider an application that uses dataflow to insert records into a database. This operation can be more efficient if multiple items are inserted at the same time instead of one at a time sequentially. This document describes how to use the `System.Threading.Tasks.Dataflow.BatchBlock`1` class to improve the efficiency of such database insert operations. It also describes how to use the `System.Threading.Tasks.Dataflow.BatchedJoinBlock`2` class to capture both the results and any exceptions that occur when the program reads from a database.

> **Note:**
> The TPL dataflow library (the `System.Threading.Tasks.Dataflow` namespace) is included in .NET 6 and later versions. For .NET Framework and .NET Standard projects, you need to install the 📦 System.Threading.Tasks.Dataflow NuGet package.

## Prerequisites

1. Read the Join Blocks section in the Dataflow document before you start this walkthrough.

1. Install the .NET 10 SDK. Use a development database, not a production database.

### Create a SQL database

Create or connect to a SQL database on one of the following platforms:

### Azure SQL Database

Create a SQL database in minutes using the Azure portal

### SQL database in Fabric

Load AdventureWorks sample data in your SQL database in Microsoft Fabric

### Microsoft SQL Server

Install SQL Server from the Installation Wizard

AdventureWorks sample databases

### SQL Server container

Create a SQL Server container in Docker

Create a SQL Server container with sqlcmd

Create a SQL Server container with the MSSQL extension for VS Code

---

Set the `SQL_CONNECTION_STRING` environment variable to a connection string for your development database. For example, use `Server=<server>,<port>;Database=<database>;User ID=<user_id>;Password=<password>;Encrypt=true;TrustServerCertificate=false`. Set the actual secret in your local environment, not in source code.

For a local development container with a self-signed certificate, use `TrustServerCertificate=true` only for that development connection. For production connections, use a trusted server certificate and keep certificate validation enabled.

The example creates a uniquely named global temporary table in `tempdb`. An open connection keeps the table available to the worker connections. The program resets only its own table between demonstrations and drops it when the demonstration ends. You don't need Northwind or SQL Server Compact.
