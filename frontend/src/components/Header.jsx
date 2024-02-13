import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { Box, useToast, Button, Input, InputGroup, InputLeftElement, useColorMode, Spacer, IconButton, Wrap, Menu, MenuButton, MenuList, MenuItem, InputRightElement, MenuDivider } from '@chakra-ui/react'
import { HamburgerIcon, MoonIcon, SearchIcon, SunIcon } from '@chakra-ui/icons'
import { MdOutlineAssignmentInd, MdOutlineOpenInNew } from 'react-icons/md'
import { setSearchKey } from '../services/routeSlice'
import { logout } from '../services/authSlice'
import { useEffect } from 'react'

const Header = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const toast = useToast()
    const { colorMode, toggleColorMode } = useColorMode()
    const { current, search } = useSelector(state=>state.route)
    const { isSuccess, isError, isLoading, message } = useSelector(state=>state.auth.logout)
    const { user } = useSelector(state=>state.auth)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(isSuccess){
            navigate('/')
        }
        if(isError){
            toast({status:'error', description: message})
        }
    },[navigate, isSuccess, message, isError, toast])

    return (
        <Box 
            h={'70px'} 
            p={3}
            display={'flex'}
            alignItems={'center'}
            boxShadow={'md'}
            bg={colorMode === 'light' ? 'white' : 'blue.800'}
        >    
            <Box w={'60%'}> 
                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <SearchIcon color='gray.300' />
                    </InputLeftElement>
                    <Input 
                        type='text' 
                        id='search'
                        placeholder='Search' 
                        focusBorderColor={'#5C8374'}
                        borderRadius={50}
                        opacity={1}
                        maxLength={40}
                        value={search}
                        disabled={location.pathname.split('/').length > 2}
                        borderColor={colorMode === 'light' ? 'blackAlpha.500' : 'whiteAlpha.600'}
                        onChange={({target})=>{
                            dispatch(setSearchKey(target.value))
                        }}
                        onKeyDown={e=>{
                            if(e.key === 'Enter'){
                                //console.log(e.target.value)
                                //setSearchParams('search', search)
                                var format = /[!#$%^&*()_+=[\]{};':"\\|,<>/?]+/;
                                if(format.test(e.target.value)){
                                    toast({description:'Please remove special characters from search', status: 'warning'})
                                } else {
                                    navigate(`/${current}?page=1&search=${e.target.value}`)
                                }                             
                            }
                        }}
                    />
                    {search &&
                    <InputRightElement width='4.5rem'>
                        <Button
                            variant={'ghost'}
                            h='1.75rem'
                            size='sm'
                            borderRadius={30}
                            //_hover={{bg:'none'}}
                            onClick={()=>{
                                dispatch(setSearchKey(''))
                                navigate(`/${current}?page=1&search=`)
                            }}
                        >clear</Button>
                    </InputRightElement>
                    }
                </InputGroup>
            </Box>
            <Spacer />
            <Box>
                <Wrap>
                    <IconButton
                        isLoading={isLoading}
                        isRound={true}
                        variant='solid'
                        size={'md'}
                        color='#fff5e0'
                        backgroundColor={colorMode === 'light' ? '#5C8374' : 'none'}
                        _hover={{ bg: "#5C7374" }}
                        aria-label='Mode'
                        fontSize='20px'
                        onClick={toggleColorMode}
                        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    />
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            isRound={true}
                            aria-label='Options'
                            icon={<HamburgerIcon />}
                            variant='outline'
                            colorScheme='teal'
                        />
                        <MenuList>
                            {user && 
                            <MenuItem icon={<MdOutlineAssignmentInd size={20} /> }>
                                <Box>{user.name}</Box>
                                <Box fontSize='xs'>{user.email}</Box>
                            </MenuItem>
                            }
                            <MenuDivider />
                            <MenuItem 
                                icon={<MdOutlineOpenInNew size={20} />}
                                onClick={()=>{
                                    dispatch(logout())
                                }}
                            >
                                Logout
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Wrap>
            </Box>
        </Box>
    )
}

export default Header