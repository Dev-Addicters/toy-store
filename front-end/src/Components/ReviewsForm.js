import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'

import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch'
  }
}))

export default function ReviewsForm ({
  newForm,
  createReview,
  editReview,
  setEditReview,
  updateReview,
  reviewDetails
}) {
  const { id } = useParams()
  const [userReview, setUserReview] = useState({
    reviewer: '',
    title: '',
    content: '',
    rating: ''
  })

  useEffect(() => {
    setUserReview(
      reviewDetails ? reviewDetails : { ...userReview, product_id: id }
    )
  }, [])

  const handleTextChange = event => {
    setUserReview({ ...userReview, [event.target.id]: event.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault()
    if (newForm) {
      createReview(userReview)
      setUserReview({
        reviewer: '',
        title: '',
        content: '',
        rating: '',
        product_id: id
      })
    }

    if (!newForm) {
      updateReview(userReview)
      setEditReview(!editReview)
    }
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth='sm' component={Paper} elevation={3}>
        <form onSubmit={handleSubmit}>
          <TextField
            style={{ margin: 0, padding: 10 }}
            InputLabelProps={{ shrink: true }}
            onChange={handleTextChange}
            placeholder='Your name'
            value={userReview.reviewer}
            label='Name'
            variant='outlined'
            id='reviewer'
            fullWidth
            required
          />
          <TextField
            style={{ margin: 0, padding: 10 }}
            InputLabelProps={{ shrink: true }}
            onChange={handleTextChange}
            value={userReview.title}
            placeholder='Your title'
            value={userReview.title}
            label='Title'
            variant='outlined'
            id='title'
            fullWidth
            required
          />
          <TextField
            style={{ margin: 0, padding: 10 }}
            InputLabelProps={{ shrink: true }}
            onChange={handleTextChange}
            value={userReview.rating}
            InputProps={{
              inputProps: {
                max: 5,
                min: 0
              }
            }}
            variant='outlined'
            placeholder='★'
            label='Rating'
            type='number'
            id='rating'
            fullWidth
            required
          />

          <TextField
            style={{ margin: 0, padding: 10 }}
            InputLabelProps={{ shrink: true }}
            onChange={handleTextChange}
            value={userReview.content}
            multiline
            rows={5}
            label='Review Content'
            variant='outlined'
            id='content'
            placeholder='What do you think...'
            fullWidth
            required
          />

          <div style={{ margin: 0, padding: 14 }}>
            <Button variant='outlined' color='primary' type='submit' fullWidth>
              Submit
            </Button>
            <div>&emsp;</div>
          </div>
        </form>
      </Container>
    </>
  )
}
