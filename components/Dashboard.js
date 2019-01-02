import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, AsyncStorage } from 'react-native'
import { handleInitialData } from '../actions'

class Dashboard extends Component {
  componentDidMount() {
    const { dispatch } = this.props

    dispatch(handleInitialData())
    // AsyncStorage.clear()
  }

  renderItem = ({ item }) => {
    const { navigation } = this.props
    const deck = item

    return (
      <TouchableOpacity style={styles.deckList} onPress={() => navigation.navigate('DeckView', { deck })}>
        <Text style={styles.title}>
          {deck.title}
        </Text>
        <Text style={styles.deckInfo}>
          {deck.questions.length} cards
        </Text>
      </TouchableOpacity>
    )
  }

  render () {
    const { decks } = this.props

    return (
      <View style={styles.mainView}>
        {decks.length > 0
          ? <FlatList
              data={decks}
              renderItem={this.renderItem}
              keyExtractor={item => item.title}
            />
          : <TouchableOpacity style={styles.noDeck}>
              <Text>
                PLEASE CREATE A DECK
              </Text>
            </TouchableOpacity>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    // backgroundColor: 'red'
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
    // flex: 2,
    fontSize: 40
  },
  deckInfo: {
    // flex: 1,
    fontSize: 25,
  },
  noDeck: {
    // flex: 1,
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
  // console.log('TEST')
  // console.log('mapState', decks)
  return {
    decks: decks && Object.keys(decks).reduce((acc, deck) => {
      return acc.concat(decks[deck])
    }, [])
  }
}

export default connect(mapStateToProps)(Dashboard)