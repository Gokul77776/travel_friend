import React from 'react';

export function EmailTemplate({ firstName, posterName }) {
  return (
    <div>
      <h2>Hello {firstName},</h2>
      <p>A new plan has just been posted by <strong>{posterName}</strong>.</p>
      <p>Check it out on the website now!</p>
    </div>
  );
}
