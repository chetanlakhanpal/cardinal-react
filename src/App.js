import React, { useEffect } from 'react';

import Dashboard from './pages/dashboard';

import { BrowserRouter as Router, Route} from 'react-router-dom'
import { database } from './firebase/firebase.utils';
import { connect } from 'react-redux';

import { setTopFeeds } from './redux/actions/feed.action';

function App(props) {

  useEffect(() => {
    const firebaseSubscription = database().ref('/v0/newstories');
    firebaseSubscription.on('value', function(snapshot) {
        const data = snapshot.val()
        props.setTopFeeds(data)
    });

    return (() => {
        firebaseSubscription.off('value')
    })
  })

  return (
    <Router>
      <Route path="/">
        <Dashboard />
      </Route>
    </Router>
  );
}


const mapDispatchToProps = {setTopFeeds}

export default connect(null, mapDispatchToProps)(App)