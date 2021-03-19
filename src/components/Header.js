import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeMode, fetch_products, searchProduct } from '../redux/ProductsAction';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: '70px'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
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
        // vertical padding + font size from searchIcon
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

const mapStateToProps = (state) => {
    return {
        total_products : state.cart.length,
        visible: !state.changeMode
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: dispatch,
    }
}

function Header(props) {
    const classes = useStyles();
    
    let changeToCart = function() {
        props.dispatch(changeMode(true));
    }
    let changeToHomepage = function() {
        props.dispatch(changeMode(false));
    }

    let handleSearch = function(event) {
        props.dispatch(searchProduct(event.target.value))
        props.dispatch(fetch_products())
    }

    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                <Typography  style={{paddingRight : '6px'}} variant="h6" className={classes.title}>
                    <Link onClick={changeToHomepage} to="/">Homepage</Link>
                </Typography>
                { (props.visible)
                    ? (<div className={classes.search}>
                        <div className={classes.searchIcon}>
                          <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={handleSearch}
                        />
                    </div>)
                    : null
                }
                <Button style={{marginRight: '-20px', marginTop: '10px'}}color="inherit"> <Link onClick={changeToCart} to="/cart"><ShoppingCartIcon /></Link></Button>({props.total_products})
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
