import React from 'react';
import Container from './components/container';
import Header from './components/header';

const translation = {
  title: 'Order book',
};

function App() {
  return (
    <Container>
      <Header title={translation.title} />
    </Container>
  );
}

export default App;
