import React from 'react';
import spinner from '../../images/spinner.gif';

export default function Spinner() {
  return (
    <div>
      <img src={spinner} style={{ display: 'block' }} alt="loading" />
    </div>
  );
}
