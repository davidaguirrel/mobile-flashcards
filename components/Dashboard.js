import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, AsyncStorage } from 'react-native'
import { handleInitialData } from '../actions'
import { formatTitle } from '../utils/helpers'

class Dashboard extends Component {
  componentDidMount() {
    const { dispatch } = this.props

    // Retrieve data stored in AsyncStorage if any
    // dispatch(handleInitialData())
    AsyncStorage.clear()
  }

  // Specifies how to render each item in FlatList
  renderItem = ({ item }) => {
    const { navigation } = this.props
    const deck = item

    return (
      <TouchableOpacity
        style={styles.deckList}
        // Navigate to a particular deck view passing the formatted title
        onPress={() => navigation.navigate('DeckView', formatTitle(deck.title))}
      >
        <Text style={styles.title}>
          {deck.title}
        </Text>
        {deck.questions.length === 1
          ? <Text style={styles.deckInfo}>
              {deck.questions.length} card
            </Text>
          : <Text style={styles.deckInfo}>
              {deck.questions.length} cards
            </Text>
        }
      </TouchableOpacity>
    )
  }

  render () {
    const { decks } = this.props

    return (
      <View style={styles.mainView}>
      {/* Renders a FlatList if there are decks to show */}
        {decks.length > 0
          ? <FlatList
              data={decks}
              renderItem={this.renderItem}
              keyExtractor={item => item.title}
            />
          : 
            <Text style={{fontSize: 20}}>
              PLEASE CREATE A DECK
            </Text>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  deckList: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 200,
    backgroundColor: '#ccc',
    marginBottom: 5,
  },
  title: {
    fontSize: 40
  },
  deckInfo: {
    fontSize: 25,
  },
  noDeck: {
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    height: 200,
    width: 200
  }
})

function mapStateToProps ( decks ) {
  return {
    decks: decks && Object.keys(decks).reduce((acc, deck) => {
      return acc.concat(decks[deck])
    }, [])
  }
}

export default connect(mapStateToProps)(Dashboard)