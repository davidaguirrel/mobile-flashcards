import { AsyncStorage } from 'react-native'
const DECK_STORAGE_KEY = 'MobileFlashcards:deck'

// Function that eliminates spaces in a title and styles it in CamelCase format
export function formatTitle (string) {
  return string.replace(/\w+/g, (txt) => (
    txt.charAt(0).toUpperCase() + txt.slice(1)
  )).replace(/\s/g, '')
}

// Get decks from AsyncStorage
export function getDecks () {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
}

// Add a new card to an existing deck in AsyncStorage
// Parameters: - 'title' of the deck in which to add the new card
// - new 'card' with the question and answer to be added
export function addCardToDeck (title, card) {
  let formattedTitle = formatTitle(title)

  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [formattedTitle]: {
      title,
      questions: formattedTitle.questions === []
        ? [card]
        : [formattedTitle.questions].concat(card)
    }
  }))
}

// Add new deck with new title in AsyncStorage
export function saveDeckTitle (title) {
  let formattedTitle = formatTitle(title)

  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [formattedTitle]: {
      title,
      questions: []
    }
  }))
}