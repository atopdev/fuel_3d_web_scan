import React from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import GradientSVG from './GradientSVG';
import 'react-circular-progressbar/dist/styles.css';

class RadialChart extends React.Component {
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

    return (
      <div className="radial-wrapper">
        <GradientSVG idCSS="gradient_progress" startColor="#0aafd2" endColor="#0dc204" rotation="0" />
        <CircularProgressbar
          percentage={percent}
          text={percent}
          counterClockwise={true}
          styles={{
            text: { fill: 'url(#gradient_progress)', fontSize: '50px', fontWeight: 600 }
          }}
        />
      </div>
    );
  }
};

export default RadialChart;
