---
title: "Go language-specific guide (part 1 of 7)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/guides/golang.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

This guide will show you how to create, test, and deploy containerized Go applications using Docker.

> **Acknowledgment**
>
> Docker would like to thank Oliver Frolovs for his contribution to this guide.

## What will you learn?

In this guide, you’ll learn how to:

- Create a `Dockerfile` which contains the instructions for building a container image for a program written in Go.
- Run the image as a container in your local Docker instance and manage the container's lifecycle.
- Use multi-stage builds for building small images efficiently while keeping your Dockerfiles easy to read and maintain.
- Use Docker Compose to orchestrate running of multiple related containers together in a development environment.

## Prerequisites

Some basic understanding of Go and its toolchain is assumed. This isn't a Go tutorial. If you are new to the : languages:,
the Go website is a great place to explore,
so _go_ (pun intended) check it out!

You also must know some basic Docker concepts as well as to
be at least vaguely familiar with the Dockerfile format.

Your Docker set-up must have BuildKit enabled. BuildKit is enabled by default for all users on Docker Desktop.
If you have installed Docker Desktop, you don’t have to manually enable BuildKit. If you are running Docker on Linux,
please check out BuildKit getting started page.

Some familiarity with the command line is also expected.

## What's next?

The aim of this guide is to provide enough examples and instructions for you to containerize your own Go application and deploy it into the Cloud.

Start by building your first Go image.
