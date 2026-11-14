---
title: "Using IndexedDB (part 1 of 4)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/indexeddb_api/using_indexeddb/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using IndexedDB

IndexedDB is a way for you to persistently store data inside a user's browser. Because it lets you create web applications with rich query abilities regardless of network availability, your applications can work both online and offline.

## About this document

This tutorial walks you through using the asynchronous API of IndexedDB. If you are not familiar with IndexedDB, you should first read the IndexedDB key <example-value> and basic <example-value> article.

For the reference documentation on the IndexedDB API, see the IndexedDB API article and its subpages. This article documents the types of objects used by IndexedDB, as well as the methods of the asynchronous API (the synchronous API was removed from spec).

## Basic <example-value>

The basic <example-value> that IndexedDB encourages is the following:

1. Open a database.
2. Create an object store in the database.
3. Start a transaction and make a request to do some database operation, like adding or retrieving data.
4. Wait for the operation to complete by listening to the right kind of DOM event.
5. Do something with the results (which can be found on the request object).

With these big concepts under our belts, we can get to more concrete stuff.
