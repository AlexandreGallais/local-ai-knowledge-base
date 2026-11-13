---
title: "Fundamentals of garbage collection (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/garbage-collection/fundamentals.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Fundamentals of garbage collection

In the common language runtime (CLR), the garbage collector (GC) serves as an automatic memory manager. The garbage collector manages the allocation and release of memory for an application. Therefore, developers working with managed code don't have to write code to perform memory management tasks. Automatic memory management can eliminate common problems such as forgetting to free an object and causing a memory leak or attempting to access freed memory for an object that's already been freed.

This article describes the core concepts of garbage collection.

## Benefits

The garbage collector provides the following benefits:

- Frees developers from having to manually release memory.

- Allocates objects on the managed heap efficiently.

- Reclaims objects that are no longer being used, clears their memory, and keeps the memory available for future allocations. Managed objects automatically get clean content to start with, so their constructors don't have to initialize every data field.

- Provides memory safety by making sure that an object can't use for itself the memory allocated for another object.

## Fundamentals of memory

The following list summarizes important CLR memory concepts:

- Each process has its own, separate virtual address space. All processes on the same computer share the same physical memory and the page file, if there's one.

- By default, on 32-bit computers, each process has a 2-GB user-mode virtual address space.

- As an application developer, you work only with virtual address space and never manipulate physical memory directly. The garbage collector allocates and frees virtual memory for you on the managed heap.

  If you're writing native code, you use Windows functions to work with the virtual address space. These functions allocate and free virtual memory for you on native heaps.

- Virtual memory can be in three states:

  | State | Description |
  |---------|---------|
  | Free | The block of memory has no references to it and is available for allocation. |
  | Reserved | The block of memory is available for your use and can't be used for any other allocation request. However, you can't store data to this memory block until it's committed. |
  | Committed | The block of memory is assigned to physical storage. |

- Virtual address space can get fragmented, which means that there are free blocks known as holes in the address space. When a virtual memory allocation is requested, the virtual memory manager has to find a single free block that is large enough to satisfy the allocation request. Even if you have 2 GB of free space, an allocation that requires 2 GB will be unsuccessful unless all of that free space is in a single address block.

- You can run out of memory if there isn't enough virtual address space to reserve or physical space to commit.

  The page file is used even if physical memory pressure (demand for physical memory) is low. The first time that physical memory pressure is high, the operating system must make room in physical memory to store data, and it backs up some of the data that's in physical memory to the page file. The data isn't paged until it's needed, so it's possible to encounter paging in situations where the physical memory pressure is low.

### Memory allocation

When you initialize a new process, the runtime reserves a contiguous region of address space for the process. This reserved address space is called the managed heap. The managed heap maintains a pointer to the address where the next object in the heap will be allocated. Initially, this pointer is set to the managed heap's base address. All reference types are allocated on the managed heap. When an application creates the first reference type, memory is allocated for the type at the base address of the managed heap. When the application creates the next object, the runtime allocates memory for it in the address space immediately following the first object. As long as address space is available, the runtime continues to allocate space for new objects in this manner.

Allocating memory from the managed heap is faster than unmanaged memory allocation. Because the runtime allocates memory for an object by adding a value to a pointer, it's almost as fast as allocating memory from the stack. In addition, because new objects that are allocated consecutively are stored contiguously in the managed heap, an application can access the objects quickly.

### Memory release

The garbage collector's optimizing engine determines the best time to perform a collection based on the allocations being made. When the garbage collector performs a collection, it releases the memory for objects that are no longer being used by the application. It determines which objects are no longer being used by examining the application's *roots*. An application's roots include static fields, local variables on a thread's stack, CPU registers, GC handles, and the finalize queue. Each root either refers to an object on the managed heap or is set to null. The garbage collector can ask the rest of the runtime for these roots. The garbage collector uses this list to create a graph that contains all the objects that are reachable from the roots.

Objects that aren't in the graph are unreachable from the application's roots. The garbage collector considers unreachable objects garbage and releases the memory allocated for them. During a collection, the garbage collector examines the managed heap, looking for the blocks of address space occupied by unreachable objects. As it discovers each unreachable object, it uses a memory-copying function to compact the reachable objects in memory, freeing up the blocks of address spaces allocated to unreachable objects. Once the memory for the reachable objects has been compacted, the garbage collector makes the necessary pointer corrections so that the application's roots point to the objects in their new locations. It also positions the managed heap's pointer after the last reachable object.

Memory is compacted only if a collection discovers a significant number of unreachable objects. If all the objects in the managed heap survive a collection, then there's no need for memory compaction.

To improve performance, the runtime allocates memory for large objects in a separate heap. The garbage collector automatically releases the memory for large objects. However, to avoid moving large objects in memory, this memory is usually not compacted.

## Conditions for a garbage collection

Garbage collection occurs when one of the following conditions is true:

- The system has low physical memory. The memory size is detected by either the low memory notification from the operating system or low memory as indicated by the host.

- The memory that's used by allocated objects on the managed heap surpasses an acceptable threshold. This threshold is continuously adjusted as the process runs.

- The `System.GC.Collect*` method is called. In almost all cases, you don't have to call this method because the garbage collector runs continuously. This method is primarily used for unique situations and testing.

## The managed heap

After the CLR initializes the garbage collector, it allocates a segment of memory to store and manage objects. This memory is called the managed heap, as opposed to a native heap in the operating system.

There's a managed heap for each managed process. All threads in the process allocate memory for objects on the same heap.

To reserve memory, the garbage collector calls the Windows VirtualAlloc function and reserves one segment of memory at a time for managed applications. The garbage collector also reserves segments as needed and releases segments back to the operating system (after clearing them of any objects) by calling the Windows VirtualFree function.

> **Important:**
> The size of segments allocated by the garbage collector is implementation-specific and is subject to change at any time, including in periodic updates. Your app should never make assumptions about or depend on a particular segment size, nor should it attempt to configure the amount of memory available for segment allocations.

The fewer objects allocated on the heap, the less work the garbage collector has to do. When you allocate objects, don't use rounded-up values that exceed your needs, such as allocating an array of 32 bytes when you need only 15 bytes.

When a garbage collection is triggered, the garbage collector reclaims the memory that's occupied by dead objects. The reclaiming process compacts live objects so that they're moved together, and the dead space is removed, thereby making the heap smaller. This process ensures that objects that are allocated together stay together on the managed heap to preserve their locality.

The intrusiveness (frequency and duration) of garbage collections is the result of the volume of allocations and the amount of survived memory on the managed heap.

The heap can be considered as the accumulation of two heaps: the large object heap and the small object heap. The large object heap contains objects that are 85,000 bytes and larger, which are usually arrays. It's rare for an instance object to be extra large.

> **Tip:**
> You can configure the threshold size for objects to go on the large object heap.
