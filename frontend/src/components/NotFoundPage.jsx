import { Card, CardHeader, CardBody, Stack, Box, Heading, Text, StackDivider, Button } from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateRoute } from "../services/routeSlice"
const NotFoundPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  return (
    <Card variant={'filled'}>
      <CardHeader>
        <Heading size='md'>SMV2 ACCESS </Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          <Box>
            <Heading size='xs' textTransform='uppercase'>
              404 Page Not Found
            </Heading>
            <Text pt='2' fontSize='sm'>
              The page you are looking for does not exist or an other error occured.
            </Text>
          </Box>
          <Box>
            <Button
              onClick={()=>{
                navigate('/shipment')
                dispatch(updateRoute('shipment'))
              }}
              colorScheme="blue"
            >Back to Shipment</Button>
          </Box>
          
        </Stack>
      </CardBody>
    </Card>       
  )
}

export default NotFoundPage