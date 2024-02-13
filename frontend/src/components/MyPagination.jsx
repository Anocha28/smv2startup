import { useState } from "react"
import { Flex, Button, Box, Select, Center, Input, useToast } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { useNavigate, useSearchParams } from "react-router-dom"
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { useColorMode } from "@chakra-ui/react"
import { MdFirstPage, MdLastPage, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

const MyPagination = ({path, searchKey, page, pageTotal}) => {
    const navigate = useNavigate()
    const toast = useToast()
    const { colorMode } = useColorMode()
    const [ searchParams ] = useSearchParams()
    const [ pageNum, setPageNum ] = useState(searchParams.get('page') ?? 1)
    const { pageLimit } = useSelector(state=>state.route)
    const PageButton = ({p, dl, dr}) => (
        <Button
            borderRadius={50}
            size='sm'
            mr={1}
            p={1}
            variant={'outline'}
            bg={page === p ? colorMode === 'light' ? '#5C8374' : 'blue.700' : 'none'}
            color={page === p ? '#fff5e0' : 'none'}
            onClick={()=>navigate(`/${path}?page=${p}&search=${searchKey}`)}
            _hover={{borderColor: colorMode === 'light' ? 'blackAlpha.500' : 'gray.500'}}
        >{dl ? <ChevronLeftIcon /> : dr ? <ChevronRightIcon /> : p}</Button>
    )

    const handleOnClick = (pn) => {
        //console.log(typeof pageNum, pageNum, page, pn)
        setPageNum(pn)
        navigate(`/${path}?page=${pn}&search=${searchKey}`)
    }

    if(pageTotal <= 5) {
        return (
            <Flex justifyContent={'center'} mt='5'>
                {[...Array(pageTotal).keys()].map(p=>(
                    <PageButton key={p} p={p+1} />
                ))}
            </Flex>
        )
    }  

    return (
        <Box w={'100%'} display={'flex'} justifyContent={'space-between'} mt='5'>
            <Flex >
                <Center fontSize={'sm'} mr='2' fontWeight={300}>Rows per page </Center>
                <Select id='page-limit' placeholder={pageLimit} size='sm' fontSize='sm' w='80px' h='30px' mr='2'>
                    <option>{pageLimit}</option>
                    <option>100</option>
                    <option>200</option>
                </Select>
                <Center fontSize={'sm'} fontWeight={300}>1-{pageLimit} of {pageTotal*pageLimit} rows</Center>
            </Flex>
            
            <Flex>
                <Button
                    variant={'ghost'}
                    size='sm'
                    p='0'
                    isDisabled={page === 1}
                    onClick={()=>handleOnClick(1)}
                ><MdFirstPage size='20' /></Button>
                <Button
                    variant={'ghost'}
                    size='sm'
                    p='0'
                    isDisabled={page === 1}
                    onClick={()=>handleOnClick(page-1)}
                ><MdKeyboardArrowLeft size='20' /></Button>
                <Input 
                    size='sm'
                    w='50px'
                    id='page-number'
                    value={pageNum}
                    mx='2'
                    py='0'
                    px='1'
                    maxLength={4}
                    textAlign={'center'}
                    onChange={({target})=>{
                        setPageNum(target.value.replace(/\D/,''))
                    }}
                    onKeyDown={(e)=>{
                        if(e.key==='Enter'){
                            const pn = +e.target.value
                            if(pn > pageTotal || pn < 1){
                                toast({description:'Invalid page number.', status: 'warning'})
                                return
                            }
                            handleOnClick(e.target.value)
                        }
                    }}
                />
                <Center fontSize={'sm'} mr='2'> of {pageTotal}</Center>
                <Button
                    variant={'ghost'}
                    size='sm'
                    p='0'
                    isDisabled={page === pageTotal}
                    onClick={()=>handleOnClick(page+1)}
                ><MdKeyboardArrowRight size='20' /></Button>
                <Button
                    variant={'ghost'}
                    size='sm'
                    p='0'
                    isDisabled={page === pageTotal}
                    onClick={()=>handleOnClick(pageTotal)}
                ><MdLastPage size='20' /></Button>
            </Flex>
    
        </Box>
    )
}

export default MyPagination