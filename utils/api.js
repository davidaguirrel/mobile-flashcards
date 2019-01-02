import { AsyncStorage } from 'react-native'
const DECK_STORAGE_KEY = 'MobileFlashcards:deck'

export function getDecks () {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    // .then(results => console.log('api', results))
    // .then(results => console.log('results', JSON.parse(results)))
    // .then(results => JSON.parse(results))
}

export function addCardToDeck (title, card) {
  let formattedTitle = title.replace(/\w+/g, (txt) => (
    txt.charAt(0).toUpperCase() + txt.slice(1)
  )).replace(/\s/g, '')

  console.log('formattedTitle', formattedTitle)

  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [formattedTitle]: {
      title,
      questions: formattedTitle.questions === []
        ? [card]
        : [formattedTitle.questions].concat(card)
    }
    // formattedTitle.questions.concat(card)
  }))
  // return AsyncStorage.getItem(DECK_STORAGE_KEY)
    // .then(results => console.log('json', JSON.parse(results)))
}

export function saveDeckTitle (title) {
  console.log(title)
  let formattedTitle = title.replace(/\w+/g, (txt) => (
    txt.charAt(0).toUpperCase() + txt.slice(1)
  )).replace(/\s/g, '')

  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [formattedTitle]: {
      title,
      questions: []
    }
  }))
    // .then(() => AsyncStorage.getItem(DECK_STORAGE_KEY)
      // .then(results => console.log('results saveDeckTitle', JSON.parse(results))))
}