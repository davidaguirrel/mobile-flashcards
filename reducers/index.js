import { RECEIVE_DECKS, SAVE_DECK, ADD_CARD_TO_DECK } from '../actions'
import { AsyncStorage } from 'react-native'
export const DECK_STORAGE_KEY = 'MobileFlashcards:deck'

const initialDeck = {
  Deportes: {
    title: 'Deportes',
    questions: [
      {
        question: 'q1',
        answer: 'a1'
      }
    ]
  }
}

// AsyncStorage.getItem(DECK_STORAGE_KEY)
//   .then(results => console.log('reducers', results))

function decks (state = initialDeck, action) {
  switch (action.type) {
    case RECEIVE_DECKS : 
      return {
        ...state,
        ...action.decks
      }
    case SAVE_DECK :
      return {
        ...state,
        // TODO: CAMEL CASE THE TITLE
        [action.title]: {
          title: action.title
        }
      }
    case ADD_CARD_TO_DECK :
      return {
        ...state,
        [action.title]: {
          ...state[action.title],
          questions: state[action.title].questions.concat(action.card)
        }
      }
    default :
      return state
  }
}

export default decks