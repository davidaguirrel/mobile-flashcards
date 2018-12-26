import { Alert } from 'react-native'
import { fetchInitialDecks, addCardToDeck } from "../utils/api"

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const SAVE_DECK = 'SAVE_DECK'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'

export function handleInitialData() {
  return (dispatch) => {
    // console.log(dispatch)
    return fetchInitialDecks()
      .then((decks) => (
        // console.log('decks', decks)
        dispatch(receiveDecks(decks)))
      )
  }
}

export function receiveDecks (decks) {
  // console.log('receiveDecks', decks)
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function saveDeck (title) {
  return {
    type: SAVE_DECK ,
    title
  }
}

export function saveCard (title, card) {
  return {
    type: ADD_CARD_TO_DECK,
    title,
    card
  }
}

export function handleAddCardToDeck(title, card) {
  return (dispatch) => {
    return addCardToDeck(title, card)
      // .catch((e) => {
      //   Alert.alert('There was an error saving new deck')
      // })
      .then(() => dispatch(saveCard(title, card)))
      // .then(results => console.log('action', results))
  }
}