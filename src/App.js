import "./App.css";

import React, { Component, useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const apiKey = process.env.REACT_APP_NEWS_API;
  const pagesize = 10;
  const [progress, setProgress] = useState(0);

  // setProgress = (progress) => {
  //   console.log("progress check", progress, progress);
  //   setState({ progress: progress });
  // };

  return (
    <div>
      <Router>
        <Navbar />
        <LoadingBar
          color="#0dcaf0"
          height="8px"
          progress={progress}
          // onLoaderFinished={() => setProgress(0)}
        />
        <Switch>
          <Route exact path="/">
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              key="general"
              pageSize={10}
              country="in"
              category="general"
            />
          </Route>
          <Route exact path="/Entertainment">
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              key="entertainment"
              pageSize={pagesize}
              country="in"
              category="entertainment"
            />
          </Route>
          <Route exact path="/Technology">
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              key="technology"
              pageSize={pagesize}
              country="in"
              category="technology"
            />
          </Route>
          <Route exact path="/Science">
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              key="science"
              pageSize={pagesize}
              country="in"
              category="science"
            />
          </Route>
          <Route exact path="/Sports">
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              key="sports"
              pageSize={pagesize}
              country="in"
              category="sports"
            />
          </Route>
          <Route exact path="/Health">
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              key="health"
              pageSize={pagesize}
              country="in"
              category="health"
            />
          </Route>
          <Route exact path="/Business">
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              key="business"
              pageSize={pagesize}
              country="in"
              category="business"
            />
          </Route>
          <Route exact path="/General">
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              key="general"
              pageSize={pagesize}
              country="in"
              category="general"
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};
export default App;
