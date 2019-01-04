import { addCardToDeck, saveDeckTitle, getDecks } from "../utils/helpers"

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const SAVE_DECK = 'SAVE_DECK'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'

// Get decks from AsyncStorage before dispatching the action to update redux store
export function handleInitialData() {
  return (dispatch) => {
    return getDecks()
      .then(results => JSON.parse(results))
      .then(decks => dispatch(receiveDecks(decks)))
  }
}

// Update redux store with the decks received from AsyncStorage
export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

// Update redux store with the new deck added passing the new title
function saveDeck (title) {
  return {
    type: SAVE_DECK ,
    title
  }
}

// Save the new deck in AsyncStorage before dispatching
// the action to do the same in redux store
export function handleAddNewDeck(title) {
  return (dispatch) => {
    return saveDeckTitle(title)
      .then(() => dispatch(saveDeck(title)))
  }
}

// Save new card in redux store passing the 'title' of the
// deck in which to save it and the new 'card' to be added
function saveCard (title, card) {
  return {
    type: ADD_CARD_TO_DECK,
    title,
    card
  }
}

// Save the new deck in AsyncStorage before dispatching the
// action to do the same in redux store
export function handleAddCardToDeck(title, card) {
  return (dispatch) => {
    return addCardToDeck(title, card)
      .then(() => dispatch(saveCard(title, card)))
  }
}