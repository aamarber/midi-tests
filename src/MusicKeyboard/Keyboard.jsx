import React, { useEffect } from 'react'
import NotesMap from '../MusicTools/NotesMap';
import sampler from '../MusicTools/DefaultSampler';
import signalInterpreter from '../MusicTools/SignalInterpreter';
import Key from './Key';
import notesProgression from '../MusicTools/ASPNNotesProgression';
import './Keyboard.css';

export default function Keyboard({midiDevice, octaveStart, octaveEnd}) {

    const buildKey = (note, octave) => {
        return new Key(note, octave);
    }

    const buildKeys = () => {
        let result = [];

        for(let i = octaveStart; i < octaveEnd; i++){
            for(let j = 0; j < notesProgression.length; j++)
            {
                result.push(buildKey(notesProgression[j], i));
            }
            
        }

        return result;
    }

    const [keys, setKeys] = React.useState(buildKeys());

    useEffect(() => {
        initMidiDevice();
    }, []);

    const initMidiDevice = () => {
        midiDevice.onmidimessage = (message) => {
            const noteMapped = NotesMap[message.data[1]];
    
            if(!noteMapped){
              console.log(`Note ${message.data[1]} not found in map.`);
              return;
            }
    
            console.log(message);
            
            if(signalInterpreter.isNoteOn(message.data[0]))
            {
            onNoteOn(noteMapped);
            }
            else if(signalInterpreter.isNoteOff(message.data[0])){
                onNoteOff(noteMapped)
            }
              
          };
    }

    const onNoteOn = (note) => {

        const resultKeys = [...keys];

        resultKeys[getKeyByNoteIndex(resultKeys, note)].setPushed(true);

        setKeys(resultKeys);

        sampler.triggerAttack(note);
    }

    const onNoteOff = (note) => {
        const resultKeys = [...keys];

        resultKeys[getKeyByNoteIndex(resultKeys, note)].setPushed(false);

        setKeys(resultKeys);

        sampler.triggerRelease(note);
    }

    const getKeyByNoteIndex = (keys, note) => {
        return keys.findIndex(key => key.displayName() === note);
    }

  return (
    <>
        <div className="keyboardContainer">
            {
                keys.map((key, index) => (
                    <div key={index} className={"key" + (key.isPushed() ? ' pushed' : '')}>
                        {key.displayName()}
                    </div>
                ))
    }
            
        </div>
    </>
  )
}
