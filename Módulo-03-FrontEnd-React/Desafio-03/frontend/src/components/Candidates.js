import React from 'react';
import Candidate from './Candidate';
import Card from './Card';
import FlipMove from 'react-flip-move';

export default function Candidates({
  candidates,
  previousVotes,
  previousPercentage,
}) {
  return (
    <div>
      <FlipMove>
        {candidates.map((candidate, index) => {
          const { id } = candidate;
          //prettier-ignore
          const previousVoteObject =
            previousVotes.find((item) => item.id === id);

          const previousVote = !!previousVoteObject
            ? previousVoteObject.votes
            : 0;

          //prettier-ignore
          const previousPercentageObject =
            previousPercentage.find((item) => item.id === id);

          const percent = !!previousPercentageObject
            ? previousPercentageObject.percentage
            : 0;

          return (
            <div key={id}>
              <Card>
                <Candidate
                  previousVote={previousVote}
                  previousPercentage={percent}
                  candidate={candidate}
                  position={index + 1}
                />
              </Card>
            </div>
          );
        })}
      </FlipMove>
    </div>
  );
}
