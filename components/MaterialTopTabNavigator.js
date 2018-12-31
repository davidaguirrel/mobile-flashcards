import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation'
import Dashboard from './Dashboard'
import NewDeck from './NewDeck'
import DeckView from './DeckView'

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