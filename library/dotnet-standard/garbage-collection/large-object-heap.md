---
title: "Large object heap (LOH) on Windows (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/garbage-collection/large-object-heap.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# The large object heap on Windows systems

The .NET garbage collector (GC) divides objects up into small and large objects. When an object is large, some of its attributes become more significant than if the object is small. For instance, compacting it—that is, copying it in memory elsewhere on the heap—can be expensive. Because of this, the garbage collector places large objects on the large object heap (LOH). This article discusses what qualifies an object as a large object, how large objects are collected, and what kind of performance implications large objects impose.

> **Important:**
> This article discusses the large object heap in .NET Framework and .NET Core running on Windows systems only. It does not cover the LOH running on .NET implementations on other platforms.

## How an object ends up on the LOH

If an object is greater than or equal to 85,000 bytes in size, it's considered a large object. This number was determined by performance tuning. When an object allocation request is for 85,000 or more bytes, the runtime allocates it on the large object heap.

To understand what this means, it's useful to examine some fundamentals about the garbage collector.

The garbage collector is a generational collector. It has three generations: generation 0, generation 1, and generation 2. The reason for having three generations is that, in a well-tuned app, most objects die in gen0. For example, in a server app, the allocations associated with each request should die after the request is finished. The in-flight allocation requests will make it into gen1 and die there. Essentially, gen1 acts as a buffer between young object areas and long-lived object areas.

Newly allocated objects form a new generation of objects and are implicitly generation 0 collections. However, if they are large objects, they go on the large object heap (LOH), which is sometimes referred to as generation 3. Generation 3 is a physical generation that's logically collected as part of generation 2.

Large objects belong to generation 2 because they are collected only during a generation 2 collection. When a generation is collected, all its younger generation(s) are also collected. For example, when a generation 1 GC happens, both generation 1 and 0 are collected. And when a generation 2 GC happens, the whole heap is collected. For this reason, a generation 2 GC is also called a *full GC*. This article refers to generation 2 GC instead of full GC, but the terms are interchangeable.

Generations provide a logical view of the GC heap. Physically, objects live in managed heap segments. A *managed heap segment* is a chunk of memory that the GC reserves from the OS by calling the VirtualAlloc function on behalf of managed code. When the CLR is loaded, the GC allocates two initial heap segments: one for small objects (the small object heap, or SOH), and one for large objects (the large object heap).

The allocation requests are then satisfied by putting managed objects on these managed heap segments. If the object is less than 85,000 bytes, it is put on the segment for the SOH; otherwise, it is put on an LOH segment. Segments are committed (in smaller chunks) as more and more objects are allocated onto them.
For the SOH, objects that survive a GC are promoted to the next generation. Objects that survive a generation 0 collection are now considered generation 1 objects, and so on. However, objects that survive the oldest generation are still considered to be in the oldest generation. In other words, survivors from generation 2 are generation 2 objects; and survivors from the LOH are LOH objects (which are collected with gen2).

User code can only allocate in generation 0 (small objects) or the LOH (large objects). Only the GC can "allocate" objects in generation 1 (by promoting survivors from generation 0) and generation 2 (by promoting survivors from generation 1).

When a garbage collection is triggered, the GC traces through the live objects and compacts them. But because compaction is expensive, the GC *sweeps* the LOH; it makes a free list out of dead objects that can be reused later to satisfy large object allocation requests. Adjacent dead objects are made into one free object.

Use the `System.Runtime.GCSettings.LargeObjectHeapCompactionMode` property to specify that the LOH should be compacted during the next full blocking GC. The runtime might also compact the LOH automatically. If you allocate large objects and must ensure they don't move, pin them.

Figure 1 illustrates a scenario where the GC forms generation 1 after the first generation 0 GC where `Obj1` and `Obj3` are dead, and it forms generation 2 after the first generation 1 GC where `Obj2` and `Obj5` are dead. Note that this and the following figures are only for illustration purposes; they contain very few objects to better show what happens on the heap. In reality, many more objects are typically involved in a GC.

\
Figure 1: A generation 0 and a generation 1 GC.

Figure 2 shows that after a generation 2 GC that saw that `Obj1` and `Obj2` are dead, the GC forms contiguous free space out of memory that used to be occupied by `Obj1` and `Obj2`, which then was used to satisfy an allocation request for `Obj4`. The space after the last object, `Obj3`, to end of the segment can also be used to satisfy allocation requests.

