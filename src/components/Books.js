import React, { useState } from 'react';
import {
  Container, 
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Input
} from "@mui/material";
import Book from './Book';
import UploadIcon from '@mui/icons-material/Upload';

export default function Books() {
  const [ books, setBooks ] = useState([])
  const [ selectedBook, setSelectedBook ] = useState({
    filename: null,
    data: null
  })
  const [ open, setOpen ] = useState(false);

  const upload = (e) => {
    // Convert the FileList into an array and iterate
    Array.from(e.target.files).forEach(file => {
      // Define a new file reader
      let reader = new FileReader();
      
      // Function to execute after loading the file
      reader.onload = () => {
        if (books.filter(function(e) { return e.filename === file.name; }).length === 0) {
          setBooks((books) => {
            return [...books, {
              filename: file.name,
              data: reader.result
            }]
          })
        }
      };
      // Read the file as a text
      reader.readAsText(file)
    });
  }

  return (
    <Container maxWidth="md" component="main" >
      <Container sx={{ pt: 8, pb: 6 }}>
        <label htmlFor="icon-button-file">
          <input accept=".txt" id="icon-button-file" type="file" onChange={upload} hidden multiple/>
          <IconButton color="primary" aria-label="upload picture" component="span" size="large">
            <UploadIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </label>
        <Typography> Select a txt file to Upload </Typography>
      </Container>
      <Grid container spacing={5}>
        { books.length !== 0 ? 
          books.map((book, idx) => (
            <Grid item key={idx} xs={6}>
              <Card>
                <CardActionArea onClick={() => {
                  setOpen(true)
                  setSelectedBook(book)
                }}>
                  <CardContent 
                    sx={{ 
                      flexGrow: 1,
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4, 1fr)',
                      gridTemplateRows: 'auto',
                      gridTemplateAreas: `"counter info info info "`
                    }}>
                    <Typography variant="h5" component="h2" sx={{gridArea: 'counter', display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                      {idx+1}
                    </Typography>
                    <Typography variant="h5" component="h2" sx={{gridArea: 'info', }}>
                      {book.filename}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        :
          <Grid item xs={12}>
            <Typography variant="h5" color="text.secondary" sx={{width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              No Book Found
            </Typography>
          </Grid>
        }
        <Book open={open} setOpen={setOpen} selectedBook={selectedBook} setSelectedBook={setSelectedBook} />
      </Grid>
    </Container>
  )
}