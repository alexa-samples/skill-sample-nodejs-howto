# Step-by-Step Guide to Build a How-To Skill

We have launched a new skill template that makes it easy for developers and non-developers to create a skill similar to “DrinkMaster”, "Aromatherapy", "Timed Meditation", "Minecraft Helper", etc. These type of skills share the unique ability to parameterize what the user says and map it to a content catalog. For example, a user might say "Alexa, Ask Aromatherapy for a recipe for focus" and Alexa would map the word "focus" to the correct oil combination in the content catalog. Or, a user might say "Alexa, Ask DrinkMaster how to make a Margarita" and Alexa would map the word "margarita" to the correct drink recipe in the content catalog.

The template leverages [AWS Lambda](https://aws.amazon.com/lambda/), the [Alexa Skills Kit (ASK)](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit), and the [ASK SDK](https://developer.amazon.com/public/community/post/Tx213D2XQIYH864/Announcing-the-Alexa-Skills-Kit-for-Node-js), while providing the business logic, multiple language support, use cases, error handling and help functions for your skill. You just need to come up with a content idea (like "Snack Recipes"), plug in your content and edit the sample provided (we walk you through how it’s done). It's a valuable way to quickly learn the end-to-end process for building and publishing an Alexa skill.

This tutorial will walk first-time Alexa skills developers through all the required steps involved in creating a skill using this how-to skill template, called ‘Minecraft Helper’. This post assumes you have some familiarity with JavaScript/Node.js (or a similar programming language) and the Alexa Skills Kit.

Using the Alexa Skills Kit, you can build an application that can receive and respond to voice requests made on the Alexa platform.  In this tutorial, you’ll build a web service to handle notifications from Alexa and map this service to a skill in the Amazon Developer Portal, making it available on your device and to all Alexa users after certification.

 After completing this tutorial, you will know how to:

   * **Create a parameter-based skill** - This tutorial will walk first-time Alexa skills developers through all the required steps involved in creating a parameter-based skill using a template called ‘Minecraft Helper’.
   * **Understand the basics of VUI design** - Creating this skill will help you understand the basics of creating a working Voice User Interface (VUI) while using a cut/paste approach to development. You will learn by doing, and end up with a published Alexa skill. This tutorial includes instructions on how to customize the skill and submit it for certification. For guidance on designing a voice experience with Alexa you can also [watch this video](https://goto.webcasts.com/starthere.jsp?ei=1087592).
   * **Use JavaScript/Node.js and the Alexa Skills Kit to create a skill** - You will use the template as a guide but the customization is up to you. For more background information on using the Alexa Skills Kit please [watch this video](https://goto.webcasts.com/starthere.jsp?ei=1087595).
   * **Get your skill published** - Once you have completed your skill, this tutorial will guide you through testing your skill and sending your skill through the certification process, making it available to be enabled by any Alexa user.

# Let's Get Started

<a href=".instructions/1-voice-user-interface.md"><img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_get_started._TTH_.png" /></a>

<img height="1" width="1" src="https://www.facebook.com/tr?id=1847448698846169&ev=PageView&noscript=1"/>
