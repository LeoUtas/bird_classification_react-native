<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#introduction">Introduction</a></li>
    <li><a href="#what-does-the-app-do">What does the app do?</a></li>
    <li><a href="#how-did-I-make-the-app">How did I make the app?</a></li>
    <li><a href="#app-design">App design</a></li>
    <li><a href="#ui-design">UI design</a></li>
    <li><a href="#ui-code-structure">UI code structure</a></li>
    <li><a href="#backend">Backend</a></li>
    <li><a href="#model-development">Model development</a></li>
    <li><a href="#future-improvement">Future improvement</a></li>
  </ol>
</details>

## Introduction

When I volunteered at a conservation center in Australia, I loved going on hikes and watching birds. I often found myself curious about the names of the different birds I encountered. I wished I have a Spell Book that can tell me the name of a bird if I showed it a photo. It led to the creation of the Bird Classification app.

## What does the app do?

This is an IOS app that can classify 524 different species of birds. All you have to do is select a photo of the bird, and the app will use its image classification model to identify the bird species. Additionally, if you're logged in, you can learn a fun fact about the bird and save it to your collection for later.

Right now, the app is available for testing on TestFlight in the AppStore, so if you're interested in trying it out, please get in touch with me, and I'll add you as a tester.

<a href="https://youtube.com/shorts/nVCGWkcglGo">Demo video</a>

## How did I make the app?

I usually begin by designing the three main parts of an app: the user interface (UI), the backend, and the database. After that, my workflow goes like this:

-   I use Figma to create the UI design.
-   Then, I code the UI without adding any functions to it yet.
-   Next, I work on coding the backend and start adding some features to the UI.
-   Finally, I configurate the connection between the UI, the backend, and the database, and complete the functionality.

## App design

<p align="center">
  <a href="GIF">
    <img src="/assets/appDesign.png" alt=""/>
  </a>
</p>

## UI design

Link to the figma design: <a href="https://www.figma.com/file/t5Jt96p4rlIDbjxL7HsveU/Bird-classification?type=design&node-id=0%3A1&mode=design&t=i7MJhRhpXRn3gHbc-1">figma design</a>

## UI code structure

<p align="center">
  <a href="GIF">
    <img src="/assets/UIdiagram.png" alt=""/>
  </a>
</p>

## Backend

Link to the backend repository <a href="https://github.com/LeoUtas/bird_classification_flask_backend.git">Bird Classification backend</a>

## Model development

Link to the research work <a href="https://github.com/LeoUtas/bird_classification_research.git">Bird Classification model finetuning</a>

## Future improvement

There are things I will keep doing for future improvement:

-   Model speed performance
-   Better notification messages (e.g., SignUp, SignIn, etc.)
-   More user-friendly authentication mechanism

Please give me your suggestion, thank you

I'm excited to share this work. Please feel free to explore its functionalities. Thank you for this far. Have a wonderful day ahead!

Best, Hoang Ng
