/**
 * Slot Machine Simulation - App
 * https://github.com/umuthan/slot-machine-simulation
 *
 * Author: Umuthan Uyan
 *
 */

import React, { Component } from 'react';
import './Assets/scss/app.scss';

import Reel from './Components/Reel';
import { getRandomSymbol, getSymbol, pointRules, reelSymbols, reelLines } from './Functions/Reel';

class App extends Component {

  // Setting the default values
  state = {
    disabled: false,
    mode: 'random',
    totalPoint: 0,
    balance: 10,
    reel1TopSymbol: null,
    reel1CenterSymbol: null,
    reel1BottomSymbol: null,
    reel2TopSymbol: null,
    reel2CenterSymbol: null,
    reel2BottomSymbol: null,
    reel3TopSymbol: null,
    reel3CenterSymbol: null,
    reel3BottomSymbol: null,
    reel1Animation: false,
    reel2Animation: false,
    reel3Animation: false,
    pointAnimation: null,
    winLineTopLineAnimation: false,
    winLineCenterLineAnimation: false,
    winLineBottomLineAnimation: false
  }

  /*
  **
  ** Spin Function
  **
  */
  spinIt = () => {

    // Get the current balance
    const {
      balance
    } = this.state;

    // If balance is higher than 0 spin the reels.
    if(balance > 0) {

      // Setting values for spinning
      // Stopping animations, disable the SPIN button
      this.setState({
        disabled: true,
        balance: balance-1,
        pointAnimation: null,
        winLineTopLineAnimation: false,
        winLineCenterLineAnimation: false,
        winLineBottomLineAnimation: false
      })

      if(this.state.mode === 'fixed') {

        // In fixed mode start animations,
        // all the positions are selected by user
        this.setState({
          reel1Animation: true,
          reel2Animation: true,
          reel3Animation: true,
        })

      } else {

        // Start the animations,
        // Random selection for reels
        this.setState({
          reel1Animation: true,
          reel2Animation: true,
          reel3Animation: true,
          reel1CenterSymbol: getRandomSymbol(),
          reel2CenterSymbol: getRandomSymbol(),
          reel3CenterSymbol: getRandomSymbol(),
        }, () => {
          this.setState({
            reel1TopSymbol: getSymbol(this.state.reel1CenterSymbol,'prev'),
            reel1BottomSymbol: getSymbol(this.state.reel1CenterSymbol,'next'),
            reel2TopSymbol: getSymbol(this.state.reel2CenterSymbol,'prev'),
            reel2BottomSymbol: getSymbol(this.state.reel2CenterSymbol,'next'),
            reel3TopSymbol: getSymbol(this.state.reel3CenterSymbol,'prev'),
            reel3BottomSymbol: getSymbol(this.state.reel3CenterSymbol,'next'),
          })
        });

      }

      // Stop the first reel animation after 500 ms
      this.reel1AnimationTimeoutID = setTimeout(function () {
        this.setState({
          reel1Animation: false
        });
      }.bind(this), 500);

      // Stop the first reel animation after 1000 ms
      this.reel2AnimationTimeoutID = setTimeout(function () {
        this.setState({
          reel2Animation: false
        });
      }.bind(this), 1000);

      // Stop the first reel animation after 1500 ms
      this.reel3AnimationTimeoutID = setTimeout(function () {
        this.setState({
          reel3Animation: false
        });

        // Start the getPoint function to get points
        this.getPoint();
      }.bind(this), 1500);

    }

  }

