import { Platform } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import MaterialTopTabNavigator from './MaterialTopTabNavigator'
import BottomTabNavigator from './BottomTabNavigator'
import DeckView from './DeckView'
import NewCard from './NewCard'

const StackNavigator = createStackNavigator({
  Home: {
    screen: Platform.OS === 'ios' ? BottomTabNavigator : MaterialTopTabNavigator,
    navigationOptions: ({ navigation }) => ({
      header: null,
    })
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: ({ navigation }) => ({
      // header: null,
    })
  },
  NewCard: {
    screen: NewCard
  }
})

export default StackNavigatorContainer = createAppContainer(StackNavigator)