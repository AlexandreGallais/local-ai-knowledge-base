---
title: "Pipe Operations in .NET"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/io/pipe-operations.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Pipe Operations in .NET

Pipes provide a means for interprocess communication. There are two types of pipes:

- Anonymous pipes.

     Anonymous pipes provide interprocess communication on a local computer. Anonymous pipes require less overhead than named pipes but offer limited services. Anonymous pipes are one-way and cannot be used over a network. They support only a single server instance. Anonymous pipes are useful for communication between threads, or between parent and child processes where the pipe handles can be easily passed to the child process when it is created.

     In .NET, you implement anonymous pipes by using the `System.IO.Pipes.AnonymousPipeServerStream` and `System.IO.Pipes.AnonymousPipeClientStream` classes.

     See How to: Use Anonymous Pipes for Local Interprocess Communication.

- Named pipes.

     Named pipes provide interprocess communication between a pipe server and one or more pipe clients. Named pipes can be one-way or duplex. They support message-based communication and allow multiple clients to connect simultaneously to the server process using the same pipe name. Named pipes also support impersonation, which enables connecting processes to use their own permissions on remote servers.

     In .NET, you implement named pipes by using the `System.IO.Pipes.NamedPipeServerStream` and `System.IO.Pipes.NamedPipeClientStream` classes.

     See How to: Use Named Pipes for Network Interprocess Communication.

## See also

- File and Stream I/O
- How to: Use Anonymous Pipes for Local Interprocess Communication
- How to: Use Named Pipes for Network Interprocess Communication
