import React from 'react';
import ReactDom from 'react-dom';
import '../static/sass/main.scss';


function App() {
  return (
    <div>
      <div className="tech electron">Electron</div>
      <div className="tech react">React</div>
      <div className="tech sass">Sass</div>
    </div>
  );
}

ReactDom.render(<App />, document.getElementById('react-root'));
