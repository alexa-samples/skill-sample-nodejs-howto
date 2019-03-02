# Build An Alexa How-To Skill
<img src="https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/header._TTH_.png" />

## Customize the Skill to be Yours

At this point, you should have a working copy of our How To skill.  In order to make it your own, you will need to customize it with data and responses that you create.  Here are the things you will need to change:

1.  **New data.** You will need to provide a set of recipes for your topic.  We recommend a minimum of 25, but a total closer to 100 offers a better experience.

    1.  **Open a copy of recipes.js.** If you haven't already downloaded the code for this project, you can find a copy of recipes.js [here](../lambda/custom/recipes.js).  You can use a simple, lightweight code editor like [Atom](http://atom.io), [Sublime Text](http://sublimetext.com), or [VSCode](http://code.visualstudio.com), but you also have the option to edit the code directly in your Alexa-hosted or AWS-hosted Lambda function.

    1.  **Search for the comment "TODO: Replace this data with your own."**  This is the data for our skill.  You can see that it is a list of recipes in name-value pairs.

    1.  **When you have replaced the data in recipes.js, copy the contents of your file to your Lambda function.**  This should be as done in the same way as when you first created the skill (if you're not editing directly).

    1.  Open https://developer.amazon.com/alexa/console/ask and select your skill.  If you already have it open in the developer console, navigate to the Build tab.  Click on the LIST_OF_ITEMS slot type in the left navigation.  Update the slot values with the names of each recipe in your recipes.js file.  If you have many updates, consider using the **Bulk Edit** feature to edit the list in the browser, using the **Export** option if you want to edit using your favorite spreadsheet editor (you would import after making changes using the **Bulk Edit** feature), or modifying the original **en-US.json** file in a code/text editor and pasting it into the **JSON Editor** section.

    1. After making changes to the interaction model, be sure to save and build your model.

2.  **New sentences to respond to your users.** There are several sentences and responses that you will want to customize for your skill.

    1.  **Open a copy of index.js.** If you haven't already downloaded the code for this project, you can find a copy of index.js [here](../lambda/custom/index.js).  You can use a simple, lightweight code editor like [Atom](http://atom.io), [Sublime Text](http://sublimetext.com), or [VSCode](http://code.visualstudio.com), but you also have the option to edit the code directly in your Alexa-hosted or AWS-hosted Lambda function.

    2.  **Look for the comment "TODO: The items below this comment need your attention."** This is the beginning of the section where you need to customize several text strings for your skill.

    3.  **Continue through index.js until you reach the bottom of the file.**  This will ensure that you cover each of the values that you need to update.

3.  **New language.** If you are creating this skill for another language other than English, you will need to make sure Alexa's responses are also in that language.

    *  For example, if you are creating your skill in German, every single response that Alexa makes has to be in German.  You can't use English responses or your skill will fail certification.

4.  **Once you have made the updates listed on this page, you can click "Next" to move on to Publishing and Certification of your skill.**

[![Next Publication](https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/general/buttons/button_next_publication._TTH_.png)](./submit-for-certification.md)
