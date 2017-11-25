import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Routes from './components/Routes/Routes';

const App = () => (
  <div className="ui container">
    <Menu secondary>
      <Menu.Item>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>
          <Link to="/login">Login</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/signup">Sign up</Link>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
    <Routes />
  </div>
);

export default App;
