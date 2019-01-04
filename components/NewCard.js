import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { handleAddCardToDeck } from '../actions';
import { NavigationActions } from 'react-navigation'

class NewCard extends Component {

  // Question and answer state properties that will handle the corresponding
  // state of text inputs
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
    const { dispatch, navigation } = this.props
    const title  = navigation.state.params
    const { question, answer } = this.state
    const card = {
      question,
      answer
    }

    // Dispatch the action to add a new card to AsyncStorage and our store
    // Takes the 'title' of the current deck and a new 'card' that has a question and an answer.
    dispatch(handleAddCardToDeck(title, card))

    // Reset text inputs after submitting
    this.setState({
      question: '',
      answer: ''
    })

    // Go back to previous screen in stack navigator
    navigation.dispatch(NavigationActions.back())
  }

  render () {
    const { question, answer } = this.state
    return (
      // Text inputs will not be hidden when virtual keyboard shows up
      <KeyboardAvoidingView behavior='padding' style={styles.mainView}>
        <View style={styles.title}>
          <Text style={styles.newCard}>
            ENTER NEW CARD INFO
          </Text>
        </View>
        <View style={styles.form}>
        {/* Value of TextInputs will be handled by local component state */}
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

          {/* Disable button unless there is something in both question and answer TextInputs */}
          <TouchableOpacity
            style={[styles.submitBtn, !(question && answer) ? styles.submitDisabled : {}]}
            disabled={!(question && answer)}
            onPress={this.submit}
            >
              <Text style={!(question && answer) ? {opacity: 0.4} : {}}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
    fontSize: 30,
  },
  textInput: {
    borderWidth: 1,
    margin: 5,
    padding: 5,
    height: 40,
    width: 300,
  },
  submitBtn: {
    borderWidth: 1,
    borderRadius: 2,
    padding: 5,
    margin: 5,
    width: 200,
    alignItems: 'center'
  },
  submitDisabled: {
    borderColor: 'rgba(0, 0, 0, 0.2)',
  }
})

export default connect()(NewCard)