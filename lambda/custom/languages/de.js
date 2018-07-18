const recipes = require('../recipes');
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

module.exports = {
  translation: {
    RECIPES: recipes.RECIPE_DE_DE,
    SKILL_NAME: 'Assistent für Minecraft in Deutsch',
    WELCOME_MESSAGE: 'Willkommen bei %s. Du kannst beispielsweise die Frage stellen: Welche Rezepte gibt es für eine %s? ... Nun, womit kann ich dir helfen?',
    WELCOME_REPROMPT: 'Wenn du wissen möchtest, was du sagen kannst, sag einfach „Hilf mir“.',
    DISPLAY_CARD_TITLE: '%s - Rezept für %s.',
    HELP_MESSAGE: 'Du kannst beispielsweise Fragen stellen wie „Wie geht das Rezept für eine %s“ oder du kannst „Beenden“ sagen ... Wie kann ich dir helfen?',
    HELP_REPROMPT: 'Du kannst beispielsweise Sachen sagen wie „Wie geht das Rezept für eine %s“ oder du kannst „Beenden“ sagen ... Wie kann ich dir helfen?',
    STOP_MESSAGE: 'Auf Wiedersehen!',
    RECIPE_REPEAT_MESSAGE: 'Sage einfach „Wiederholen“.',
    RECIPE_NOT_FOUND_MESSAGE: 'Tut mir leid, ich kenne derzeit ',
    RECIPE_NOT_FOUND_WITH_ITEM_NAME: 'das Rezept für %s nicht. ',
    RECIPE_NOT_FOUND_WITHOUT_ITEM_NAME: 'dieses Rezept nicht. ',
    RECIPE_NOT_FOUND_REPROMPT: 'Womit kann ich dir sonst helfen?'
  }
}
