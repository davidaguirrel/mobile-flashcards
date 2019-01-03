import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { Formik } from 'formik'
import { handleAddCardToDeck, saveCard, handleInitialData } from '../actions';
import { NavigationActions } from 'react-navigation'

class NewCard extends Component {

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

    dispatch(handleAddCardToDeck(title, card))

    this.setState({
      question: '',
      answer: ''
    })

    navigation.dispatch(NavigationActions.back())
  }

  render () {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.mainView}>
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
            style={[styles.submitBtn, !(this.state.question && this.state.answer) ? styles.submitDisabled : {}]}
            disabled={!(this.state.question && this.state.answer)}
            onPress={this.submit}
            >
              <Text style={!(this.state.question && this.state.answer) ? {opacity: 0.4} : {}}>SUBMIT</Text>
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
  },
  submitDisabled: {
    borderColor: 'rgba(0, 0, 0, 0.2)',
  }
})

// function mapStateToProps(decks, {navigation}) {
//   const deckId = navigation.state.params
//   return {
//     deck: decks[deckId]
//   }
// }

export default connect()(NewCard)