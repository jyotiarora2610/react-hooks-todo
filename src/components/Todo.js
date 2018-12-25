import React, { useState } from 'react';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: theme.spacing.unit * 50
    },
    list: {
        width: theme.spacing.unit * 50,
        listStyle: 'none',
        padding: theme.spacing.unit
    },
    card: {
        marginBottom: theme.spacing.unit
    },
    deleteIcon: {
        float: 'right'
    },
    completeText: {
        textDecoration: 'line-through'
    },
    dateTime: {
        textAlign: 'right',
        fontSize: '10px'
    }
});

const Todo = (props) => {
    const [todo, setTodo] = useState([])
    const [value, setValue] = useState('');
    const { classes } = props;
    const today = new Date()
    const currentDay = `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`
    const currentTime = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`

    const addItem = item => {
        const updatedArray = [
            ...todo,
            {
                text: item,
                isComplete: false,
                date: currentDay,
                time: currentTime
            }
        ]
        setTodo(updatedArray)
    }

    const deleteItem = index => () => {
        const arr = todo.slice()
        arr.splice(index, 1);
        setTodo(arr)
    }

    const handleSubmit = event => {
        event.preventDefault();
        addItem(value);
        setValue('');
    }

    const markComplete = id => () => {
        const updatedTodo = todo.map((item, index) => {
            if(index === id) {
                const updatedItem = {
                    ...item,
                    isComplete: true
                }
                return updatedItem
            }
            return item
        })
        setTodo(updatedTodo)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <TextField
                    id="outlined-name"
                    label="Add task in the list"
                    className={classes.textField}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    margin="normal"
                    variant="outlined"
                />
            </form>
            <ul className={classes.list}>
                {
                    todo.map((item, index) => {
                        return (
                            <li key={index}>
                                <Card className={classes.card}>
                                    <Checkbox
                                        onChange={markComplete(index)}
                                        value="completeStatus"
                                        color="primary"
                                        checked={item.isComplete}
                                    />
                                    <span
                                    className={item.isComplete ? classes.completeText : ''}>
                                        {item.text}
                                    </span>
                                    <IconButton
                                        aria-label="Delete"
                                        className={classes.deleteIcon}
                                        onClick={deleteItem(index)}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Card>
                                <p className={classes.dateTime}>{item.date} at {item.time}</p>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default withStyles(styles)(Todo)