  /*
  **
  ** Set Reel position based on user selection from the form in fixed mode
  **
  */
  setReelPosition = (event) => {

    // Get the first reel line position and symbol
    let reel1Line = event.target.elements['reel-1-line'].value;
    let reel1Symbol = event.target.elements['reel-1-symbol'].value;

    // Get and put the other symbols based on selection
    if(reel1Line === 'TOP') {
      this.setState({
        reel1TopSymbol: reel1Symbol
      }, () => {
        this.setState({
          reel1CenterSymbol: getSymbol(this.state.reel1TopSymbol,'next'),
        }, () => {
          this.setState({
            reel1BottomSymbol: getSymbol(this.state.reel1CenterSymbol,'next'),
          })
        })
      })
    } else if(reel1Line === 'CENTER') {
      this.setState({
        reel1CenterSymbol: reel1Symbol
      }, () => {
        this.setState({
          reel1TopSymbol: getSymbol(this.state.reel1CenterSymbol,'prev'),
          reel1BottomSymbol: getSymbol(this.state.reel1CenterSymbol,'next'),
        })
      })
    } else if(reel1Line === 'BOTTOM') {
      this.setState({
        reel1BottomSymbol: reel1Symbol
      }, () => {
        this.setState({
          reel1CenterSymbol: getSymbol(this.state.reel1BottomSymbol,'prev'),
        }, () => {
          this.setState({
            reel1TopSymbol: getSymbol(this.state.reel1CenterSymbol,'prev'),
          })
        })
      })
    }

    // Get the second reel line position and symbol
    let reel2Line = event.target.elements['reel-2-line'].value;
    let reel2Symbol = event.target.elements['reel-2-symbol'].value;

    // Get and put the other symbols based on selection
    if(reel2Line === 'TOP') {
      this.setState({
        reel2TopSymbol: reel2Symbol
      }, () => {
        this.setState({
          reel2CenterSymbol: getSymbol(this.state.reel2TopSymbol,'next'),
        }, () => {
          this.setState({
            reel2BottomSymbol: getSymbol(this.state.reel2CenterSymbol,'next'),
          })
        })
      })
    } else if(reel2Line === 'CENTER') {
      this.setState({
        reel2CenterSymbol: reel2Symbol
      }, () => {
        this.setState({
          reel2TopSymbol: getSymbol(this.state.reel2CenterSymbol,'prev'),
          reel2BottomSymbol: getSymbol(this.state.reel2CenterSymbol,'next'),
        })
      })
    } else if(reel2Line === 'BOTTOM') {
      this.setState({
        reel2BottomSymbol: reel2Symbol
      }, () => {
        this.setState({
          reel2CenterSymbol: getSymbol(this.state.reel2BottomSymbol,'prev'),
        }, () => {
          this.setState({
            reel2TopSymbol: getSymbol(this.state.reel2CenterSymbol,'prev'),
          })
        })
      })
    }

    // Get the third reel line position and symbol
    let reel3Line = event.target.elements['reel-3-line'].value;
    let reel3Symbol = event.target.elements['reel-3-symbol'].value;

    // Get and put the other symbols based on selection
    if(reel3Line === 'TOP') {
      this.setState({
        reel3TopSymbol: reel3Symbol
      }, () => {
        this.setState({
          reel3CenterSymbol: getSymbol(this.state.reel3TopSymbol,'next'),
        }, () => {
          this.setState({
            reel3BottomSymbol: getSymbol(this.state.reel3CenterSymbol,'next'),
          })
        })
      })
    } else if(reel3Line === 'CENTER') {
      this.setState({
        reel3CenterSymbol: reel3Symbol
      }, () => {
        this.setState({
          reel3TopSymbol: getSymbol(this.state.reel3CenterSymbol,'prev'),
          reel3BottomSymbol: getSymbol(this.state.reel3CenterSymbol,'next'),
        })
      })
    } else if(reel3Line === 'BOTTOM') {
      this.setState({
        reel3BottomSymbol: reel3Symbol
      }, () => {
        this.setState({
          reel3CenterSymbol: getSymbol(this.state.reel3BottomSymbol,'prev'),
        }, () => {
          this.setState({
            reel3TopSymbol: getSymbol(this.state.reel3CenterSymbol,'prev'),
          })
        })
      })
    }

    // Set the mode to fixed and spin the reels based on user selection
    this.setState({
      mode: 'fixed'
    }, () => {
      this.spinIt();
    })

    // Stay cool after form submit
    event.preventDefault();

  }

