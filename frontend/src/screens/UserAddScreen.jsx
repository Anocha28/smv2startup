import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Box, HStack, Button, Stack, Flex, Input, Center, Divider, Select, useToast } from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom'
import { addUser, addReset } from "../services/userSlice"
import { MyAlert, MySpinner } from "../components"

const UserAddScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const toast = useToast()
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ type, setType ] = useState('')

    const { isLoading, isError, message, isSuccess } = useSelector(state=>state.user.add)

    useEffect(()=>{
        if(isSuccess){
            toast({description: "Account created"})
            setEmail('')
            setName('')
            setPassword('')
            setType('')
        }
        return()=>{
            dispatch(addReset())
        }
    },[toast, isSuccess, dispatch])

    const handleAddUser = () => {
        const data = {
            name,
            email,
            password,
            userType: type
        }
        dispatch(addUser(data))
    }
    return (
        <Box>
            {isLoading && <MySpinner />}
            {isError && <MyAlert message={message} />}
         
            <HStack>
                <Button
                    onClick={()=> {
                        navigate('/user')
                    }}
                >Back</Button>
            </HStack>

            <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                my='50px' 
            >
                <Box 
                    w={{sm:'100%', md:'90%', lg:'80%', xl: '600px'}}
                    boxShadow={'dark-lg'}
                    p={5}
                    borderRadius={5}
                >
                    <Stack gap={4}>
                        <Flex>
                            <Box
                                display='flex'
                                w='100px'
                                alignItems={'center'}
                                justifyContent={'left'}
                            >
                                Name
                            </Box>
                            <Box flex={1}>
                                <Input
                                    type='text' 
                                    autoFocus
                                    autoComplete='off'
                                    id='user-name'
                                    value={name}
                                    onChange={({target})=>{
                                        setName(target.value)
                                    }}                                
                                />
                            </Box>
                        </Flex>
                        <Divider />

                        <Flex>
                            <Box
                                display='flex'
                                w='100px'
                                alignItems={'center'}
                                justifyContent={'left'}
                            >
                                Email
                            </Box>
                            <Box flex={1}>
                                <Input
                                    type='email' 
                                    autoComplete='off'
                                    id='user-email'
                                    value={email}
                                    onChange={({target})=>{
                                        setEmail(target.value)
                                    }}                                
                                />
                            </Box>
                        </Flex>
                        <Divider />

                        <Flex>
                            <Box
                                display='flex'
                                w='100px'
                                alignItems={'center'}
                                justifyContent={'left'}
                            >
                                Password
                            </Box>
                            <Box flex={1}>
                                <Input
                                    type='password' 
                                    autoComplete='off'
                                    id='user-password'
                                    value={password}
                                    onChange={({target})=>{
                                        setPassword(target.value)
                                    }}                                
                                />
                            </Box>
                        </Flex>
                        <Divider />

                        <Flex>
                            <Box
                                display='flex'
                                w='100px'
                                alignItems={'center'}
                                justifyContent={'left'}
                            >
                                Type
                            </Box>
                            <Box flex={1}>
                                <Select 
                                    placeholder='Select'
                                    value={type}
                                    id='user-type'
                                    onChange={({target})=>{
                                        setType(target.value)
                                    }} 
                                >
                                    <option value='bank'>Bank</option>
                                    <option value='admin'>Admin</option>
                                </Select> 
                            </Box>
                        </Flex>
                        
                        <Center>
                            <Button
                                colorScheme="green"
                                onClick={handleAddUser}
                            >Save</Button>
                        </Center>
                    </Stack>
                </Box>
            </Box>
        </Box>
    )
}

export default UserAddScreen