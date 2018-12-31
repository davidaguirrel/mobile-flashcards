import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { handleAddNewDeck } from '../actions'
import { NavigationActions } from 'react-navigation'

class NewDeck extends Component {
  state = {
    newTitle: ''
  }
  changeText = (text) => {
    this.setState({
      newTitle: text
    })
  }

  submit = () => {
    const { dispatch, navigation } = this.props
    const newTitle = this.state.newTitle
    dispatch(handleAddNewDeck(newTitle))

    this.setState({
      newTitle: ''
    })

    navigation.dispatch(NavigationActions.back())
  }

  render () {
    return (
      <View style={styles.mainView}>
        <Text style={styles.header}>
          Title of your new deck
        </Text>
        <TextInput
          value={this.state.newTitle}
          onChangeText={text => this.changeText(text)}
          placeholder='Enter title for your new deck'
          style={styles.textInput}
        >
        </TextInput>
        <TouchableOpacity
          style={[styles.submitBtn, !this.state.newTitle ? styles.submitDisabled : {}]}
          onPress={this.submit}
          disabled={!this.state.newTitle}
          >
            <Text style={!this.state.newTitle ? {opacity: 0.4} : {}}>CREATE DECK</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    // flex: 1,
    fontSize: 40,
    // backgroundColor: 'gray',
    justifyContent: 'flex-end',
    width: 300,
    textAlign: 'center'
  },
  textInput: {
    // flex:1,
    // backgroundColor: 'gray',
    borderWidth: 1,
    margin: 5,
    padding: 5,
    height: 40,
    width: 300,
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
    // borderWidth: 10,
    // opacity: 0.5
    borderColor: 'rgba(0, 0, 0, 0.2)',
  }
})

export default connect()(NewDeck)