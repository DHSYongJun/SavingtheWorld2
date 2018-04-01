import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui-next/styles';
import AppBar from 'material-ui-next/AppBar';
import Toolbar from 'material-ui-next/Toolbar';
import Typography from 'material-ui-next/Typography';
import Button from 'material-ui-next/Button';
import IconButton from 'material-ui-next/IconButton';
import MenuIcon from 'material-ui-icons-next/Menu';
import SearchIcon from 'material-ui-icons-next/Search';
import MoreVertIcon from 'material-ui-icons-next/MoreVert';
import Tabs, { Tab } from 'material-ui-next/Tabs';
import Today from "./today";
import Upcoming from "./upcoming";
import Past from "./past";
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class SimpleTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Competition Updates
            </Typography>
            <IconButton color="inherit" aria-label="Search">
              <SearchIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon color='#FFFFFF' />
            </IconButton>
            </Toolbar>
          <Tabs value={value} onChange={this.handleChange} centered>
            <Tab label="Today" href="#today" />
            <Tab label="Upcoming" href="#upcoming" />
            <Tab label="Past" href="#past" />
          </Tabs>
        </AppBar>
        {
          value === 0 && 
            <TabContainer>
              <Today/>
            </TabContainer>
        }
        {
          value === 1 &&
          <TabContainer>
            <Upcoming /> 
            </TabContainer>
        }
        {
          value === 2 &&
          <TabContainer>
            <Past />
            </TabContainer>
        }
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);
