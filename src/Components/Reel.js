/**
 * Slot Machine Simulation - Reel Component
 * https://github.com/umuthan/slot-machine-simulation
 *
 * Author: Umuthan Uyan
 *
 */

import React, { Component } from 'react';

import { getSymbol } from '../Functions/Reel';

class Reel extends Component {

  render(){

    const {
      top,
      center,
      bottom,
      animation
    } = this.props;

    const symbol4 = getSymbol(bottom,'next');
    const symbol5 = getSymbol(symbol4,'next');

    return (
      <div className="reel">
        <div className="overlay"></div>
        <div className={animation ? 'animationPlay' : 'animationStop'}>
          <img alt="Top" src={require('../Assets/img/'+top+'.png')} />
          <img alt="Center" src={require('../Assets/img/'+center+'.png')} />
          <img alt="Bottom" src={require('../Assets/img/'+bottom+'.png')} />
          <img alt="Symbol4" src={require('../Assets/img/'+symbol4+'.png')} />
          <img alt="Symbol5" src={require('../Assets/img/'+symbol5+'.png')} />
          <img alt="Top" src={require('../Assets/img/'+top+'.png')} />
          <img alt="Center" src={require('../Assets/img/'+center+'.png')} />
          <img alt="Bottom" src={require('../Assets/img/'+bottom+'.png')} />
        </div>
      </div>
    );

  }
}

export default Reel;
