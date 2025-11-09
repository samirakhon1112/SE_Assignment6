const fetch = require('node-fetch');

const SERVER_URL = process.env.SERVER_URL || 'http://transcript-server:3000';
const MAX_RETRIES = 30;
const RETRY_DELAY_MS = 2000;

async function waitForServer() {
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      const res = await fetch(`${SERVER_URL}/health`, { timeout: 3000 });
      if (res.ok) {
        console.log('Server is up!');
        return true;
      }
    } catch (e) {
      //
    }
    console.log(`Waiting for server... (${i + 1}/${MAX_RETRIES})`);
    await new Promise(r => setTimeout(r, RETRY_DELAY_MS));
  }
  throw new Error('Server did not become available in time');
}

async function runClientActions() {
  await waitForServer();

  const postResp = await fetch(`${SERVER_URL}/transcripts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: 'Sample transcript created by client container',
      author: 'student'
    })
  });

  const created = await postResp.json();
  console.log('Created transcript:', created);

  const getResp = await fetch(`${SERVER_URL}/transcripts`);
  const items = await getResp.json();
  console.log('All transcripts:', items);
}

runClientActions()
  .then(() => { console.log('Client finished successfully'); process.exit(0); })
  .catch(err => { console.error('Client error:', err.message); process.exit(1); });
