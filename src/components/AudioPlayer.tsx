// import React from 'react'
// import AudioPlayer from 'react-h5-audio-player'
// import 'react-h5-audio-player/lib/styles.css'

// const CustomAudioPlayer = ({ audioSrc }) => {
//   return (
//     <AudioPlayer
//       className='mt-6 custom-player'
//       src={audioSrc}
//       showJumpControls={false}
//       layout='stacked-reverse'
//       customAdditionalControls={[]}
//       customVolumeControls={[]}
//       autoPlay={true}
//     />
//   )
// }

// export default CustomAudioPlayer

import { useState, useEffect, useRef } from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import PauseRounded from '@mui/icons-material/PauseRounded'
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded'
import FastForwardRounded from '@mui/icons-material/FastForwardRounded'
import FastRewindRounded from '@mui/icons-material/FastRewindRounded'
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded'
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded'
import Typography from '@mui/material/Typography'

const TinyText = ({ children }: { children: React.ReactNode }) => (
  <Typography variant='caption' sx={{ opacity: 0.6 }}>
    {children}
  </Typography>
)

type Props = {
  audioSource: string
  autoPlay?: boolean // autoPlay prop
}

const AudioPlayer = ({ audioSource, autoPlay = false }: Props) => {
  const [duration, setDuration] = useState<number>(0) // Total duration of the audio
  const [position, setPosition] = useState<number>(0) // Current time of the audio
  const [paused, setPaused] = useState(!autoPlay) // Initially not paused if autoPlay is true

  // Create a ref for the audio element
  const audioRef = useRef<any>(null)

  // Format the duration in minutes and seconds
  function formatDuration(value: number) {
    const minute = Math.floor(value / 60)
    const secondLeft = Math.floor(value % 60)
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`
  }

  // Play/Pause the audio
  const handlePlayPause = () => {
    setPaused(!paused)
    if (audioRef.current) {
      if (paused) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }

  // Skip forward 10 seconds
  const handleSkipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, duration)
      setPosition(audioRef.current.currentTime)
    }
  }

  // Skip backward 10 seconds
  const handleSkipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0)
      setPosition(audioRef.current.currentTime)
    }
  }

  // Update the position as the audio plays
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setPosition(audioRef.current.currentTime)
    }
  }

  // Get the total duration of the audio once it's loaded
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
      // Automatically play audio if autoPlay is true
      if (autoPlay) {
        audioRef.current.play()
      }
    }
  }

  // Restart audio when it ends
  const handleEnded = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      setPosition(0)
      setPaused(true) // Set paused to true since it's stopped
    }
  }

  // Set up event listeners
  useEffect(() => {
    const audio = audioRef.current

    if (audio) {
      audio.addEventListener('ended', handleEnded)
    }

    // Clean up the event listener on component unmount
    return () => {
      if (audio) {
        audio.removeEventListener('ended', handleEnded)
      }
    }
  }, [])

  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      {/* Reference the audio element */}
      <audio
        ref={audioRef}
        src={audioSource}
        controls={false}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
      <Slider
        aria-label='time-indicator'
        size='small'
        value={position}
        min={0}
        step={1}
        max={duration}
        onChange={(_, value) => {
          setPosition(value as number)
          if (audioRef.current) {
            audioRef.current.currentTime = value as number
          }
        }}
        sx={{
          color: 'rgba(0,0,0,0.87)',
          height: 4,
          '& .MuiSlider-thumb': {
            width: 8,
            height: 8,
          },
          '& .MuiSlider-rail': {
            opacity: 0.28,
          },
        }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: -2 }}>
        <TinyText>{formatDuration(position)}</TinyText>
        <TinyText>-{formatDuration(duration - position)}</TinyText>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: -1 }}>
        <IconButton aria-label='previous song' onClick={handleSkipBackward}>
          <FastRewindRounded fontSize='large' />
        </IconButton>
        <IconButton aria-label={paused ? 'play' : 'pause'} onClick={handlePlayPause}>
          {paused ? (
            <PlayArrowRounded sx={{ fontSize: '3rem' }} />
          ) : (
            <PauseRounded sx={{ fontSize: '3rem' }} />
          )}
        </IconButton>
        <IconButton aria-label='next song' onClick={handleSkipForward}>
          <FastForwardRounded fontSize='large' />
        </IconButton>
      </Box>
      <Stack spacing={2} direction='row' sx={{ mb: 1, px: 1 }} alignItems='center'>
        <VolumeDownRounded />
        <Slider
          aria-label='Volume'
          defaultValue={30}
          onChange={(_, value) => {
            if (audioRef.current) {
              audioRef.current.volume = (value as number) / 100
            }
          }}
          sx={{
            color: 'rgba(0,0,0,0.87)',
            '& .MuiSlider-thumb': {
              width: 24,
              height: 24,
              backgroundColor: '#fff',
              '&:hover, &.Mui-focusVisible, &.Mui-active': {
                boxShadow: 'none',
              },
            },
          }}
        />
        <VolumeUpRounded />
      </Stack>
    </Box>
  )
}

export default AudioPlayer
