 class Note{ // acts like function ES-6
    constructor(noteObject)
    {
        // here GOD object is converted into specific object
        for(let key in noteObject)
        {
            this[key] = noteObject[key]; //recent or current id ko utha rha h out of every id's
        }
        this.isMarked = false;
    }
    toggleMark()
    {
        this.isMarked = !this.isMarked;
    }
}
export default Note; // used for destructuring