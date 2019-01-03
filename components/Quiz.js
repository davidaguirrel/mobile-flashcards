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
    flipValue: new Animated.Value(0),
    flipValues: [],
    cardNum: 1,
    correctIsPressed: false,
    incorrectIsPressed: false,
    quizComplete: false,
  }

  componentDidMount() {
    const { questions } = this.props

    questions.map(() => {
      this.setState(({flipValues, flipValue}) => ({
        flipValues: flipValues.concat(flipValue)
      }))
    })
  }

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

  scrollToNext = () => {
    const screenWidth = Dimensions.get('window').width
    const { cardNum } = this.state
    const { questions } = this.props

    if(cardNum < questions.length) {
      let scrollXPos = screenWidth * cardNum
      this.scroller.scrollTo({x: scrollXPos, y: 0})
  
      this.setState({
        cardNum: cardNum + 1,
      })
    } else if (cardNum === questions.length) {
      this.setState({
        quizComplete: true
      })
    }
  }

  correctOnPressIn = () => {
    this.setState(({correctIsPressed}) => ({
      correctIsPressed: !correctIsPressed,
      incorrectIsPressed: false
    }))
  }
  incorrectOnPressIn = () => {
    this.setState(({incorrectIsPressed}) => ({
      incorrectIsPressed: !incorrectIsPressed,
      correctIsPressed: false
    }))
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
    const { flipValue, quizComplete, flipValues } = this.state

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
      {questions.length > 0
        ? <View style={{alignItems: 'center'}}>
            <Text style={styles.title}>{deck.title}</Text>
            <ScrollView
              horizontal
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
                        <Text>{question.answer}</Text>
                      </View>
                    </Animated.View>
                  </TouchableOpacity>
                  <View style={styles.answerBtnSet}>
                    <TouchableOpacity
                      onPressIn={this.correctOnPressIn}
                      onPress={this.scrollToNext}
                      style={[
                        styles.answerBtn,
                        this.state.correctIsPressed ? {opacity: 1} : {opacity: 0.5},
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
                        this.state.incorrectIsPressed ? {opacity: 1} : {opacity: 0.5},
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
  contentContainer: {
    // flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  scroll: {
    // justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width
  },
  touchable: {
    // justifyContent: 'center',
    alignItems: 'center',
    width:300,
  },
  title: {
    flex: 1,
    fontSize: 50,
    marginTop: 30
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