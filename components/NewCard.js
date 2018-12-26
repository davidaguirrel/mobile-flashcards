import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native'
import { Formik } from 'formik'
import { handleAddCardToDeck, saveCard, handleInitialData } from '../actions';

class NewCard extends Component {
  componentDidMount() {
    // AsyncStorage.clear()
    this.props.dispatch(handleInitialData())
  }
  state = {
    question: '',
    answer: ''
  }

  handleQuestionChange = (text) => {
    this.setState({
      question: text
    })
  }
  handleAnswerChange = (text) => {
    this.setState({
      answer: text
    })
  }

  submit = () => {
    const { dispatch, title } = this.props
    const { question, answer } = this.state
    const card = {
      question,
      answer
    }

    dispatch(handleAddCardToDeck(title, card))

    this.setState({
      question: '',
      answer: ''
    })
  }

  render () {
    return (
      // <Formik>
        <View style={styles.mainView}>
          <View style={styles.title}>
            <Text style={styles.newCard}>
              ENTER NEW CARD INFO
            </Text>
          </View>
          <View style={styles.form}>
            <TextInput
              onChangeText={(text) => this.handleQuestionChange(text)}
              value={this.state.question}
              placeholder='Enter a new question'
              style={styles.textInput}
              >
            </TextInput>
            <TextInput
              value={this.state.answer}
              onChangeText={(text) => this.handleAnswerChange(text)}
              placeholder='Enter a new answer'
              style={styles.textInput}
              >
            </TextInput>
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={this.submit}
              >
                <Text>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </View>
      // </Formik>
    )
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    // height: 30
  },
  title: {
    flex: 1,
    justifyContent: 'center'
  },
  form: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  newCard: {
    // flex: 1,
    fontSize: 30,
    // alignSelf: 'flex-end'
  },
  textInput: {
    // flex: 0.5,
    borderWidth: 1,
    margin: 5,
    padding: 5,
    height: 40,
    width: 300,
    // alignItems: 'center'
  },
  submitBtn: {
    // flex: 1,
    borderWidth: 1,
    borderRadius: 2,
    padding: 5,
    margin: 5,
    width: 200,
    alignItems: 'center'
  }
})

function mapStateToProps (decks) {
  const title = 'Deportes'
  console.log('mapstate', decks)
  return {
    title,
    decks
  }
}

export default connect(mapStateToProps)(NewCard)