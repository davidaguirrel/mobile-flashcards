import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Button, TouchableOpacity, TouchableHighlight } from 'react-native'

class Quiz extends Component {
  something = () => {}
  render () {
    // const { singleDeck } = this.props
    const singleDeck = this.props.singleDeck.DeckSample
    console.log(singleDeck)
    return (
      <View style={styles.mainView}>
        <Text style={styles.title}>{singleDeck.title}</Text>
        <View style={styles.cards}>
          <Text style={styles.question}>{singleDeck.questions[0].question}</Text>
          <Button title='View answer' onPress={this.something}></Button>
          <Text>Number of cards remaining</Text>
        </View>
        <View style={styles.answerBtnSet}>
          <TouchableOpacity 
            onPress={this.something}
            style={[styles.answerBtn, {backgroundColor:'rgba(0, 170, 0, 0.9)'}]}
          >
            <Text>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.something}
            style={[styles.answerBtn, {backgroundColor:'rgba(255, 0, 0, 0.9)'}]}
          >
            <Text>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'gray'
  },
  title: {
    fontSize: 50
  },
  question: {
    fontSize: 30
  },
  cards: {
    // flex: 1,
    alignItems: 'center',
  },
  answerBtnSet: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    // backgroundColor: 'gray'
  },
  answerBtn: {
    margin: 5,
    padding: 5,
    // borderWidth: 1,
    borderRadius: 2,
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
    // textAlign: 'center'
  }
  // highlight: {
  //   // flex: 1,
  //   backgroundColor: '#2196F3',
  //   padding: 5,
  //   margin: 5,
  //   alignItems: 'center'
  // }
})

function mapStateToProps () {
  // TODO: RETRIEVE A SINGLE DECK ID
  const singleDeck = {
    DeckSample: {
      title: 'DeckSample',
      questions: [
        {
          question: 'q1',
          answer: 'a1'
        },
        {
          question: 'q2',
          answer: 'a2'
        },
        {
          question: 'q3',
          answer: 'a3'
        },
      ]
    }
  }
  return {
    singleDeck
  }
}

export default connect(mapStateToProps)(Quiz)