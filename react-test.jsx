import React, { Component } from 'react';

function lengthOfWord(s) {
  if (s.length <= 1) return 0;
  // trim js函数可能不是原生
  const arr = s.replace(/[^\w]*$/gi, '').trim().split(' ');
  return arr[arr.length - 1].length;
}

console.log('length', lengthOfWord('Hello World!'));
// semver.lt

let interval;
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: 0,
      end: 0,
      status: -1,	// -1 未开始 0 范围内 1 已结束
      day: 0,
      hour: 0,
      minute: 0,
      second: 0
    };
  }
  async componentDidMount() {
    const startTime = +new Date('2019/1/1');
    const endTime = +new Date('2019/12/1')

    const current = +new Date;
    this.decideStatus(current, startTime, endTime);
  }
  decideStatus(time, startTime, endTime) {
    let status = -1;
    if (time >= startTime && time < endTime) {
      status = 0;
    }

    if (time >= endTime) {
      status = 1
    }
    this.setState({
      status,
      start: startTime,
      end: endTime
    }, function () {
      console.log(111, status);
      if (status === 0) {
        this.count();
      }
    });
  }
  componetWillUnmount() {
    clearInterval(interval);
  }
  count() {
    const current = +new Date;
    let timeRemain = (this.state.end - current);
    interval = setInterval(() => {
      if (timeRemain > 1000) {
        timeRemain -= 1000;
        let day = Math.floor((timeRemain / 1000 / 3600) / 24);
        let hour = Math.floor((timeRemain / 1000 / 3600) % 24);
        let minute = Math.floor((timeRemain / 1000 / 60) % 60);
        let second = Math.floor((timeRemain / 1000) % 60);
        this.setState({
          day, hour, minute, second, status: 0
        })
      } else {
        this.setState({
          status: 1
        });
        clearInterval(interval);
      }
    }, 1000);
  }
  render() {
    const { status, day, hour, minute, second } = this.state;
    if (status === -1) {
      return <span>未开始</span>
    }

    if (status === 1) {
      return <span>已结束</span>
    }
    return (
      <span>结束还剩{day}天{hour}时{minute}分{second}秒</span>
    )
  }
}
