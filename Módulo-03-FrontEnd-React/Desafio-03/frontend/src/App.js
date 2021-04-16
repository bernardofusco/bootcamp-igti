import React, { Component } from 'react';
import Candidates from './components/Candidates';

import Header from './components/Header';
import PreLoader from './components/PreLoader';

export default class App extends Component {
  constructor() {
    super();
    this.state = { candidates: [], previousVotes: [], previousPercentage: [] };
    this.interval = null;
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      fetch('http://localhost:8080/votes')
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          const previousVotes = this.state.candidates.map(({ id, votes }) => {
            return { id, votes };
          });
          const previousPercentage = this.state.candidates.map(
            ({ id, percentage }) => {
              return { id, percentage };
            }
          );
          this.setState({
            candidates: json.candidates,
            previousVotes,
            previousPercentage,
          });
        });
    }, 1000);
  }

  render() {
    const { candidates, previousVotes, previousPercentage } = this.state;
    if (candidates.length === 0) {
      return <PreLoader />;
    }
    return (
      <div className="container">
        <Header>Votação</Header>
        <Candidates
          previousPercentage={previousPercentage}
          previousVotes={previousVotes}
          candidates={candidates}
        />
      </div>
    );
  }
}
