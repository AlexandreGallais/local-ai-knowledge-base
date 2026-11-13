---
title: "Go language-specific guide (part 5 of 7)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/guides/golang.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Go language-specific guide (part 5 of 7)

## Use containers for Go development

### Prerequisites

Work through the steps of the run your image as a container module to learn how to manage the lifecycle of your containers.

### Introduction

In this module, you'll take a look at running a database engine in a container and connecting it to the extended version of the example application. You are going to see some options for keeping persistent data and for wiring up the containers to talk to one another. Finally, you'll learn how to use Docker Compose to manage such multi-container local development environments effectively.
