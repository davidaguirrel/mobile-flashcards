import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
// import { decks } from '../utils/helper'
import { fetchInitialDecks } from '../utils/api'
import { handleInitialData } from '../actions'
import { AsyncStorage, Alert } from 'react-native'

class Dashboard extends Component {
  componentDidMount() {
    const { dispatch } = this.props

    // fetchInitialDecks()
    //   .then(decks => console.log('results', decks))
    //   .then(decks => dispatch(receiveDecks(decks)))


    dispatch(handleInitialData())
    // AsyncStorage.clear()
  }

  openDeck() {
    Alert.alert('ALERTAAAAA')
  }

  render () {
    const { decks } = this.props
    // console.log('render', decks.length)
    return (
      <View style={styles.mainView}>
        {decks.length > 0
          ? decks.map((deck, i) => (
              <TouchableOpacity key={i} style={styles.deckList} >
                <Text style={styles.title}>
                  {deck.title}
                </Text>
                <Text style={styles.deckInfo}>
                  {deck.questions.length} cards
                </Text>
              </TouchableOpacity>
            ))
          : <TouchableOpacity style={styles.noDeck} onPress={this.openDeck}>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 23,
  },
  deckList: {
    // flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 200,
    backgroundColor: '#ccc',
    marginBottom: 5,
    // shadowRadius: 3,
    // shadowOpacity: 0.8,
    // shadowColor: 'red',
    // shadowOffset: {
    //   width: 5,
    //   height: 5
    // },
  },
  title: {
    // flex: 2,
    fontSize: 40
  },
  deckInfo: {
    // flex: 1,
    fontSize: 25,
    // justifyContent: 'flex-end',
    // alignSelf: 'flex-end'
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