  /*
  **
  ** Get the Points after spinning
  **
  */
  getPoint = () => {

    // Get current values
    const {
      reel1TopSymbol,
      reel1CenterSymbol,
      reel1BottomSymbol,
      reel2TopSymbol,
      reel2CenterSymbol,
      reel2BottomSymbol,
      reel3TopSymbol,
      reel3CenterSymbol,
      reel3BottomSymbol,
      totalPoint,
      balance
    } = this.state;

    // Set total new point to zero
    let newPoint = 0;

    // Set the Points of line to zero
    let topLinePoint = 0;
    let centerLinePoint = 0;
    let bottomLinePoint = 0;

    // Get the lines
    let topLine = [reel1TopSymbol,reel2TopSymbol,reel3TopSymbol];
    let centerLine = [reel1CenterSymbol,reel2CenterSymbol,reel3CenterSymbol];
    let bottomLine = [reel1BottomSymbol,reel2BottomSymbol,reel3BottomSymbol];

    // Get the total point of top line
    // If there is win start the animation
    topLinePoint = pointRules(topLine, 'top');
    if(topLinePoint>0) {
      this.setState({
        winLineTopLineAnimation: true
      })
    }

    // Get the total point of center line
    // If there is win start the animation
    centerLinePoint = pointRules(centerLine, 'center');
    if(centerLinePoint>0) {
      this.setState({
        winLineCenterLineAnimation: true
      })
    }

    // Get the total point of bottom line
    // If there is win start the animation
    bottomLinePoint = pointRules(bottomLine, 'bottom');
    if(bottomLinePoint>0) {
      this.setState({
        winLineBottomLineAnimation: true
      })
    }

    // Sum all the points
    newPoint = topLinePoint + centerLinePoint + bottomLinePoint;

    // Set the points and blink the pay-table
    this.setState({
      totalPoint: totalPoint + newPoint,
      pointAnimation: 'animation'
    })

    // Set disabled to false to spin again
    if(balance>0) {

      this.setState({
        disabled: false
      })

    }

  }

  /*
  **
  ** Set the Balance Indicator
  **
  */
  setBalance = (event) => {

    // Get the new balance from input
    let newBalance = event.target.value;

    // If new balance is greater than 0 and below than 5000 set it
    if(newBalance<=5000 && newBalance >=0) {
      this.setState({
        balance: newBalance
      }, () => {
        if(newBalance>0) {
          this.setState({
            disabled: false
          })
        } else {
          this.setState({
            disabled: true
          })
        }
      })
    } else {
      event.target.value = this.state.balance;
    }

  }

  /*
  **
  ** Switch the mode
  **
  */
  toggleMode = () => {

    const {
      mode
    } = this.state;

    let newMode = '';

    if(mode === 'random') {
      newMode = 'fixed';
    } else {
      newMode = 'random'
    }

    this.setState({
      mode: newMode
    });

  }

  /*
  **
  ** First settings after component mounted
  **
  */
  componentDidMount() {

    /* Setting the random position of reels */
    this.setState({
      reel1CenterSymbol: getRandomSymbol(),
      reel2CenterSymbol: getRandomSymbol(),
      reel3CenterSymbol: getRandomSymbol(),
    }, () => {
      this.setState({
        reel1TopSymbol: getSymbol(this.state.reel1CenterSymbol,'prev'),
        reel1BottomSymbol: getSymbol(this.state.reel1CenterSymbol,'next'),
        reel2TopSymbol: getSymbol(this.state.reel2CenterSymbol,'prev'),
        reel2BottomSymbol: getSymbol(this.state.reel2CenterSymbol,'next'),
        reel3TopSymbol: getSymbol(this.state.reel3CenterSymbol,'prev'),
        reel3BottomSymbol: getSymbol(this.state.reel3CenterSymbol,'next'),
      })
    });

  }

