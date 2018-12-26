import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { handleInitialData } from '../actions';

//TODO: PASS DECK ID TO THIS COMPONENT
const myDeck = {
  Deportes: {
    title: 'Deportes',
    questions: [
      {
        question: 'deportes.q1',
        answer: 'deportes.a1'
      },
      {
        question: 'deportes.q2',
        answer: 'deportes.a2'
      }
    ]
  }
}

class DeckView extends Component {
  componentDidMount() {
    const { dispatch } = this.props

    dispatch(handleInitialData())
  }

  addCard = () => {
    // Alert.alert('Test')
    // TODO: route to NewCard view
  }

  startQuiz = () => {
    //TODO: START QUIZ FUNCTIONALITY
  }

  render () {
    const { decks } = this.props
    // console.log('decks props', decks)

    return (
      <View>
        {decks &&
          <View>
            <View style={styles.deckInfo}>
              <Text style={{fontSize: 70, textAlign: 'center'}}>
                {decks.Deportes.title}
              </Text>
              <Text style={{fontSize: 20}}>
                {decks.Deportes.questions.length} cards
              </Text>
            </View>
            <View style={styles.deckMenu}>
              <TouchableOpacity style={[styles.button, {backgroundColor: 'white'}]} onPress={this.addCard}>
                <Text>
                  Add Card
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, {backgroundColor: 'black'}]} onPress={this.startQuiz}>
                <Text style={{color: 'white'}}>
                  Start Quiz
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text>
                  Delete Deck
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  deckInfo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',

  },
  deckMenu: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: 'gray',
    height: 50,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
    borderWidth: 2,
    borderRadius: 5
  }
})

function mapStateToProps (decks) {
  // console.log('mapState', decks)
  return {
    decks: Object.is(decks, {}) 
      ? null
      : decks
  }
}

export default connect(mapStateToProps)(DeckView)