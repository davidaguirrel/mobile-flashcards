import { AsyncStorage } from 'react-native'
export const DECK_STORAGE_KEY = 'MobileFlashcards:deck'

function setDummyData () {
  const dummyData = {
    Deportes: {
      title: 'Deportes',
      questions: [
        {
          question: 'deportes.q1',
          answer: 'deportes.a1'
        },
        {
          question: 'deportes.q2',
          answer: 'deportes.a2'
        }
      ]
    },
    Coches: {
      title: 'Coches',
      questions: [
        {
          question: 'coches.q1',
          answer: 'coches.a1'
        }
      ]
    },
    Viajes: {
      title: 'Viajes',
      questions: [
        {
          question: 'viajes.q1',
          answer: 'viajes.a1'
        }
      ]
    },
    // EstadosDeUsa: {
    //   title: 'Estados de USA',
    //   questions: [
    //     {
    //       question: 'estadosdeusa.q1',
    //       answer: 'estadosdeusa.a1'
    //     },
    //     {
    //       question: 'estadosdeusa.q2',
    //       answer: 'estadosdeusa.a2'
    //     }
    //   ]
    // }
  }

  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(dummyData))
  // console.log('dummydata', dummyData)

  return dummyData
}

export function getDecks (results) {
  // console.log('results', results)
  return results === null
    ? setDummyData()
    : JSON.parse(results)
}