\
Figure 2: After a generation 2 GC

If there isn't enough free space to accommodate the large object allocation requests, the GC first attempts to acquire more segments from the OS. If that fails, it triggers a generation 2 GC in the hope of freeing up some space.

During a generation 1 or generation 2 GC, the garbage collector releases segments that have no live objects on them back to the OS by calling the VirtualFree function. Space after the last live object to the end of the segment is decommitted (except on the ephemeral segment where gen0/gen1 live, where the garbage collector does keep some committed because your application will be allocating in it right away). And the free spaces remain committed though they are reset, meaning that the OS doesn't need to write data in them back to disk.

Since the LOH is only collected during generation 2 GCs, the LOH segment can only be freed during such a GC. Figure 3 illustrates a scenario where the garbage collector releases one segment (segment 2) back to the OS and decommits more space on the remaining segments. If it needs to use the decommitted space at the end of the segment to satisfy large object allocation requests, it commits the memory again. (For an explanation of commit/decommit, see the documentation for VirtualAlloc.)

\
Figure 3: The LOH after a generation 2 GC

## When is a large object collected?

In general, a GC occurs under one of the following three conditions:

- Allocation exceeds the generation 0 or large object threshold.

  The threshold is a property of a generation. A threshold for a generation is set when the garbage collector allocates objects into it. When the threshold is exceeded, a GC is triggered on that generation. When you allocate small or large objects, you consume generation 0 and the LOH's thresholds, respectively. When the garbage collector allocates into generation 1 and 2, it consumes their thresholds. These thresholds are dynamically tuned as the program runs.

  This is the typical case; most GCs happen because of allocations on the managed heap.

- The `System.GC.Collect*` method is called.

  If the parameterless `System.GC.Collect` method is called or another overload is passed `System.GC.MaxGeneration` as an argument, the LOH is collected along with the rest of the managed heap.

- The system is in low memory situation.

  This occurs when the garbage collector receives a high memory notification from the OS. If the garbage collector thinks that doing a generation 2 GC will be productive, it triggers one.

## LOH performance implications

Allocations on the large object heap impact performance in the following ways.

- Allocation cost.

  The CLR makes the guarantee that the memory for every new object it gives out is cleared. This means the allocation cost of a large object is dominated by memory clearing (unless it triggers a GC). If it takes two cycles to clear one byte, it takes 170,000 cycles to clear the smallest large object. Clearing the memory of a 16-MB object on a 2-GHz machine takes approximately 16 ms. That's a rather large cost.

- Collection cost.

  Because the LOH and generation 2 are collected together, if either one's threshold is exceeded, a generation 2 collection is triggered. If a generation 2 collection is triggered because of the LOH, generation 2 won't necessarily be much smaller after the GC. If there's not much data on generation 2, this has minimal impact. But if generation 2 is large, it can cause performance problems if many generation 2 GCs are triggered. If many large objects are allocated on a temporary basis and you have a large SOH, you could be spending too much time doing GCs. In addition, the allocation cost can really add up if you keep allocating and letting go of really large objects.

- Array elements with reference types.

  Very large objects on the LOH are usually arrays (it's very rare to have an instance object that's really large). If the elements of an array are reference-rich, it incurs a cost that is not present if the elements are not reference-rich. If the element doesn't contain any references, the garbage collector doesn't need to go through the array at all. For example, if you use an array to store nodes in a binary tree, one way to implement it is to refer to a node's right and left node by the actual nodes:

  ```csharp
  class Node
  {
     Data d;
     Node left;
     Node right;
  };

  Node[] binary_tr = new Node [num_nodes];
  ```

  If `num_nodes` is large, the garbage collector needs to go through at least two references per element. An alternative approach is to store the index of the right and the left nodes:

  ```csharp
  class Node
  {
     Data d;
     uint left_index;
     uint right_index;
  } ;
  ```

  Instead of referring the left node's data as `left.d`, you refer to it as `binary_tr[left_index].d`. And the garbage collector doesn't need to look at any references for the left and right node.

Out of the three factors, the first two are usually more significant than the third. Because of this, we recommend that you allocate a pool of large objects that you reuse instead of allocating temporary ones.
