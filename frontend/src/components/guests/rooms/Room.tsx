import React from 'react'
import { useParams } from 'react-router-dom'

export const GuestsRoom: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>()
  return <>
  roomId: {roomId}
  </>
}
