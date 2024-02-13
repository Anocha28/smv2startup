import { Outlet } from "react-router-dom"
import Header from "./Header"
import { Box, Flex } from "@chakra-ui/react"
import SideBar from "./SideBar"

const Layout = () => {
  return (
    <Flex pos='relative'>

      <Box pos={'absolute'} zIndex={1000}>
        <SideBar />
      </Box>

      <Box 
        flex='1' 
        marginLeft={{ sm:'70px', md:'120px', lg:'170px', xl:'220px'}} 
        pos='relative'
      > 
        <Box 
          h={'70px'} 
          w={'100%'} 
          pos='fixed' 
          paddingRight={{ sm:'70px', md:'120px', lg:'170px', xl:'220px'}}
          
          zIndex={900}
        > 
          <Header />
        </Box> 
         
        <Box px={3} pt='90px' pb='50px'>
          <Outlet />
        </Box>
      </Box>

    </Flex> 
  )
}

export default Layout

{/* <Flex>
  <Box position={'fixed'} >
    <SideBar />
  </Box>
  <Box flex='1' pos='relative' marginLeft={{ sm:'70px', md:'120px', lg:'170px', xl:'220px'}}>     
    <Header />
    <Box p={3}>
      <Outlet />
    </Box>
  </Box>
</Flex>   */}