---
title: "Using Gordon in Docker Desktop"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/ai/gordon/how-to/docker-desktop.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Using Gordon in Docker Desktop

Gordon is integrated into Docker Desktop. Access it from the sidebar to open
the Gordon view.

## Basic usage

To access Gordon:

1. Open Docker Desktop and sign in to your Docker account.
2. Select **Gordon** in the sidebar.
3. Type your question or request in the input field.
4. Press `Enter` or select the send button.

Gordon responds in the chat view and maintains context throughout the session.

## Working directory

The working directory sets the default context for Gordon's file operations.
Select your working directory when you start Gordon or use the directory icon
to change it during a conversation:

1. Select the directory icon in the Gordon input area.
2. Browse and select a different directory.

## Contextual help

The Gordon icon appears throughout Docker Desktop. Selecting it opens Gordon
pre-loaded with context about the item you are working with, such as container
logs or build output.

## Usage indicator

Docker Desktop shows a usage indicator so you can see how close you are to
your tier limit. See Usage limits and tiers for details.

## Disabling Gordon

To disable Gordon:

1. Open Docker Desktop Settings.
2. Navigate to the **AI** section.
3. Clear the **Enable Gordon** option.
4. Select **Apply**.

## Configure tools

You can control which tools Gordon has access to. See Configure
tools for details on enabling, disabling, and
fine-tuning tool permissions.
