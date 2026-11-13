---
title: "Inspect your injectors"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/tools/devtools/injectors.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Inspect your injectors

NOTE: The Injector Tree is available for Angular Applications built with version 17 or higher.

## View the injector hierarchy of your application

The **Injector Tree** tab lets you explore the structure of the Injectors configured in your application. Here you will see two trees representing the injector hierarchy of your application. One tree is your environment hierarchy, the other is your element hierarchy.

## Visualize resolution paths

When a specific injector is selected, the path that Angular's dependency injection algorithm traverses from that injector to the root is highlighted. For element injectors, this includes highlighting the environment injectors that the dependency injection algorithm jumps to when a dependency cannot be resolved in the element hierarchy.

See resolution rules for more details about how Angular resolves resolution paths.

## View injector providers

Clicking an injector that has configured providers will display those providers in a list on the right of the injector tree view. Here you can view the provided token and it's type. The button on the right of each provider allows you to log the provider in the console.
