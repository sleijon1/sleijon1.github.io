---
layout: post_disc
title: "LLMs, Cheeseburgers & Expensive Tea"
date: 2023-12-09
categories: ai
---

I am currently in the process of researching the possibilities & limitations of LLMs and the OpenAI API.
The purpose is to create a chat bot with domain-specific knowledge, optimal pricing,
and a tech stack that supports various constraints, some of which are not ironed out yet.

In this post I wish to briefly summarize the important practical concepts surrounding LLMs. References will be given at the end for a deeper dive into the subject.

## LLMs, PE & RAG

What is important to understand and what I think can be slightly confusing if you are just starting on your LLM journey is that a lot of what is being done behind the scenes to make a performant chat bot or whatever else you are building with your LLM is not actually the LLM doing work. Now, don't get me wrong the LLM is definetly the workhorse but a lot of the customization & optimization is done by wrapping other "stuff" around the LLM. However, an important part of customization is the fine tuning process which does indeed directly impact the underlying LLM.

Three important concepts to understanding the current LLM space for application development are: [Prompt Engineering](#prompt-engineering), [Retrieval Augmented Generation - RAG](#retrieval-augmented-generation---rag) and fine tuning. Ill cover the first two in this post.

### Prompt Engineering

Prompt Engineering is the fancy term for being cognisant of how and what prompts you submit to the bot. LLMs predict the next word by looking at its context window and selecting the word with highest probability out of all possible words. As such the format and content of your prompts affects the output of the model to a great extent. Which is all but a groundbreaking statement but this fact leads to some interesting optimization areas:

#### Formulating prompts unambiguously

Similar to human communication, if you ask the model a question that is ambiguous there is a wide range of possible outputs of the model. The possible next word given the context is a large list which can put the LLM down an answer track that is perpendicular to the one you want. To illustrate this lets look at an example:

Say I want to find out the weight range of bowling balls (who doesn't want to know that right?), the following chat ensues:

> Me: How much does the round things weigh that have holes in them and can be thrown. Sometimes they are yellow.
>
> ChatGPT: It sounds like you're describing a type of sports equipment, specifically a tennis ball. Tennis balls are typically hollow rubber balls with a felt covering, and they are commonly used in the sport of tennis. The weight of a standard tennis ball is around 2 ounces (about 57 grams).

Looking at that answer it is quite clear that ambiguous and unclear questions can lead to bad results, who cares about tennis balls?

Now, lets look at a better prompt:

> Me: Bowling is a target sport and recreational activity in which a player rolls a ball toward pins. The balls are usually fairly heavy and have holes in them for players to stick their fingers in to get a grip of the ball. The balls come in various colors, some of them yellow. How much do bowling balls weigh? Please supply a range
>
> ChatGPT: Bowling balls typically range in weight from 6 to 16 pounds (2.7 to 7.3 kilograms). The weight of the bowling ball a player chooses depends on their strength, skill level, and personal preference. It's common for bowlers to select a ball that they can comfortably handle while still generating enough power and control for an effective roll down the lane.

Who could have asked for a better answer? Thanks GPT.

#### Providing background and context to the bot (few-shot learning)

If you are utilizing OpenAI API you have probably stumbled across the idea of providing the model with a context before submitting a question for the model to answer. In the [GUI](https://chat.openai.com/) this is equivalent to your previous chat messages. By giving the bot a context to add into the prediction of the next words you can prime your model to find appropriate answers to a narrower scope of questions.

Lets say I wanted to create a chat bot for McDonalds :fries: :

> Me: How much does your cheeseburger cost?
>
> ChatGPT: I don't have the capability to sell products or provide real-time pricing information. My purpose is to assist and provide information to the best of my knowledge. If you're looking for the cost of a cheeseburger, I recommend checking with local restaurants, fast-food chains, or online food delivery services in your area for the most accurate and up-to-date pricing information.

That, is clearly not something I wanna tell my customers if I am trying to increase sales at my local McDonalds. Now, lets try giving the model some context beforehand:

> Context: You are a professional customer service representative working at McDonalds. You are aware of all the prices of all the different burgers that McDonalds offers. Additionally, you speak warmly to your customers with a just a hint of comedic punch to entice customers to want to buy your companies food.You make sure to finish your answers to customers with a catchy McDonalds-esque slogan.
>
> Me: How much does your cheeseburger cost?
>
> ChatGPT: Ah, the classic Cheeseburger – a pocket-friendly delight that's perfect for satisfying those cravings without breaking the bank! As of now, it's priced at [current price]. It's not just a burger; it's a cheesy masterpiece that won't weigh heavy on your wallet. How about treating yourself to a tasty deal today?
>
> Because at McDonald's, we believe in making every bite and every price tag a delightful experience!

Amazing, apart from "[current price]" which is a discussion for a different day.

Another aspect of LLM context is the importance of _resetting_ whenever the model has gone down an erroneous path, either by your own making or by the LLMs own answers. The bad context will continue to impact the next-word-probabilities of the output. Make sure to reset your McDonald's bot!

#### Altering model behaviour

The final prompt engineering optimization method I will cover here is to alter the models behaviour by e.g. asking it to take its time to think through the answer it produces, stating each step and elaborating where needed. This can lead to greater predictions of the next word since the probability of any single word leading the model down an erroneous path lessens. Of course this might be the opposite of what you want if you have a simple question where the answer is easy to predict for the model. Usually, no one rule applies to all scenarios in the world of LLMs.

This has some interesting parallels to how us humans think as well, food for thought.

### Retrieval Augmented Generation - RAG

RAG or Retrieval Augmented Generation is a self explanatory term in the sense that we retrieve customised data before polling the model for the generated answer, resulting in an augmented generation. This is a crucial step to enable customisation of the LLM to your specific application.

Lets say you are integrating a chat bot into your application web shop that sells high end limited edition coffee and tea. Since the data on your super rare beverage types might not be publicly available there is no way for the LLM to know have data on these beverages. RAG as a method allows you to inject that data into the context of the LLM, augmenting the generation with fresh up-to-date data. This is especially important if your custom data updates regularly. You want the bot to be able to answer questions about your 10 latest exquisite beverages? Keep that data readily available in a data storage, fetch it when a user asks a question and send the question together with the retrieved data into to your LLM and the answer will in most cases be quite good.

The concerned reader might wonder how I will know what to retrieve from my database? And what about if I have 5TB of coffe & tea data that I want to query from? To settle these concerns we have to shortly discuss the phenomena rising in popularity with the recent LLM boom: vector embeddings and vector search.

#### Vector Embeddings/Search

Without diving into the details of this topic the basic idea is this: convert our documents (customised data) into a vector format and store them as vectors in our data storage. This allows us to use measures such as [cosine similarity](https://en.wikipedia.org/wiki/Cosine_similarity) to calculate the distance between documents. The utilization of RAG & vector search in your application will look something like: store the documents as vector embeddings, convert incoming prompt to a vector (using the same embedding process!), look for the most _n_ most similar documents and add them to the context being sent to the LLM. Using this data format and distance measure we can make fast comparisons between documents and find the most similar documents using techniques such as nearest neighbor.

How data is retrieved and how quickly it is retrieved can also be optimized by using indices, which is also a discussion for another day :wink: In summary, vector embeddings solves the problems of quickly finding similar documents in our custom data storage to augment the LLM generation.

#### _Bonus_: Stay humble Mr(s). LLM

An interesting trick covered in this [OpenAI tutorial](https://platform.openai.com/docs/tutorials/web-qa-embeddings) is to prompt the bot to answer "I don't know" whenever it cannot predict the answer to a question from the custom data storage. This can be very useful when you want your bot to have an accurate answer or no answer at all. This is useful in many situations such as describing the details of a product, if the customer asks the bot for information on a product which the data does not cover you probably don't want the LLM to "guess" something.

## Future Topics

There is a lot to say on this subject such as theory behind LLMs, OpenAI, function calling, fine tuning and last but not least the actual implementations of these concepts. Any of which I might cover in the future! So stay tuned and thanks for reading if you got this far.

## References

Some of the references have been used in writing this post while others are left here for further study.

[1] [https://www.youtube.com/watch?app=desktop&v=ahnGLM-RC1Y]() - Maximizing LLM Performance

[2] [https://platform.openai.com/docs/tutorials/web-qa-embeddings]() - RAG(ish) tutorial

[3] [https://platform.openai.com/docs/guides/prompt-engineering]()

[4] [https://www.youtube.com/watch?v=zjkBMFhNj_g]() - Intro to LLMs

[5] [https://www.youtube.com/watch?v=jkrNMKz9pWU]() Jeremy Howard, Hackers Guide to LLMs
