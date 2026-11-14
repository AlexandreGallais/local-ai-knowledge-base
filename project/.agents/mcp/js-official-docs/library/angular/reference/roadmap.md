---
title: "Angular Roadmap (part 1 of 3)"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/reference/roadmap.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Angular Roadmap
Learn how the Angular team is building momentum on the web.

As an open source project, Angular’s daily commits, PRs and momentum is all trackable on GitHub. To increase transparency into how this daily work connects to the framework’s future, our roadmap brings together the team’s current and future planned vision.

The following projects are not associated with a particular Angular version. We will release them on completion, and they will be part of a specific version based on our release schedule, following semantic versioning. For example, we release features in the next minor after completion or the next major if they include breaking changes.

Currently, Angular has three goals for the framework:

1. Improve the AI experience for developers
1. Improve the Angular developer experience
1. Improve the framework’s performance

Continue reading to learn how we plan to deliver these objectives with specific project work.

## Explore modern Angular

Start developing with the latest Angular features from our roadmap. This list represents the current status of new features from our roadmap:

### Available to experiment with

- Web MCP

### Production ready

- Signal Forms
- Resource API
- httpResource
- Zoneless change detection
- Linked Signal API
- Incremental hydration
- Effect API
- Event replay with SSR
- Route-level render mode

## Improving the AI experience for Angular Developers

### Bringing the best of AI to Angular

  **AI Powered Angular**
  AI continues to shape the development landscape. It has changed how we develop apps and the types of user experiences that are possible. We plan to best support the developer community in AI-assisted coding and integrating AI in their applications.

  **AI Development**
  The team will continue to develop meaningful integrations with tools like Google AI Studio, Gemini CLI and other agentic tooling such as Agentic IDEs like Antigravity. We plan to launch solutions that stay in line with the rapidly evolving industry. Some examples include agent skills, new MCP features and AI SDKs.

  **Code Generation**
  Based on our research, code generation for Angular is already high quality with modern LLMs. We will continue our investments in improving code generation for Angular. This means we will regularly evaluate code generation quality using current models and work to improve it through system instructions, documentation, and tactical framework changes.

  **AI Powered Experiences**
  There is a new frontier for Angular developers to explore with new concepts such as Dynamic UI generation. We started with building Angular support for A2UI and are actively searching out more opportunities to support modern application experiences.

## Improving the Angular developer experience

### Developer velocity

  **Compiler**
    Microsoft has spent the last year porting the TypeScript compiler to Go, with the promise of a 5 - 10x speedup for typical TypeScript compilations. Angular has perhaps one of the deepest integrations with the TypeScript compiler, which will require bigger architectural changes to support new tsgo-based workflows for both the compiler and language service.

We're in the process of prototyping and exploring what this support would look like, and will deliver an Angular compiler that is compatible with tsgo and brings the performance benefits of Microsoft's native port to the Angular ecosystem.

  **Enhanced Ecosystem compatibility**
    Developers are mixing AI generated code with manually generated code, and want to make use of popular libraries and integrate new experiences quickly. Angular wants to integrate well into that ecosystem - developers should be able to use the tools they love and mix and match frameworks according to their requirements.

As part of this project, we'll explore the requirement space of cross framework interop and our build tooling to improve our compatibility.

  **Components**
  In Angular v21, we launched Angular Aria in developer preview, providing eight patterns for accessible, headless components. In Angular v22, we promoted Angular Aria to stable, and we plan to introduce new patterns where needed. We want to provide developers with a solid foundation for developing their own components using Angular Aria - we provide the interactions and you bring the style that matches your design systems. Developers will have the choice of developing custom components with Angular Aria, use interaction patterns from the CDK, or use ready-made styled Material Components.

For accessibility, we are continuously evaluating the components and patterns against accessibility standards such as WCAG and are working to fix any issues that arise from this process.

### Improve tooling

  **Modernize unit testing tooling with ng test**
  Following the stable release of Vitest in Angular v21, it is now our primary test runner. We are now focused on promoting our experimental Karma to Vitest migration tool to stable as well as investigating new features to further refine and improve the developer testing workflow.
