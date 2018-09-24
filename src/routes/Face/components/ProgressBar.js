import React from 'react';

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      percent: 0,
      intervalId: null,
    };
    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    const { percent, duration = 1000, timeout = 0 } = this.props;
    if (percent < 0 || percent > 100) {
      return;
    }
    setTimeout(() =>{
      const intervalId = setInterval(this.timer, duration / Math.ceil(percent));
      this.setState({ intervalId });
    }, timeout);
  }

  timer() {
    let { percent, intervalId } = this.state;
    percent += 1;
    if (percent >= this.props.percent) {
      clearInterval(intervalId);
    }
    this.setState({ percent });
  }

  componentWillMount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    const { percent } = this.state;
    const { showLabel } = this.props;

    return (
      <div className="progress-bar-wrapper">
        <div className="progress-bar-block">
          <div className="progress-bar-bg"></div>
          <div className="progress-bar-active" style={{width: `${percent}%`}}></div>
        </div>
        { showLabel &&
          <div className="progress-bar-label">
            {percent} %
          </div>
        }
      </div>
    );
  }
};

export default ProgressBar;
