// @flow
import React, { Component } from 'react';

type Props = {
  className?: string
};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <div className={this.props.className}>
          <h2>Home</h2>
        </div>
      </div>
    );
  }
}
