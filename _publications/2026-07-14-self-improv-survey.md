---
title: "Self-Improvements in Modern Agentic Systems: A Survey"
collection: "publications"
tags: ["self-improvement", "agentic systems", "survey"]
permalink: "/publication/2026-self-improving-agents-survey"
date: "2026-07-14"
author_list: "Zhe Ren, Yimeng Chen, Dandan Guo, Guowei Rong, Tonghui Li, R. B. Xiong, Qingfeng Lan, Wenyi Wang, <strong>Li Nanbo</strong>, Yibo Yang, Mingchen Zhuge, Jürgen Schmidhuber"
venue: "arXiv preprint"
paperurl: "https://arxiv.org/abs/2607.13104"
projecturl: "https://selfimproving-agent.github.io/"
summary: "A system-level survey of self-improving agents, unifying updates to foundation models and to prompts, memory, tools, and executable control logic."
excerpt: "A system-level survey of self-improving agents, unifying updates to foundation models and to prompts, memory, tools, and executable control logic."
---

An agent can improve by changing its underlying model, but also by changing how that model is used. This survey brings these routes into a common framework: an agent consists of a foundation model and a surrounding scaffold, and self-improvement updates either component using signals collected or generated during its operation.

## A map of agent self-improvement

{% include publication-figure.html src="/assets/publications/self-improvement-survey.png" width="3939" height="2338" alt="Survey taxonomy dividing self-improvement into foundation-model updates and scaffolding updates to prompts, tools, memory, and full agent designs." caption="The survey's organizing framework connects model-level and scaffold-level improvements with their learning signals and application domains." source="https://github.com/selfimproving-agent/Awesome-Self-Improving-Agents/blob/main/assets/fig-si-main-001.png" %}

## What the survey covers

On the model side, we organize learning signals into intrinsic demonstrations, intrinsic feedback, and experience from interaction. On the scaffold side, we examine changes to prompts, memory, tools, and the executable logic coordinating the agent. This perspective connects mechanisms often studied separately and clarifies both what changes and what drives the change.

The survey also reviews applications, evaluation practices, benchmarks, and open problems, providing a system-level guide to designing and assessing self-improving agents.

Explore the [survey hub](https://selfimproving-agent.github.io/) and the accompanying [curated reading list](https://github.com/selfimproving-agent/Awesome-Self-Improving-Agents).
