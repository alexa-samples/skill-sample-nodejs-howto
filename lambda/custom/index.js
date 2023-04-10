/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
const recipes = require('./recipes');
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

/* INTENT HANDLERS */
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    const item = requestAttributes.t(getRandomItem(Object.keys(recipes.RECIPE_EN_US)));

    const speakOutput = requestAttributes.t('WELCOME_MESSAGE', requestAttributes.t('SKILL_NAME'), item);
    const repromptOutput = requestAttributes.t('WELCOME_REPROMPT');

    handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(repromptOutput)
      .getResponse();
  },
};

const RecipeHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'RecipeIntent';
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    const itemSlot = handlerInput.requestEnvelope.request.intent.slots.Item;
    let itemName;
    if (itemSlot && itemSlot.value) {
      itemName = itemSlot.value.toLowerCase();
    }

    const cardTitle = requestAttributes.t('DISPLAY_CARD_TITLE', requestAttributes.t('SKILL_NAME'), itemName);
    const myRecipes = requestAttributes.t('RECIPES');
    const recipe = myRecipes[itemName];
    let speakOutput = '';

    if (recipe) {
      sessionAttributes.speakOutput = recipe;
      // uncomment the _2_ reprompt lines if you want to repeat the info
      // and prompt for a subsequent action
      // sessionAttributes.repromptSpeech = requestAttributes.t('RECIPE_REPEAT_MESSAGE');
      handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

      return handlerInput.responseBuilder
        .speak(sessionAttributes.speakOutput)
        // .reprompt(sessionAttributes.repromptSpeech)
        .withSimpleCard(cardTitle, recipe)
        .getResponse();
    }
    const repromptSpeech = requestAttributes.t('RECIPE_NOT_FOUND_REPROMPT');
    if (itemName) {
      speakOutput += requestAttributes.t('RECIPE_NOT_FOUND_WITH_ITEM_NAME', itemName);
    } else {
      speakOutput += requestAttributes.t('RECIPE_NOT_FOUND_WITHOUT_ITEM_NAME');
    }
    speakOutput += repromptSpeech;

    // save outputs to attributes, so we can use it to repeat
    sessionAttributes.speakOutput = speakOutput;
    sessionAttributes.repromptSpeech = repromptSpeech;

    handlerInput.attributesManager.setSessionAttributes(sessionAttributes);

    return handlerInput.responseBuilder
      .speak(sessionAttributes.speakOutput)
      .reprompt(sessionAttributes.repromptSpeech)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    const item = requestAttributes.t(getRandomItem(Object.keys(recipes.RECIPE_EN_US)));

    sessionAttributes.speakOutput = requestAttributes.t('HELP_MESSAGE', item);
    sessionAttributes.repromptSpeech = requestAttributes.t('HELP_REPROMPT', item);

    return handlerInput.responseBuilder
      .speak(sessionAttributes.speakOutput)
      .reprompt(sessionAttributes.repromptSpeech)
      .getResponse();
  },
};

const RepeatHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.RepeatIntent';
  },
  handle(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    return handlerInput.responseBuilder
      .speak(sessionAttributes.speakOutput)
      .reprompt(sessionAttributes.repromptSpeech)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent');
  },
  handle(handlerInput) {
    const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
    const speakOutput = requestAttributes.t('STOP_MESSAGE', requestAttributes.t('SKILL_NAME'));

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    console.log('Inside SessionEndedRequestHandler');
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${JSON.stringify(handlerInput.requestEnvelope)}`);
    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

/* Helper Functions */

// Finding the locale of the user
const LocalizationInterceptor = {
  process(handlerInput) {
    const localizationClient = i18n.use(sprintf).init({
      lng: handlerInput.requestEnvelope.request.locale,
      overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
      resources: languageStrings,
      returnObjects: true,
    });

    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = function (...args) {
      return localizationClient.t(...args);
    };
  },
};

// getRandomItem
function getRandomItem(arrayOfItems) {
  // the argument is an array [] of words or phrases
  let i = 0;
  i = Math.floor(Math.random() * arrayOfItems.length);
  return (arrayOfItems[i]);
}

/* LAMBDA SETUP */
const skillBuilder = Alexa.SkillBuilders.custom();
exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    RecipeHandler,
    HelpHandler,
    RepeatHandler,
    ExitHandler,
    SessionEndedRequestHandler,
  )
  .addRequestInterceptors(LocalizationInterceptor)
  .addErrorHandlers(ErrorHandler)
  .lambda();

// langauge strings for localization
// TODO: The items below this comment need your attention

const languageStrings = {
  'en': {
    translation: {
      RECIPES: recipes.RECIPE_EN_US,
      SKILL_NAME: 'Minecraft Helper',
      WELCOME_MESSAGE: 'Welcome to %s. You can ask a question like, what\'s the recipe for a %s? ... Now, what can I help you with?',
      WELCOME_REPROMPT: 'For instructions on what you can say, please say help me.',
      DISPLAY_CARD_TITLE: '%s  - Recipe for %s.',
      HELP_MESSAGE: 'You can ask questions such as, what\'s the recipe for a %s, or, you can say exit...Now, what can I help you with?',
      HELP_REPROMPT: 'You can say things like, what\'s the recipe for a %s, or you can say exit...Now, what can I help you with?',
      STOP_MESSAGE: 'Goodbye!',
      RECIPE_REPEAT_MESSAGE: 'Try saying repeat.',
      RECIPE_NOT_FOUND_WITH_ITEM_NAME: 'I\'m sorry, I currently do not know the recipe for %s. ',
      RECIPE_NOT_FOUND_WITHOUT_ITEM_NAME: 'I\'m sorry, I currently do not know that recipe. ',
      RECIPE_NOT_FOUND_REPROMPT: 'What else can I help with?',
    },
  },
  'en-US': {
    translation: {
      RECIPES: recipes.RECIPE_EN_US,
      SKILL_NAME: 'American Minecraft Helper',
    },
  },
  'en-GB': {
    translation: {
      RECIPES: recipes.RECIPE_EN_GB,
      SKILL_NAME: 'British Minecraft Helper',
    },
  },
  'de': {
    translation: {
      RECIPES: recipes.RECIPE_DE_DE,
      SKILL_NAME: 'Minecraft Assistent in Deutsch',
      WELCOME_MESSAGE: 'Willkommen bei %s. Du kannst beispielsweise die Frage stellen: Welche Rezepte gibt es für eine %s? ... Nun, womit kann ich dir helfen?',
      WELCOME_REPROMPT: 'Wenn du wissen möchtest, was du sagen kannst, sag einfach „Hilf mir“.',
      DISPLAY_CARD_TITLE: '%s - Rezept für %s.',
      HELP_MESSAGE: 'Du kannst beispielsweise Fragen stellen wie „Wie geht das Rezept für eine %s“ oder du kannst „Beenden“ sagen ... Wie kann ich dir helfen?',
      HELP_REPROMPT: 'Du kannst beispielsweise Sachen sagen wie „Wie geht das Rezept für eine %s“ oder du kannst „Beenden“ sagen ... Wie kann ich dir helfen?',
      STOP_MESSAGE: 'Auf Wiedersehen!',
      RECIPE_REPEAT_MESSAGE: 'Sage einfach „Wiederholen“.',
      RECIPE_NOT_FOUND_WITH_ITEM_NAME: 'Tut mir leid, ich kenne derzeit das Rezept für %s nicht. ',
      RECIPE_NOT_FOUND_WITHOUT_ITEM_NAME: 'Tut mir leid, ich kenne derzeit dieses Rezept nicht. ',
      RECIPE_NOT_FOUND_REPROMPT: 'Womit kann ich dir sonst helfen?',
    },
  },
};
