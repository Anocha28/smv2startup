import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Box, useToast, useDisclosure, Button, IconButton, Flex, Spacer, useColorMode, Modal, ModalContent, ModalOverlay } from "@chakra-ui/react"
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getUsers, deleteUser, deleteReset } from "../services/userSlice"
import { MySpinner, MyAlert, MyPagination } from "../components"
import { MdDelete } from 'react-icons/md'
import UserEditModal from "./UserEditModal"
import dayjs from 'dayjs'

const UserListScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const toast = useToast()
    const [ searchParams ] = useSearchParams();
    const { colorMode } = useColorMode()
    const [ mouseIdx, setMouseIdx ] = useState(null)
    const [ deleteId, setDeleteId ] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isLoading, isError, isSuccess, message, userList, page, pageTotal } = useSelector(state=>state.user.list)
    const { isLoading:deleteLoading, isError:deleteError, isSuccess:deleteSuccess, message:deleteMessage } = useSelector(state=>state.user.delete)
    const { isSuccess: editSuccess } = useSelector(state=>state.user.edit)
    const { pageLimit } = useSelector(state=>state.route)
    const pageNum = searchParams.get('page') ?? 1
    const searchKey = searchParams.get('search') ?? ''
    const dataWidth = ['50px','200px','200px','100px','100px','60px','60px']
 
    useEffect(()=>{
        dispatch(getUsers({pageNum, pageLimit, searchKey}))
        if(deleteSuccess){
            setDeleteId('')
            toast({status:'success', description: 'User deleted successfully.'})
            onClose()
        }
    },[dispatch, onClose, toast, pageNum, pageLimit, searchKey, editSuccess, deleteSuccess])
    
    return (
        <Box>
            {isLoading && <MySpinner />}
            {isError && <MyAlert message={message} />}
            <Box w={`${dataWidth.reduce((ac, d)=> ac+ Number(d.replace('px','')), 0)+25}px`} overflow={'auto'}>
                <Flex mb='3'>
                    <Button
                        size='sm'
                        onClick={()=> navigate('/user/new')}
                    >Add User</Button>
                    <Spacer />
                    
                </Flex>

                <Box
                    display='flex'
                    alignItems={'center'}
                    textTransform={'uppercase'}
                    fontWeight={400}
                    fontSize={'sm'}
                    color='#fff5e0'
                    px='3'
                    h='35px'
                    bg={colorMode === 'light' ? '#5C8374' : 'blue.700'}
                    borderTopRadius={10}
                >
                    <Box w={dataWidth[0]}>No</Box>
                    <Box w={dataWidth[1]}>Name</Box>
                    <Box w={dataWidth[2]}>Email</Box>
                    <Box w={dataWidth[3]}>Type</Box>
                    <Box w={dataWidth[4]}>Created</Box>
                    <Box w={dataWidth[5]} textAlign={'center'}>Edit</Box>
                    <Box w={dataWidth[5]} textAlign={'center'}>Delete</Box>
                </Box>
                <Box >
                    {isSuccess && userList.map((u,i)=>(
                        <Box 
                            key={i}
                            bg={colorMode === 'light' ? mouseIdx === i ? 'gray.200' : 'gray.100' : mouseIdx === i ? 'blackAlpha.500' :'blackAlpha.400'}
                            fontSize={'sm'}
                            px={3}
                            py={1}
                            my={1}
                            onMouseEnter={()=>setMouseIdx(i)}
                        >
                            <Flex alignItems={'center'}>
                                <Box w={dataWidth[0]}>
                                    {pageNum === 1 ? (i+1) : (((Number(pageNum)-1) * pageLimit) + (i+1))}
                                </Box>
                                <Box w={dataWidth[1]} textTransform={'capitalize'}>{u.name}</Box>
                                <Box w={dataWidth[2]}>{u.email}</Box>
                                <Box w={dataWidth[3]}>{u.userType}</Box>
                                <Box w={dataWidth[4]}>{dayjs(u.createdAt).subtract(7, 'hour').format('DD-MMM hh:mm')}</Box>
                                <Box w={dataWidth[5]} alignItems={'center'} display='flex' justifyContent={'center'}>
                                    <UserEditModal user={u} />
                                </Box>
                                <Box w={dataWidth[5]} alignItems={'center'} display='flex' justifyContent={'center'}>
                                    <IconButton 
                                        variant={'ghost'}
                                        colorScheme="red"
                                        size='xs'
                                        m={0}
                                        p={0}
                                        h='15px'
                                        _hover={{bg:'none'}}
                                        icon={<MdDelete size='20' />} 
                                        onClick={()=>{
                                            setDeleteId(u._id)
                                            onOpen()
                                        }}
                                    />
                                </Box>
                            </Flex>
                        </Box>
                    ))}
                </Box>

                <MyPagination path='user' searchKey={searchKey} page={page} pageTotal={pageTotal} />
            </Box>
            
            <Modal 
                isCentered
                size='xs'
                closeOnOverlayClick={false}
                motionPreset='slideInBottom' 
                isOpen={isOpen} 
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent p='4'>
                    {deleteError && <MyAlert message={deleteMessage} />}
                    <Flex>
                        <Button
                            onClick={()=>{
                                setDeleteId('')
                                dispatch(deleteReset())
                                onClose()
                            }}
                            isDisabled={deleteLoading}
                        >Cancel</Button>
                        <Spacer />
                        <Button
                            isLoading={deleteLoading}
                            loadingText='Deleting'
                            colorScheme="red"
                            onClick={()=>{
                                dispatch(deleteUser(deleteId))
                            }}
                        >Yes Delete</Button>
                    </Flex>
                </ModalContent>
            </Modal>
            
        </Box>
    )
}

export default UserListScreen