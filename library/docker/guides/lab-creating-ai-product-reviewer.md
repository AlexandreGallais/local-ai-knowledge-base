---
title: "Lab: Building an AI Product Reviewer"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/guides/lab-creating-ai-product-reviewer.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Lab: Building an AI Product Reviewer

Build a complete feedback analysis pipeline for a fictional AI product called
Jarvis. You'll write Node.js code that runs local LLMs and embedding models via
Docker Model Runner — no API keys, no cloud subscriptions, no data leaving your
machine.

## What you'll learn

By the end of this Labspace, you will have completed the following:

- Run LLMs locally via Docker Model Runner's OpenAI-compatible API
- Connect a Node.js app to Docker Model Runner using the OpenAI SDK and the Compose `models:` integration
- Perform sentiment analysis using low-temperature LLM classification
- Use embeddings and cosine similarity to cluster semantically related feedback
- Extract structured data from an LLM using `response_format: { type: 'json_object' }`
- Generate context-aware responses to reviews informed by extracted product features

## Modules

| #   | Module                              | Description                                                                        |
| --- | ----------------------------------- | ---------------------------------------------------------------------------------- |
| 1   | Introduction                        | Overview of the pipeline and Docker Model Runner setup                             |
| 2   | Project Setup & Docker Model Runner | Explore the starter project and wire up Compose model integration                  |
| 3   | Generating Synthetic Feedback       | Use the LLM to generate realistic product reviews as test data                     |
| 4   | Sentiment Analysis                  | Classify reviews as positive, negative, or neutral with low-temperature generation |
| 5   | Embeddings & Semantic Clustering    | Group related reviews using vector embeddings and cosine similarity                |
| 6   | Features & Responses                | Extract actionable features and generate context-aware review responses            |
| 7   | Wrap-up                             | Summary of techniques and ideas for extending the pipeline                         |
