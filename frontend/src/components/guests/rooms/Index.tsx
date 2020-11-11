import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CardProps,
  Container,
  List,
  ListItem,
  Typography,
} from '@material-ui/core'
import React, { useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { AuthContext } from '../../../contexts/authContext'
import { useGuestsRooms } from '../../../hooks/useGuestsRooms'

const StyledSpacer = styled.div`
  flex-grow: 1;
`

const StyledCard = styled((props: CardProps) => <Card {...props} />)`
  margin: 0 auto;
  width: 400px;
`

export const GuestsRooms: React.FC = () => {
  const { getGuestId } = useContext(AuthContext)
  const history = useHistory()

  const { rooms, fetchRooms } = useGuestsRooms()

  useEffect(() => {
    if (getGuestId()) {
      fetchRooms()
    }
  }, [fetchRooms, getGuestId, history])

  return (
    <>
      <Container maxWidth="sm">
        <Typography variant="h4">Rooms</Typography>
        <List>
          {rooms
            ?.sort((a, b) => (a.id < b.id ? 1 : -1))
            .map((room) => {
              return (
                <ListItem key={room.id}>
                  <StyledCard>
                    <CardActionArea
                      component={Link}
                      to={`/guests/rooms/${room.id}`}
                    >
                      <CardMedia
                        component="img"
                        title={room.name}
                        src={`https://picsum.photos/seed/${room.id}/400/200?blur`}
                      />
                      <CardContent>
                        <Typography variant="h5">{room.name}</Typography>
                        <Typography variant="body1">{`¥${room.price}/泊`}</Typography>
                      </CardContent>
                      <CardActions>
                        <StyledSpacer />
                        <Button component="div" color="primary">
                          予約する
                        </Button>
                      </CardActions>
                    </CardActionArea>
                  </StyledCard>
                </ListItem>
              )
            })}
        </List>
      </Container>
    </>
  )
}
