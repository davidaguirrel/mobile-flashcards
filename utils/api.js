import { AsyncStorage } from 'react-native'
import { getDecks, DECK_STORAGE_KEY } from './helpers';

export function fetchInitialDecks () {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    // .then(results => console.log('api', results))
    // .then(getDecks)
    .then(results => console.log('results', JSON.parse(results)))
    // .then(results => console.log('results', results))
}

export function addCardToDeck (title, card) {
  console.log('title', title, 'card', card)
  // console.log('key', DECK_STORAGE_KEY)
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [title]: {
      questions: [title.questions].concat(card)
    }
  }))
  // return AsyncStorage.getItem(DECK_STORAGE_KEY)
    // .then(results => console.log('json', JSON.parse(results)))
}