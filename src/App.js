import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import Appbar from './components/Appbar'
import FileDialog from './components/FileDialog'
import FileTable from './components/FileTable'

const useStyles = makeStyles(theme => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButton: {
    marginTop: theme.spacing(4),
  },
  table: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

function App() {
  const classes = useStyles();
  const [fileDialog, setFileDialog] = useState(false);

  return (
    <>
      <CssBaseline />
      <Appbar />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              File Upload
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Testing Filepond to be used in MedChain's fileupload component
            </Typography>
            <div className={classes.heroButton}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary" onClick={() => setFileDialog(true)}>
                    Upload A File
                  </Button>
                </Grid>
              </Grid>
            </div>
            <FileDialog open={fileDialog} onClose={() => setFileDialog(false)} />
          </Container>
          <Container className={classes.table} maxWidth="md">
            <FileTable />
        </Container>
        </div>
      </main>
    </>
  );
}

export default App;
