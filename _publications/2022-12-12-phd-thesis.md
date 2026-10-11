---
title: "[Thesis] Generative Factorization for Object-Centric Representation Learning"
collection: "publications"
tags: ["generative models", "world models", "causal representation learning"]
permalink: "/publication/2022-generative-factorization-thesis"
date: "2022-12-12"
author_list: "<strong>Li Nanbo</strong>"
venue: "PhD thesis · University of Edinburgh"
paperurl: "https://era.ed.ac.uk/bitstreams/49f6d76c-0620-4667-8051-d065d218e9f0/download"
summary: "Unsupervised generative methods for recovering objects and scene structure: multi-view learning with MulMON, latent duplicate suppression, and spatial-temporal factorization with DyMON."
# excerpt: "Develops unsupervised generative methods for object-centric scene understanding across multiple viewpoints and dynamic scenes."
excerpt: "Unsupervised generative methods for recovering objects and scene structure: multi-view learning with MulMON, latent duplicate suppression, and spatial-temporal factorization with DyMON."
---

How can a model discover the objects composing a scene from images alone? My PhD thesis studies generative factorization as a route to object-centric representation learning, recovering scene structure without object-level supervision and separating properties of the scene from the conditions under which it is observed.

## From latent variables to scene structure

{% include publication-figure.html src="/assets/phd-thesis/3_causal_models.png" width="1841" height="708" alt="Three graphical models: a single latent variable generating an image, multiple object latents generating an image, and scene latents separated from viewpoint and other observation factors." caption="Three generative graphical models illustrate progressively more structured explanations of an observation X: a single latent Z, object-wise factors, and scene factors separated from viewpoint V and other influences." pdf="/assets/phd-thesis/3_causal_models.pdf" %}

## Three complementary directions

- **MulMON** aggregates multiple views into a shared set of object representations. Predicting new viewpoints encourages these representations to resolve ambiguities in individual images.
- **Latent duplicate suppression (LDS)** addresses redundant object representations, helping the model avoid explaining the same object with multiple latent components.
- **DyMON** extends object-centric learning to dynamic scenes, factorizing changes caused by camera motion and by object dynamics.

Together, these directions connect scene decomposition with generative prediction: representations can be queried from new viewpoints and, in the dynamic setting, across time. The thesis develops this progression from multi-view observations towards structured models of changing scenes.
