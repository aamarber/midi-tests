import React from 'react'
import Keyboard from './MusicKeyboard/Keyboard';

export default function App() {

  const [accessRequested, setAccessRequested] = React.useState(false);
  const [inputs, setInputs] = React.useState([]);

  navigator.requestMIDIAccess().then((access) => {
    if(accessRequested) 
      return;

    setAccessRequested(true);

    // Get lists of available MIDI controllers
    console.log(access);
    const accessInputs = access.inputs.values();
    const outputs = access.outputs.values();

    accessInputs.forEach((device, index) => {
      
      setInputs([...inputs, device]);

      
  });

  access.onstatechange = (event) => {
        // Print information about the (dis)connected MIDI controller
        console.log(event.port.name, event.port.manufacturer, event.port.state);
    };
});

  return (
    <>
      <h1>MIDI Controller</h1>
      <ul>
        {inputs.map((input, index) => (
          <>
            <li key={index}>{input.name}</li>
            <Keyboard octaveStart={2} octaveEnd={9} midiDevice={input} />
          </>
        ))}
      </ul>
    </>
  )
}
