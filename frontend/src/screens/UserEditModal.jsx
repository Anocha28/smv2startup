import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { MyAlert } from "../components"
import { Button, useToast, InputGroup, IconButton, InputRightElement, Spacer, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Divider, Input, Stack, Select } from "@chakra-ui/react"
import { editUser, editReset } from "../services/userSlice"
import { MdEditNote } from "react-icons/md"

const UserEditModal = ({user}) => {
    const dispatch = useDispatch()
    const toast = useToast()
    const [ editUserDetail, setEditUserDetail ] = useState({id:'',name:'',email:'',password:'',userType:''})
    const [ show, setShow ] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isLoading, isError, isSuccess, message } = useSelector(state=>state.user.edit)
    const isEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
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

    useEffect(()=>{
        if(isSuccess){
            onClose()
            dispatch(editReset())
        }
    },[isSuccess, dispatch, onClose])


    return (
        <>
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
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    password: '',
                    userType: user.userType
                })
                onOpen()
            }}
        />

        <Modal 
            isOpen={isOpen} 
            onClose={onClose}
            closeOnOverlayClick={false}
            motionPreset='slideInBottom'
        >
            <ModalOverlay />
            <ModalContent>
            <ModalHeader p={3} fontSize={'medium'}>Edit User Detail</ModalHeader>
            <ModalCloseButton 
                isDisabled={isLoading}
                onClick={()=>{
                    dispatch(editReset())
                    onClose()
                }} 
            />
            <ModalBody mb={3} p={3}>
                <Stack gap={3}>
                    {isError && <MyAlert message={message} />}
                    <Input 
                        size='sm'
                        type='text'
                        isDisabled={isLoading}
                        id='edit-user-name'
                        value={editUserDetail.name}
                        onChange={({target})=>{
                            setEditUserDetail({...editUserDetail, name: target.value})
                        }}
                    />
                    <Input 
                        size='sm'
                        type='email'
                        isDisabled={isLoading}
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
                            isDisabled={isLoading}
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
                                isDisabled={isLoading}
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
                        isDisabled={isLoading}
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
                        onClose()
                    }} 
                    size='sm'
                    isDisabled={isLoading}
                >
                    Cancel
                </Button>
                <Spacer />
                <Button 
                    isLoading={isLoading}
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
        </>
    )
}

export default UserEditModal