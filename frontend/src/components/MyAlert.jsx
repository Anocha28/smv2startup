import { Alert, AlertIcon, Box, AlertTitle, AlertDescription } from '@chakra-ui/react'

const MyAlert = ({status, title, message}) => {

  return (
    <Alert status={status} variant='top-accent' my={2}>
      <AlertIcon />
      <Box>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Box>
    </Alert>
  )
}

MyAlert.defaultProps = {
    status: 'error',
    title: 'Something went wrong.',
    message: '',
}
export default MyAlert