  render(){

    const {
      mode,
      disabled,
      balance,
      totalPoint,
      reel1TopSymbol,
      reel1CenterSymbol,
      reel1BottomSymbol,
      reel2TopSymbol,
      reel2CenterSymbol,
      reel2BottomSymbol,
      reel3TopSymbol,
      reel3CenterSymbol,
      reel3BottomSymbol,
      reel1Animation,
      reel2Animation,
      reel3Animation,
      pointAnimation,
      winLineTopLineAnimation,
      winLineCenterLineAnimation,
      winLineBottomLineAnimation
    } = this.state;

    return (
      <div id="machine">

        <header>
          <h1>SLOT MACHINE</h1>
        </header>

        <div id="reels">
          { reel1TopSymbol && reel1CenterSymbol && reel1BottomSymbol ? (
            <Reel animation={reel1Animation} top={reel1TopSymbol} center={reel1CenterSymbol} bottom={reel1BottomSymbol} />
          ): null }
          { reel2TopSymbol && reel2CenterSymbol && reel2BottomSymbol ? (
            <Reel animation={reel2Animation} top={reel2TopSymbol} center={reel2CenterSymbol} bottom={reel2BottomSymbol} />
          ): null }
          { reel3TopSymbol && reel3CenterSymbol && reel3BottomSymbol ? (
            <Reel animation={reel3Animation} top={reel3TopSymbol} center={reel3CenterSymbol} bottom={reel3BottomSymbol} />
          ): null }
          <div className={winLineTopLineAnimation ? "winLine animation" : "winLine"} id="top"></div>
          <div className={winLineCenterLineAnimation ? "winLine animation" : "winLine"} id="center"></div>
          <div className={winLineBottomLineAnimation ? "winLine animation" : "winLine"} id="bottom"></div>
        </div>

        <footer>

          <h2>PAY-TABLE</h2>
          <div id="totalPoint" className={pointAnimation}>
            {totalPoint.toString().split('').map((point,i)=>(
              <span key={i}>{point}</span>
            ))}
          </div>

          <h2>BALANCE INDICATOR</h2>
          <input type="number" id="coin" onChange={this.setBalance} value={balance} min="0" max="5000" />

          { mode === 'random' ? (
            <>
              <button className="spinButton" onClick={this.spinIt} disabled={disabled}>SPIN</button>
              <button className="modeButton" onClick={this.toggleMode}>ENTER FIXED MODE</button>
            </>
          ) : mode === 'fixed' ? (
            <>
              <h2>FIXED MODE</h2>
              <form onSubmit={this.setReelPosition}>
                <label>REEL 1:
                  <select name="reel-1-line">
                    {reelLines.map((line,i) => (
                      <option key={i} value={line}>{line}</option>
                    ))}
                  </select>
                  <select name="reel-1-symbol">
                    {reelSymbols.map((symbol,i) => (
                      <option key={i} value={symbol}>{symbol}</option>
                    ))}
                  </select>
                </label>
                <label>
                  REEL 2:
                  <select name="reel-2-line">
                    {reelLines.map((line,i) => (
                      <option key={i} value={line}>{line}</option>
                    ))}
                  </select>
                  <select name="reel-2-symbol">
                    {reelSymbols.map((symbol,i) => (
                      <option key={i} value={symbol}>{symbol}</option>
                    ))}
                  </select>
                </label>
                <label>
                  REEL 3:
                  <select name="reel-3-line">
                    {reelLines.map((line,i) => (
                      <option key={i} value={line}>{line}</option>
                    ))}
                  </select>
                  <select name="reel-3-symbol">
                    {reelSymbols.map((symbol,i) => (
                      <option key={i} value={symbol}>{symbol}</option>
                    ))}
                  </select>
                </label>
                <input className="spinButton" type="submit" value="SPIN" disabled={disabled} />
              </form>
              <button className="modeButton" onClick={this.toggleMode}>CLOSE FIXED MODE</button>
            </>
          ) : null }

        </footer>

      </div>
    );

  }
}

export default App;
