import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Text, useColorMode, Box, Button, Flex, Heading, Input, InputGroup, InputLeftElement, InputRightElement, Stack, SimpleGrid, Show, Alert } from '@chakra-ui/react'
import { MdPassword, MdOutlineEmail } from "react-icons/md";
import { login } from '../services/authSlice';

const LoginScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [ show, setShow ] = useState(false)
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ emailError, setEmailError ] = useState(false)
  const [ passwordError, setPasswordError ] = useState(false)
  const { isLoading, isError, isSuccess, message } = useSelector(state=>state.auth.login)
  const { user } = useSelector(state=>state.auth)
  const { colorMode } = useColorMode()

  const isEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const handleLogin = () => {
    if(!email || email === ''){
      setEmailError(true)
      return
    }
    if(!isEmail(email)){
      setEmailError(true)
      return
    }
    if(!password || password === ''){
      setPasswordError(true)
      return
    }

    const data = {email, password}
    dispatch(login(data))
  }

  useEffect(()=>{
    if(user || isSuccess){
      navigate('/shipment')
    }
  },[isSuccess, navigate, user])

  return (
    <Box>

      <SimpleGrid columns={{sm: 1, md: 1, lg: 2}} >
        <Show above='lg'>
          <Flex
            h={'100vh'} 
            backgroundImage={'./login.png'}
            backgroundSize={'contain'}
            backgroundRepeat={'no-repeat'}
            backgroundPosition={'center'}
            opacity={0.5}
            style={{mixBlendMode: 'multiply'}}
          >
          </Flex>
        </Show>
        
      
        <Flex
          h={'100vh'} 
          alignItems={'center'} 
          justifyContent={'center'} 
          boxShadow={'md'}
          bg={colorMode === 'light' ? 'gray.50' : 'blackAlpha.600'}
        >
          <Box 
            w={{sm: '100%', md: '100%', lg: '100%', xl: '90%', '2xl': '700px'}} 
            paddingX='3'
            paddingY='5'
            marginX='3'
          >
            
            <Heading 
              my={'40px'}
              color={colorMode === 'light' ? '#3D3B40' : '#fff5e0'}
            >SMV2 ACCESS</Heading>
            {isError &&
            <Alert status='error'>
              {message}
            </Alert>
            }
            <Stack gap={5}>
              <Box>
                <InputGroup size='lg'>
                  <InputLeftElement pointerEvents='none'>
                    <MdOutlineEmail size={22} color={colorMode === 'light' ? '#738197' : '#8F9298'} />
                  </InputLeftElement>
                  <Input 
                    type='email' 
                    autoFocus
                    onBlur={({target})=>{
                      if(target.value && !isEmail(target.value)){
                        setEmailError(true)
                        return
                      }
                      if(target.value){
                        setEmailError(false)
                        return
                      }
                    }}
                    variant='flushed'
                    autoComplete='off'
                    borderColor={emailError ? 'red.300' : 'blue.400'}
                    id='email'
                    placeholder='Email'
                    value={email}
                    onChange={({target})=>{
                      setEmail(target.value)
                    }}
                    onKeyDown={e=>{
                      if(e.key === 'Enter'){
                        handleLogin();
                      }
                      return
                    }}
                  />
                </InputGroup>
                {emailError && <Text fontSize={'sm'} color={'red.400'} ps='3'>Email is required</Text>}
              </Box>

              <Box>
                <InputGroup size='lg'>
                  <InputLeftElement pointerEvents='none'>
                    <MdPassword size={22} color={colorMode === 'light' ? '#738197' : '#8F9298'} />
                  </InputLeftElement>
                  <Input
                    id='password'
                    autoComplete='off'
                    variant='flushed'
                    type={show ? 'text' : 'password'}
                    placeholder='Password'
                    value={password}
                    borderColor={emailError ? 'red.300' : 'blue.400'}
                    onBlur={()=>{
                      if(email){
                        setPasswordError(false)
                      }
                    }}
                    onChange={({target})=>{
                      
                      setPassword(target.value)
                    }}
                    onKeyDown={e=>{
                      if(e.key === 'Enter'){
                        handleLogin();
                      }
                      return
                    }}
                  />
                  <InputRightElement width='4.5rem'>
                    <Button 
                      h='1.75rem' 
                      variant={'outline'}
                      size='sm' 
                      borderRadius={50} 
                      color={colorMode === 'light' ? '#3D3B40' : '#fff5e0'}
                      onClick={()=>setShow(prev=>!prev)}
                    >
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {passwordError && <Text fontSize={'sm'} color={'red.400'} ps='3'>Password is required</Text>}
              </Box>

            </Stack>

            <Box my='40px'>
              <Button
                isLoading={isLoading}
                size='lg'
                w='50%'
                variant={'outline'}
                borderRadius={50}
                color={colorMode === 'light' ? '#3D3B40' : '#fff5e0'}
                onClick={handleLogin}
              >
                LOGIN
              </Button>
            </Box>
            <Box w='100%' borderBottom={'1px'} borderColor={'gray.200'} boxShadow={'dark-lg'} />
          </Box>
        </Flex>
      </SimpleGrid>
    </Box>
  )
}

export default LoginScreen