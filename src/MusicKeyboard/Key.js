class Key{
    constructor(note, octave){
        this.note = note;
        this.octave = octave;
    }

    displayName(){
        return `${this.note}${this.octave}`;
    }

    isPushed(){
        return this.pushed;
    }

    setPushed(value){
        this.pushed = value;
    }
}

export default Key;