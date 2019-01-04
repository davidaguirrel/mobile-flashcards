import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation'
import Dashboard from './Dashboard'
import NewDeck from './NewDeck'

// Configuration of the top bar navigator used for Android
const MaterialTabs = createMaterialTopTabNavigator(
  {
    Home: {
      screen: Dashboard
    },
    NewDeck: {
      screen: NewDeck
    },
  },
)

export default MaterialTopTabNavigator = createAppContainer(MaterialTabs)