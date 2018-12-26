import React from 'react'
import { Provider } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native'
import Dashboard from './components/Dashboard'
import { createStore } from 'redux'
import reducer from './reducers'
import middleware from './middleware'
import DeckView from './components/DeckView'
import NewCard from './components/NewCard'
import NewDeck from './components/NewDeck'

const store = createStore(reducer, middleware)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
      {/* <Provider> */}
        <View style={styles.container}>
          <NewDeck />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'blue',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
