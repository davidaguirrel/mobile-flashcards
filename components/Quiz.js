import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Button, TouchableOpacity, Animated, ScrollView } from 'react-native'

class Quiz extends Component {
  state = {
    flipValue: new Animated.Value(0),
  }

  viewAnswer = () => {
    const { flipValue } = this.state

    if(flipValue._value >= 90) {
      Animated.spring(flipValue, {
        toValue: 0,
      }).start()
    } else {
      Animated.spring(flipValue, {
        toValue: 180,
      }).start()
    }
  }

  render () {
    const { deck, questions } = this.props
    const { flipValue } = this.state

    const frontOpacity = flipValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    })
    const backOpacity = flipValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1]
    })

    const frontAnimatedStyle = {
      transform: [
        {
          rotateY: flipValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg']
          })
        },
        // {
        //   perspective: 1000
        // }
      ]
    }

    const backAnimatedStyle = {
      transform: [
        {
          rotateY: flipValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
          })
        },
        // {
        //   perspective: 1000
        // }
      ]
    }

    return (
      <View style={styles.mainView}>
        <Text style={styles.title}>{deck.title}</Text>
        <ScrollView horizontal >
          {questions.map((question, i) => (
            <View key={i} style={styles.scroll}>
              <TouchableOpacity onPress={this.viewAnswer} >
                <Animated.View style={[styles.card, frontAnimatedStyle, {opacity: frontOpacity}]}>
                  <View style={styles.cardInfo}>
                    <Text style={styles.question}>{question.question}</Text>
                  </View>
                </Animated.View>
                <Animated.View style={[styles.card, styles.flipCardBack, backAnimatedStyle, {opacity: backOpacity}]}>
                  <View style={styles.cardInfo}>
                    <Text>{question.answer}</Text>
                  </View>
                </Animated.View>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
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
  },
  scroll: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 50
  },
  question: {
    fontSize: 30,
    color: 'white'
  },
  card: {
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 200,
    backgroundColor: '#003d99',
    marginTop: 5,
    marginLeft: 20,
    marginRight: 20,
    backfaceVisibility: 'hidden',
  },
  cardInfo: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  flipCardBack: {
    flex: 1,
    backgroundColor: '#8cc9ff',
    position: 'absolute',
    top: 0,
    alignSelf: 'center'
  },
  answerBtnSet: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  answerBtn: {
    margin: 5,
    padding: 5,
    borderRadius: 2,
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

function mapStateToProps (state, { navigation }) {
  const { deck } = navigation.state.params
  const questions = deck.questions
  return {
    deck,
    questions
  }
}

export default connect(mapStateToProps)(Quiz)