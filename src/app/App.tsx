import React from 'react';
import './App.css';
import {
    AppBar,
    Button,
    Container,
    createStyles,
    IconButton,
    LinearProgress,
    makeStyles,
    Theme,
    Toolbar,
    Typography
} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {TodolistsList} from '../features/TodolistsList/TodolistsList';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {useAppSelector} from './hooks';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

type PropsType = {
    demo?: boolean
}

function App({demo = false}:PropsType) {
    const classes = useStyles();
    const status = useAppSelector(state => state.app.status)
    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" className={classes.menuButton}>
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Todolists
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <TodolistsList demo={demo}/>
            </Container>
        </div>
    );
}

export default App;



