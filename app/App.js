import React, {createClass, PropTypes} from 'react';
import ReactDOM from 'react-dom';

const ScrollUnique = createClass({
    propTypes: {
      width: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
      ]).isRequired,
      height: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
      ]).isRequired
    },
    handleWheel(ev) {
        let {deltaMode, deltaY} = ev,
            oContainer = ReactDOM.findDOMNode(this),
            scrollTop = oContainer.scrollTop,
            scrollHeight = oContainer.scrollHeight,
            height = oContainer.clientHeight;

        if((deltaY < 0 && scrollTop <= -deltaY) ||
           (deltaY > 0 && scrollHeight - height - scrollTop <= deltaY)) {
           oContainer.scrollTop = deltaY < 0 ? 0 : scrollHeight;
           ev.preventDefault();
       }
    },
    getStringProp(value) {
      if(typeof value === 'number') {
        return `${value}px`
      }
      return value;
    },
    render() {
        let {width, height} = this.props,
            style = {
              width: this.getStringProp(width),
              height: this.getStringProp(height),
              overflow: 'auto'
            };
        return <div style={style}
                    onWheel={this.handleWheel}>
                   {this.props.children}
               </div>;
    }
});
export default ScrollUnique;
