/** @type {import('next').NextConfig} */

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
       URI: 'http://localhost:3000',
       NEXTAUTH_URL:'http://localhost:3000'
      },
    };
  }

  return {
    env: {
      URI: 'https://forward-next-project.vercel.app',
      NEXTAUTH_URL:'https://forward-next-project.vercel.app'
    },
  };
};