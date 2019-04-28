class Stopwatch extends React.Component {
   constructor() {
        super();
        this.running = false;
        this.reset();
    }    
     
    reset() {
        this.state = {
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        }         
    }

   
    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

    // setInterval odpala daną funkcję co zadany czas (tutaj 10)
    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }
    //  clearInterval zatrzymuje interwał wywołany przez setInterval
    stop() {
        this.running = false;
        clearInterval(this.watch);
    }

    step() {
        if (!this.running) return;
        this.calculate();
    }

    calculate() {
        let newTime = {
			miliseconds: this.state.times.miliseconds,
			seconds : this.state.times.seconds,
			minutes: this.state.times.minutes
		};

		newTime.miliseconds += 1;

		if(newTime.miliseconds >= 100) {
			newTime.seconds += 1;
			newTime.miliseconds = 0;
        }
        
		if (newTime.seconds >=60) {
			newTime.minutes += 1;
			newTime.seconds = 0;
        }

        this.setState({times: newTime});
    }

   render() {
    return(
        <div className='container'>
            <nav className='controls'>
            <a href="#" className="button" id="start" onClick={e => this.start(e)}>Start</a>
            <a href="#" className="button" id="stop" onClick={e => this.stop(e)}>Stop</a>
            <a href="#" className="button" id="reset" onClick={e => this.reset(e)}>Reset</a>
            </nav>            
            <div className="stopwatch">{this.format(this.state.times)}</div>            
        </div>
    );
   }

}

// funkcja dodaje zero, jesli czas jest jednocyfrowy

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

ReactDOM.render(<Stopwatch />, document.getElementById("app"));