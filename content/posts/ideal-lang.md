+++
title = "thoughts on an ideal programming language"
date = "2022-10-03"
description = " "
+++

- **standardized**
  - one way to do it, forget about multiple ways to write the same thing(see *pythonic* code)
  - allows higher readability and understanding
  - let the compiler verify standardness
- **beginner-friendly**
  - allows low-effort code, will allow non 100% correctness(if I'm just trying to prototype something, I don't want to spend too much time on it)
- **expert-friendly**
  - allows high-effort code, will allow 100% correctness(if I want to write a program that is 100% correct, I should be able to do it)
- **type-driven development**
  - types as specification
  - constraints(maybe program synthesis?)
- **packages must be written by *experts*, and must be trending towards 100% correctness**
- **packages' public interfaces must conform to the previous version, when updating minor/patch versions(enforce semver)**

