import React from 'react'
import { Provider } from 'react-redux'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import Dashboard from './components/Dashboard'
import { createStore } from 'redux'
import reducer from './reducers'
import middleware from './middleware'
import DeckView from './components/DeckView'
import NewCard from './components/NewCard'
import NewDeck from './components/NewDeck'
import Quiz from './components/Quiz'
import BottomTabNavigator from './components/BottomTabNavigator'
import MaterialTopTabNavigator from './components/MaterialTopTabNavigator'
import StackNavigatorContainer from './components/StackNavigator'
import { Constants } from 'expo'

const store = createStore(reducer, middleware)

function AppStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <AppStatusBar barStyle='light-content' backgroundColor='blue'/>
          <StackNavigatorContainer />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    // backgroundColor: 'gray'
  },
})