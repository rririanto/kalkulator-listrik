import React from 'react';
import Spin from 'antd/es/spin'; // for js
import 'antd/es/spin/style/css'; // for css

export default function Loading(props) {
  if (props.isLoading) {
    if (props.timedOut) {
      return <div>Loader timed out!</div>;
    } else if (props.pastDelay) {
      return <div className="loader"><Spin size="large" /></div>
    } else {
      return null;
    }
  } else if (props.error) {
    return <div>Error! Component failed to load</div>;
  } else {
    return null;
  }
}

