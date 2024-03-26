import React from 'react'
import NotesMap from './MusicTools/NotesMap';
import sampler from './MusicTools/DefaultSampler';
import SignalCodes from './MusicTools/MidiSignalCodes';

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

      device.onmidimessage = (message) => {
        const noteMapped = NotesMap[message.data[1]];

        if(!noteMapped){
          console.log(`Note ${message.data[1]} not found in map.`);
          return;
        }

        console.log(message);
        if(message.data[0] === SignalCodes.NOTE_ON)
          sampler.triggerAttack(noteMapped);
        else if(message.data[0] === SignalCodes.NOTE_OFF)
          sampler.triggerRelease(noteMapped);
      };
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
          <li key={index}>{input.name}</li>
        ))}
      </ul>
    </>
  )
}
