import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { handleInitialData } from '../actions';

class DeckView extends Component {

  addCard = () => {
    this.props.navigation.navigate('NewCard', this.props.deckId)
  }

  startQuiz = () => {
    //TODO: START QUIZ FUNCTIONALITY
    this.props.navigation.navigate('Quiz', this.props.deck)
  }

  render () {
    const { deck } = this.props

    return (
      <View style={styles.container}>
        {deck &&
          <View>
            <View style={styles.deckInfo}>
              <Text style={{fontSize: 70, textAlign: 'center'}}>
                {deck.title}
              </Text>
              <Text style={{fontSize: 20}}>
                {deck.questions.length} cards
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
              {/* <TouchableOpacity style={styles.button}>
                <Text>
                  Delete Deck
                </Text>
              </TouchableOpacity> */}
            </View>
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
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

function mapStateToProps(decks, { navigation }) {
  const deckId = navigation.state.params
  console.log(deckId)

  return {
    deck: decks[deckId],
    deckId
  }
}

export default connect(mapStateToProps)(DeckView)