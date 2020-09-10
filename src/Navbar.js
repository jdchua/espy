import React, {useState} from 'react';
import Loader from 'react-loader-spinner'
import Hot from "./Hot"
import New from "./New"
import Top from "./Top"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Container from '@material-ui/core/Container';
import Fade from '@material-ui/core/Fade';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    fontFamily: 'Squada One',
    flexGrow: 1,
    marginLeft: "20px",
    display: "none",
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar() {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setLoading] = useState(true);

  const handleSubmit = event => {
    setSearchTerm(event.target.searching.value);
    setTimeout(() => {
      setLoading(true);
    }, 2000);
    setLoading(false);
    event.preventDefault();
  }

  let loader, posts;
  if(!isLoading){loader=<Loader className="loadingSpinner" type="Grid" color="black" height={60} width={60}/>}
  posts=<div style={{display: isLoading ? "block" : "none" }}><Hot searchTerm={searchTerm}/><New searchTerm={searchTerm}/><Top searchTerm={searchTerm}/></div>

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <Avatar src="https://www.uokpl.rs/fpng/d/110-1101045_reddit-icon-transparent.png"></Avatar>
            <Typography className={classes.title} variant="h6" noWrap>
              espy. 
            </Typography>
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <form onSubmit={handleSubmit} >
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  name="searching"
                  inputProps={{ 'aria-label': 'search' }}
                />
            </form>
          </div>
        </Toolbar>
      </AppBar>
      {loader}
      <Container>
        <Fade in={isLoading}>
          {posts}
        </Fade>
      </Container>
    </div>
  );
}