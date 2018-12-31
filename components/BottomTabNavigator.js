import React from 'react'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import Dashboard from './Dashboard'
import NewDeck from './NewDeck'

const Tabs = createBottomTabNavigator({
  Home: {
    screen: Dashboard,
    navigationOptions: {
      tabBarIcon: () => (
        <Ionicons name='ios-home' size={30} color='black'/>
      )
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarIcon: () => (
        <FontAwesome name='plus-square' size={30} color='black' />
      )
    }
  }
}, {
  tabBarOptions: {
    showLabel: false
  }
})

export default BottomTabNavigator = createAppContainer(Tabs)