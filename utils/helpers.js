import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'
const DECK_STORAGE_KEY = 'MobileFlashcards:deck'
const NOTIFICATION_KEY = 'MobileFlashcards:notifications'

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

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: 'Start your quiz!',
    body: "Have you studied today? Go and take one of your quizzes!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(11)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}