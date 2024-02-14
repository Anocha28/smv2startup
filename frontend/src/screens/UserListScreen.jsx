import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Box, useToast, Button, IconButton, Flex, Spacer, useColorMode, Modal, ModalContent, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, Stack, Input, InputGroup, InputRightElement, Select, Divider, ModalFooter } from "@chakra-ui/react"
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getUsers, deleteUser, editUser, editReset, deleteReset } from "../services/userSlice"
import { MySpinner, MyAlert, MyPagination } from "../components"
import { MdDelete, MdEditNote } from 'react-icons/md'
import dayjs from 'dayjs'

const UserListScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const toast = useToast()
    const [ searchParams ] = useSearchParams();
    const { colorMode } = useColorMode()
    const [ mouseIdx, setMouseIdx ] = useState(null)
    const [ deleteId, setDeleteId ] = useState('')
    const [ showConfirmModal, setShowConfirmModal ] = useState(false)
    const [ showEditModal, setShowEditModal ] = useState(false)
    const [ editUserDetail, setEditUserDetail ] = useState({id:'',name:'',email:'',password:'',userType:'', index: null})
    const [ show, setShow ] = useState(false)
    const { isLoading, isError, isSuccess, message, userList, page, pageTotal } = useSelector(state=>state.user.list)
    const { isLoading: editLoading, isError:editError, isSuccess:editSuccess, message:editMessage } = useSelector(state=>state.user.edit)
    const { isLoading:deleteLoading, isError:deleteError, isSuccess:deleteSuccess, message:deleteMessage } = useSelector(state=>state.user.delete)
    const { pageLimit } = useSelector(state=>state.route)
    const pageNum = searchParams.get('page') ?? 1
    const searchKey = searchParams.get('search') ?? ''
    const dataWidth = ['50px','200px','200px','100px','100px','60px','60px']
    const closeConfirmModal = () => setShowConfirmModal(false)
    const closeEditModal = () => setShowEditModal(false)
    const openConfirmModal = () => setShowConfirmModal(true)
    const openEditModal = () => setShowEditModal(true)

    const isEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

    useEffect(()=>{
        if(deleteSuccess){
            setDeleteId('')
            dispatch(deleteReset())
            toast({description: 'Account deleted successfully.'})
            closeConfirmModal()
        }
    },[dispatch, deleteSuccess, toast])
    useEffect(()=>{
        if(editSuccess){
            dispatch(editReset())
            toast({description: 'Account detail updated.'})
            closeEditModal()
        }
    },[dispatch, editSuccess, toast])
    useEffect(()=>{  
        dispatch(getUsers({pageNum, pageLimit, searchKey}))
    },[dispatch, pageNum, pageLimit, searchKey])

    const handleEditUser = () => {
        if(editUserDetail.name === ''|| editUserDetail.email === '' || editUserDetail.userType === ''){
            toast({status:'warning', description:'Form not complete!'})
            return
        }
        if(!isEmail(editUserDetail.email)){
            toast({status:'warning', description:'Invalid email address!'})
            return
        }
        dispatch(editUser(editUserDetail))
    }
    
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
                    fontWeight={500}
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
                                    <IconButton 
                                        variant={'ghost'}
                                        size='xs'
                                        m={0}
                                        p={0}
                                        h='15px'
                                        _hover={{bg:'none'}}
                                        icon={<MdEditNote size='20' />} 
                                        onClick={()=>{
                                            setEditUserDetail({
                                                id: u._id,
                                                name: u.name,
                                                email: u.email,
                                                password: '',
                                                userType: u.userType
                                            })
                                            openEditModal()
                                        }}
                                    />
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
                                            openConfirmModal()
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
                isOpen={showEditModal} 
                closeOnOverlayClick={false}
                motionPreset='slideInBottom'
            >
                <ModalOverlay />
                <ModalContent>
                <ModalHeader p={3} fontSize={'medium'}>Edit User Detail</ModalHeader>
                <ModalCloseButton 
                    isDisabled={editLoading}
                    onClick={()=>{
                        dispatch(editReset())
                        closeEditModal()
                    }} 
                />
                <ModalBody mb={3} p={3}>
                    <Stack gap={3}>
                        {editError && <MyAlert message={editMessage} />}
                        <Input 
                            size='sm'
                            type='text'
                            isDisabled={editLoading}
                            id='edit-user-name'
                            value={editUserDetail.name}
                            onChange={({target})=>{
                                setEditUserDetail({...editUserDetail, name: target.value})
                            }}
                        />
                        <Input 
                            size='sm'
                            type='email'
                            isDisabled={editLoading}
                            id='edit-user-email'
                            value={editUserDetail.email}
                            onChange={({target})=>{
                                setEditUserDetail({...editUserDetail, email: target.value})
                            }}
                        />
                        <InputGroup size='sm'>
                            <Input 
                                size='sm'
                                type={show ? 'text' : 'password'}
                                isDisabled={editLoading}
                                placeholder="new password"
                                id='edit-user-password'
                                value={editUserDetail.password}
                                onChange={({target})=>{
                                    setEditUserDetail({...editUserDetail, password: target.value})
                                }}
                            />
                            <InputRightElement width='4rem'>
                                <Button 
                                    h='1.8rem' 
                                    w='3.8rem'
                                    isDisabled={editLoading}
                                    variant={'ghost'}
                                    size='sm'  
                                    borderRadius={0}
                                    onClick={()=>setShow(prev=>!prev)}
                                >
                                {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                            
                        <Select
                            size='sm'
                            isDisabled={editLoading}
                            //placeholder={editUserDetail.userType}
                            value={editUserDetail.userType}
                            id='edit-user-type'
                            onChange={({target})=>{
                                setEditUserDetail({...editUserDetail, userType: target.value})
                            }} 
                        >
                            <option value='bank'>bank</option>
                            <option value='admin'>admin</option>
                        </Select> 
                    </Stack>
                </ModalBody>
                <Divider />
                <ModalFooter p={3}>
                    <Button 
                        variant='ghost' 
                        onClick={()=>{
                            dispatch(editReset())
                            closeEditModal()
                        }} 
                        size='sm'
                        isDisabled={editLoading}
                    >
                        Cancel
                    </Button>
                    <Spacer />
                    <Button 
                        isLoading={editLoading}
                        loadingText='Saving'
                        variant='outline'
                        colorScheme="green"
                        size='sm'
                        onClick={()=>{
                            handleEditUser()
                        }}
                    >Save</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
            
            <Modal 
                isCentered
                size='xs'
                closeOnOverlayClick={false}
                motionPreset='slideInBottom' 
                isOpen={showConfirmModal} 
            >
                <ModalOverlay />
                <ModalContent p='4'>
                    {deleteError && <MyAlert message={deleteMessage} />}
                    <Flex>
                        <Button
                            onClick={()=>{
                                setDeleteId('')
                                dispatch(deleteReset())
                                closeConfirmModal()
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