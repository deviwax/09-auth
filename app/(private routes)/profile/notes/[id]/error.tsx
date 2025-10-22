'use client';

export default function Error({ error }: { error: Error }) {
  console.error(error);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Something went wrong...</h2>
      <p>{error.message}</p>
    </div>
  );
}
