import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Card, CardSection, Input, Button, Spinner } from './common'
import { emailChanged, passwordChanged, loginUser } from '../actions'


class LoginForm extends Component {

  onEmailChange(text) {
    return this.props.emailChanged(text)
  }

  onPasswordChanged(password) {
    return this.props.passwordChanged(password)
  }

  onButtonPress() {
    const { email, password, navigation } = this.props;
    this.props.loginUser({ email, password, navigation })
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />
    }
    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    )
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label='Email'
            placeholder='email@provider.com'
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label='Password'
            placeholder='password'
            onChangeText={this.onPasswordChanged.bind(this)}
            value={this.props.password}
          />
        </CardSection>
        <Text style={styles.errorTextStyle}> {this.props.error} </Text>
        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
})

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;
  return {
    email,
    password,
    error,
    loading
  }
}

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser
})(LoginForm);
