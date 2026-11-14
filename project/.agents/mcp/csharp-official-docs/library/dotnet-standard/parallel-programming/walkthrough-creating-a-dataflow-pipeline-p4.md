---
title: "Walkthrough: Creating a Dataflow Pipeline (part 4 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/walkthrough-creating-a-dataflow-pipeline.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Walkthrough: Creating a Dataflow Pipeline (part 4 of 4)

## Next Steps

 This example sends one URL to process through the dataflow pipeline. If you send more than one input value through a pipeline, you can introduce a form of parallelism into your application that resembles how parts might move through an automobile factory. When the first member of the pipeline sends its result to the second member, it can process another item in parallel as the second member processes the first result.

 The parallelism that is achieved by using dataflow pipelines is known as *coarse-grained parallelism* because it typically consists of fewer, larger tasks. You can also use a more *fine-grained parallelism* of smaller, short-running tasks in a dataflow pipeline. In this example, the `findReversedWords` member of the pipeline uses PLINQ to process multiple items in the work list in parallel. The use of fine-grained parallelism in a coarse-grained pipeline can improve overall throughput.

 You can also connect a source dataflow block to multiple target blocks to create a *dataflow network*. The overloaded version of the `System.Threading.Tasks.Dataflow.DataflowBlock.LinkTo*` method takes a `System.Predicate`1` object that defines whether the target block accepts each message based on its value. Most dataflow block types that act as sources offer messages to all connected target blocks, in the order in which they were connected, until one of the blocks accepts that message. By using this filtering mechanism, you can create systems of connected dataflow blocks that direct certain data through one path and other data through another path. For an example that uses filtering to create a dataflow network, see Walkthrough: Using Dataflow in a Windows Forms Application.

## See also

- Dataflow
