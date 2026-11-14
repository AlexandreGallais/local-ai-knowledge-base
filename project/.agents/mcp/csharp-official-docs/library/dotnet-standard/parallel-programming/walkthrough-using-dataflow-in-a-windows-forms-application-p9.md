---
title: "Walkthrough: Using Dataflow in a Windows Forms Application (part 9 of 12)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/parallel-programming/walkthrough-using-dataflow-in-a-windows-forms-application.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Walkthrough: Using Dataflow in a Windows Forms Application (part 9 of 12)

## Connecting the Dataflow Network to the User Interface

 This section describes how to connect the dataflow network to the user interface. The creation of the composite image and cancellation of the operation are initiated from the **Choose Folder** and **Cancel** buttons. When the user chooses either of these buttons, the appropriate action is initiated in an asynchronous manner.
