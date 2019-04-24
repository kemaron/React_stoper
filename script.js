import React from 'react';

class Stopwatch extends React.Component {
    constructor() {
        super();
        this.running = false;
        this.reset();
    }

    reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
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
        this.times.miliseconds += 1;
        if (this.times.miliseconds >= 100) {
            this.times.seconds += 1;
            this.times.miliseconds = 0;
        }
        if (this.times.seconds >= 60) {
            this.times.minutes += 1;
            this.times.seconds = 0;
        }
    }

    render() {
		return(
			<div className='container'>
				<nav className='controls'>
					<button onClick={e => this.start(e)}>Start</button>
					<button onClick={e => this.stop(e)}>Stop</button>
					<button onClick={e => this.restart(e)}>Restart</button>
				</nav>
				{this.format(this.state.times)}
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

/*
const stopwatch = new Stopwatch(
document.querySelector('.stopwatch'));

let startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

let stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopwatch.reset());
*/


ReactDOM.render(<Stopwatch/>, document.getElementById("app"));