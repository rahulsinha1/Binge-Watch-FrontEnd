class Counter extends Component {
    state = { 
        
     }

     hadleIncrement(){
         console.log("Increment Clicked",this)

     }
    render() { 
        return ( 
            <div>
                <button className="my button">
                    home
                </button>
            </div>
         );
    }
}
 
export default Counter;