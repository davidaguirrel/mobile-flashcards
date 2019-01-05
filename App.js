import React from 'react'
import { Provider } from 'react-redux'
import { StyleSheet, View, StatusBar } from 'react-native'
import { createStore } from 'redux'
import reducer from './reducers'
import middleware from './middleware'
import StackNavigatorContainer from './components/StackNavigator'
import { Constants } from 'expo'
import { setLocalNotification } from './utils/helpers'

const store = createStore(reducer, middleware)

function AppStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }
  
  render() {
    return (
      // Connect store to our app
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
  },
})