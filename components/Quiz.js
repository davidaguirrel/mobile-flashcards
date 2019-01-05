import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  ScrollView
} from 'react-native'

class Quiz extends Component {
  state = {
    // Control flip animation for each card
    flipValue: new Animated.Value(0),
    flipValues: [],

    // Controls the number of card displayed on screen to navigate to the corresponding one after answering
    cardNum: 1,

    // Control styling of Correct/Incorrect buttons
    correctIsPressed: false,
    incorrectIsPressed: false,

    // Controls if quiz is complete (all cards have been answered)
    quizComplete: false,

    // Number of cards answered and number of correct ones
    progress: 0,
    correctAnswers: 0
  }

  componentDidMount() {
    const { questions } = this.props

    questions.map(() => {
      this.setState(({flipValues, flipValue}) => ({
        flipValues: flipValues.concat(flipValue)
      }))
    })
  }

  // Animates only flipValue corresponding to the card that has been pressed
  viewAnswer = (index) => {
    console.log(index)
    const { flipValue, flipValues } = this.state

    if(flipValues[index]._value >= 90) {
      Animated.spring(flipValues[index], {
        toValue: 0,
      }).start()
    } else {
      Animated.spring(flipValues[index], {
        toValue: 180,
      }).start()
    }
  }

  // Navigates through the ScrollView fixing the position for correct presentation
  scrollToNext = () => {
    const screenWidth = Dimensions.get('window').width
    const { cardNum } = this.state
    const { questions } = this.props

    // If quiz is not complete, free scroll navigation is disabled
    if(cardNum < questions.length) {
      let scrollXPos = screenWidth * cardNum
      this.scroller.scrollTo({x: scrollXPos, y: 0})
  
      // Keeps track of answers and position in scroll navigation
      this.setState(({ progress }) => ({
        cardNum: cardNum + 1,
        progress: progress + 1
      }))
    } 
    // When quiz is complete, free navigation is enabled.
    // We clear notifications for that day and set up the new notification for the following day
    else if (cardNum === questions.length) {
      this.setState({
        quizComplete: true,
        progress: questions.length
      })

      clearLocalNotification()
      .then(setLocalNotification)
    }
  }

  // These 2 functions handle the styling of Correct/Incorrect buttons
  correctOnPressIn = () => {
    const { quizComplete } = this.state
    if (!quizComplete) {
      this.setState(({ correctAnswers }) => ({
        correctIsPressed: true,
        incorrectIsPressed: false,
        correctAnswers: correctAnswers + 1
      }))
    }
  }
  incorrectOnPressIn = () => {
    this.setState({
      incorrectIsPressed: true,
      correctIsPressed: false
    })
  }

  // frontAnimatedStyle = (index) => (
  //   transform = [
  //     {
  //       rotateY: flipValues[index].interpolate({
  //         inputRange: [0, 180],
  //         outputRange: ['0deg', '180deg']
  //       })
  //     }
  //   ]
  // )

  render () {
    const { deck, questions } = this.props
    const { flipValue,
      quizComplete,
      flipValues,
      progress,
      correctIsPressed,
      incorrectIsPressed,
      correctAnswers } = this.state

    // These 2 values make flip animation work in Android
    const frontOpacity = flipValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    })
    const backOpacity = flipValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1]
    })

    // These 2 values apply rotation to flipValue used for flipping cards
    const frontAnimatedStyle = {
      transform: [
        {
          rotateY: flipValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg']
          })
        },
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
      ]
    }

    return (
      <View style={styles.mainView}>
      {questions.length > 0
        ? <View style={{alignItems: 'center'}}>
            <Text style={styles.title}>{deck.title}</Text>
            <View style={styles.cardsLeft}>
              <Text style={{fontSize: 20}}>Questions answered: {progress}/{questions.length}</Text>
              {quizComplete &&
                <Text style={{fontSize: 17}}>Correct answers: {correctAnswers}/{questions.length}</Text>
              }
            </View>
            <ScrollView
              horizontal
              // Only allow free scroll if quiz is complete
              scrollEnabled={quizComplete}
              contentContainerStyle={styles.contentContainer}
              ref={scroller => this.scroller = scroller}
              >
              {questions.map((question, i) => (
                <View key={i} style={styles.scroll}>
                  <TouchableOpacity onPress={()=>this.viewAnswer(i)} style={styles.touchable} >
                    <Animated.View style={[styles.card, frontAnimatedStyle, {opacity: frontOpacity}]}>
                      <View style={styles.cardInfo}>
                        <Text style={styles.question}>{question.question}</Text>
                      </View>
                    </Animated.View>
                    <Animated.View style={[styles.card, styles.flipCardBack, backAnimatedStyle, {opacity: backOpacity}]}>
                      <View style={styles.cardInfo}>
                        <Text style={{fontSize: 20}}>{question.answer}</Text>
                      </View>
                    </Animated.View>
                  </TouchableOpacity>
                  <View style={styles.answerBtnSet}>
                    <TouchableOpacity
                      onPressIn={this.correctOnPressIn}
                      onPress={this.scrollToNext}
                      style={[
                        styles.answerBtn,
                        correctIsPressed ? {opacity: 1} : {opacity: 0.5},
                        {backgroundColor:'rgba(0, 170, 0, 0.9)',
                        }
                      ]}
                    >
                      <Text>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPressIn={this.incorrectOnPressIn}
                      onPress={this.scrollToNext}
                      style={[
                        styles.answerBtn,
                        incorrectIsPressed ? {opacity: 1} : {opacity: 0.5},
                        {backgroundColor:'rgba(255, 0, 0, 0.9)',
                        }
                      ]}
                    >
                      <Text>Incorrect</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        : <Text style={{fontSize: 20}}>There are no cards created for this Deck</Text>
      }
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
  cardsLeft: {
    flex: 1,
    alignSelf: 'flex-start',
    marginLeft: 30
  },
  contentContainer: {
    justifyContent: 'center',
  },
  scroll: {
    alignItems: 'center',
    width: Dimensions.get('window').width
  },
  touchable: {
    alignItems: 'center',
    width:300,
  },
  title: {
    flex: 1,
    fontSize: 50,
    marginTop: 30,
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
  },
})

function mapStateToProps (state, { navigation }) {
  const deck = navigation.state.params
  const questions = deck.questions
  return {
    deck,
    questions
  }
}

export default connect(mapStateToProps)(Quiz)