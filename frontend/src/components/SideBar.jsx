import { Box, Text, Center, Flex, Stack, useColorMode, Divider, Hide, Spacer } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './styles.module.css'
import { MdViewInAr, MdLibraryBooks, MdOutlinePersonPin, MdReceiptLong, MdPlayArrow, MdOutlinePeople } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'
import { updateRoute, setSearchKey } from '../services/routeSlice';

const SideBar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const sidebarbreakpoints = { sm:'70px', md:'120px', lg:'170px', xl:'220px'}
  const { colorMode } = useColorMode()
  const lightbg = '#5C8374'
  const darkbg = 'blackAlpha.600'
  const { current } = useSelector(state=>state.route)

  const MenuItem = ({name, link, icon}) => {
    return (
      <>
        <Box 
          className={`${styles.menuItem}`}
          ps={{sm:'20px', md: '25px', lg: '35px'}}
          onClick={()=>{
            dispatch(updateRoute(link))
            dispatch(setSearchKey(''))
            navigate(`./${link}`)
          }}
          // backgroundColor={current === link ? '#FAA1E4' : 'none'}
        >
          <Flex w={'100%'}>
            {icon}
            <Hide below='md'>
              <Text 
                ms={2}
                fontSize={{sm:'12px', md: '14px', lg: '16px'}}
                fontWeight={600}
              >{name}
              </Text>
            </Hide>
            <Spacer />
            {current === link && <MdPlayArrow size={25} />}
          </Flex>
        </Box>
        <Divider />
      </>
    )
  }

  MenuItem.propTypes = {
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired
  }

  const menuList = [
    {name: 'SHIPMENT', link: 'shipment', icon: <MdViewInAr size={25} />},
    {name: 'INVOICE', link: 'invoice', icon: <MdLibraryBooks size={25} />},
    {name: 'PAYMENT', link: 'payment', icon: <MdReceiptLong size={25} />},
    {name: 'SALES', link: 'sales', icon: <MdOutlinePersonPin size={25} />},
    {name: 'USER', link: 'user', icon: <MdOutlinePeople size={25} />},
  ]

  return (
    <Box 
      w={sidebarbreakpoints} 
      h='100vh' 
      bg={colorMode === 'light' ? lightbg : darkbg}
      boxShadow={'inner'}
      pos='fixed'
    >
      <Box h={'100px'}>
        <Center 
          textShadow='2px 3px #5C5470' 
          h='70px' 
          color='#FFF5E0' 
          fontSize={{sm:'xl', md: '2xl', lg: '3xl', xl: '4xl'}}
          fontWeight={'800'}
        >
          SMV2
        </Center>
      </Box>
        <Stack gap={0}>
          {menuList.map((m,i)=>(
            <MenuItem key={i} name={m.name} icon={m.icon} link={m.link} />
          ))}
        </Stack>
    </Box>
  )
}

export default SideBar