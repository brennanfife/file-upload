import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    table: {
        maxHeight: 440,
        overflow: 'auto',
    },
});

function createData(files, ipfsHash, timestamp, tags) {
    return { files, ipfsHash, timestamp, tags };
}

const rows = [
    createData('File 1', 12345, '13:00', 'Some tag'),
    createData('File 2', 12346, '15:30', 'Some tag'),
];

const FileTable = () => {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Table stickyHeader className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell>File(s)</TableCell>
                    <TableCell align="right">IPFS Hash</TableCell>
                    <TableCell align="right">Timestamp</TableCell>
                    <TableCell align="right">Tag(s)</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map(row => (
                <TableRow key={row.files}>
                    <TableCell component="th" scope="row">
                    {row.files}
                    </TableCell>
                    <TableCell align="right">{row.ipfsHash}</TableCell>
                    <TableCell align="right">{row.timestamp}</TableCell>
                    <TableCell align="right">{row.tags}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </Paper>
    )
}

export default FileTable