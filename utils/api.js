import { AsyncStorage } from 'react-native'
const DECK_STORAGE_KEY = 'MobileFlashcards:deck'

export function formatTitle (string) {
  return string.replace(/\w+/g, (txt) => (
    txt.charAt(0).toUpperCase() + txt.slice(1)
  )).replace(/\s/g, '')
}

export function getDecks () {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
}

export function addCardToDeck (title, card) {
  let formattedTitle = formatTitle(title)

  console.log('formattedTitle', formattedTitle)

  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [formattedTitle]: {
      title,
      questions: formattedTitle.questions === []
        ? [card]
        : [formattedTitle.questions].concat(card)
    }
  }))
  // return AsyncStorage.getItem(DECK_STORAGE_KEY)
    // .then(results => console.log('json', JSON.parse(results)))
}

export function saveDeckTitle (title) {
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