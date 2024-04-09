class SignalInterpreter{
    isNoteOn(signal){
        return SignalCodes.NOTE_ON.indexOf(signal) !== -1;
    }

    isNoteOff(signal){
        return SignalCodes.NOTE_OFF.indexOf(signal) !== -1;
    }


}

const SignalCodes = {
    NOTE_ON: [144, 145],
    NOTE_OFF: [128, 129]
}

const signalInterpreter = new SignalInterpreter();

export default signalInterpreter;