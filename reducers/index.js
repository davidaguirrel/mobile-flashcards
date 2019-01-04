import { RECEIVE_DECKS, SAVE_DECK, ADD_CARD_TO_DECK } from '../actions'
import { formatTitle } from '../utils/helpers'
export const DECK_STORAGE_KEY = 'MobileFlashcards:deck'

function decks (state = {}, action) {

  switch (action.type) {
    case RECEIVE_DECKS : 
      return {
        ...state,
        ...action.decks
      }
    case SAVE_DECK :
      return {
        ...state,
        [formatTitle(action.title)]: {
          title: action.title,
          questions: []
        }
      }
    case ADD_CARD_TO_DECK :
      let formattedTitle = formatTitle(action.title)
      return {
        ...state,
        [formattedTitle]: {
          ...state[formattedTitle],
          questions: state[formattedTitle].questions.concat(action.card)
        }
      }
    default :
      return state
  }
}

export default decks