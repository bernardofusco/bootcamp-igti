import React, { Component } from 'react';
import User from './User';

export default class extends Component {
  constructor() {
    super();
    this.state = { secondsVisible: 0 };
    this.interval = null;
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const { secondsVisible } = this.state;
      this.setState({ secondsVisible: secondsVisible + 1 });
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { users } = this.props;
    const { secondsVisible } = this.state;
    return (
      <div>
        <p>Componente Users Visivel por {secondsVisible} segundos</p>
        <ul>
          {users.map((user) => {
            const { login, name, picture, email } = user;
            return (
              <li key={login.uuid}>
                <User user={user} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
