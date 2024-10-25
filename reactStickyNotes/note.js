class Note extends React.Component {


    constructor(props){
        super(props);
        this.state = {editing: false};
        this.edit = this.edit.bind(this);
        this.remove = this.remove.bind(this);
        this.save = this.save.bind(this);
        this.myRef = React.createRef();

    }
    
    componentDidMount(){
        $(ReactDOM.findDOMNode(this)).draggable();
    }
 

    edit(){
        this.setState({editing: true});
    }

    remove(){
        alert('removing note');
    }

    save(){
        var newNote = this.myRef.current.value;
        this.props.onChange(newNote, this.props.index);
        this.setState({editing: false});
    }


    render(){
        if (this.state.editing){return this.renderEdit();}
        else {return this.renderDisplay();}
    }

    renderEdit() {
        return (
            <div className="note" style={this.style}>
            <textarea ref={this.myRef} defaultValue={this.props.children}
             className="form-control"></textarea>
            <button onClick={this.save} className="btn btn-success btn-sm">
            <i className="fas fa-save"></i></button>
            </div>
        )
    }

    renderDisplay() {
       return (
       <div className="note">
       <p>{this.props.children}</p>
       <span>         
            <button onClick={this.edit} className="btn btn-primary"><i className="fas fa-edit"></i></button>
            <button onClick={this.remove} className="btn btn-danger"><i className="fas fa-trash"></i></button>
       </span>
       </div>
       );
    }
 }

 class Board extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            notes: ['Call Bill','Email Lisa','Make dentist appt','Send Proposal']
        };
        this.update = this.update.bind(this);
        this.remove = this.remove.bind(this);
        this.eachNote = this.eachNote.bind(this);
    }
    update(newText, i) {
        var arr = this.state.notes;
        arr[i] = newText;
        this.setState({ notes:arr });
    }
    remove(i) {
        var arr = this.state.notes;
        arr.splice(i, 1);
        this.setState({ notes: arr });
    }
    eachNote(note, i) {
        return (
          <Note key={i}
                index={i}
                onChange={this.update}
                onRemove={this.remove}
           >{note}</Note> 
        );
    }
    render () {
        return (<div className="board">
                {this.state.notes.map(this.eachNote)}
                </div>
        );
    }
 }
 ReactDOM.render(<Board count={10}/>,document.getElementById('react-container'));
 
 