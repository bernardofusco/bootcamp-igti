import React from 'react';
import CountUp from 'react-countup';

export default function Votes({ value, previousVote }) {
  return (
    <div>
      <CountUp
        start={previousVote || 0}
        end={value}
        duration={0.6}
        separator="."
      >
        {({ countUpRef }) => (
          <div>
            <span ref={countUpRef} />
          </div>
        )}
      </CountUp>
    </div>
  );
}
