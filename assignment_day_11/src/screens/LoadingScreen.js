import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import Container from '../components/Container';
import Button from '../components/Button';
import Dialog from '../components/Dialog';

class LoadingScreen extends Component {
  timer = null;
  constructor() {
    super();
    this.state = {visibility: false};
  }

  componentDidUpdate() {
    if (this.state.visibility !== false) {
      this.timer = setTimeout(() => this.setState({visibility: false}), 3000);
    }
  }

  render() {
    const makeDialogVisible = () => {
      this.setState({visibility: true});
    };

    return (
      <Container style={styles.container}>
        <Button text={'Show Dialog'} onTouch={makeDialogVisible} />
        <Dialog visibility={this.state.visibility} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingScreen;
