import { RECEIVE_DECKS, SAVE_DECK, ADD_CARD_TO_DECK } from '../actions'
export const DECK_STORAGE_KEY = 'MobileFlashcards:deck'

const initialDeck = {
  Deportes: {
    title: 'Deportes',
    questions: [
      {
        question: 'Deportes.q1',
        answer: 'Deportes.a1'
      },
      {
        question: 'Deportes.q2',
        answer: 'Deportes.a2'
      }
    ]
  },
  Viajes: {
    title: 'Viajes',
    questions: [
      {
        question: 'Viajes.q1',
        answer: 'Viajes.a1'
      },
      {
        question: 'Viajes.q2',
        answer: 'Viajes.a2'
      },
      {
        question: 'Viajes.q3',
        answer: 'Viajes.a3'
      }
    ]
  },
  Fotos: {
    title: 'Fotos',
    questions: [
      {
        question: 'Fotos.q1',
        answer: 'Fotos.a1'
      }
    ]
  }
}


function decks (state = initialDeck, action) {
  formatTitle = (string) => (
    string.replace(/\w+/g, (txt) => (
      txt.charAt(0).toUpperCase() + txt.slice(1)
    )).replace(/\s/g, '')
  )

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