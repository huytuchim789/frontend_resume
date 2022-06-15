import { IconButton } from '@chakra-ui/button'
import {
  Stack,
  Flex,
  Heading,
  Spacer,
  HStack,
  Text,
  Button,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react'
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa'
import React, { useEffect } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { gapi } from 'gapi-script'
import { login } from '../../api/login'
import { useResume } from '../../Context'
import { useNavigate } from 'react-router'

const Navbar = () => {
  const { user, setUser } = useResume()
  const navigate = useNavigate()
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_CLIENT_ID,
        scope: 'email',
      })
    }

    gapi.load('client:auth2', start)
  }, [])
  const responseSuccessGoogle = async (response) => {
    console.log(response)
    try {
      const responseLogin = await login(response)
      const { user, token } = responseLogin.data
      localStorage.setItem('user', JSON.stringify({ userInfo: user, token }))
      setUser(user)
    } catch (err) {
      console.log(err)
    }
  }
  const responseFailGoogle = (response) => {
    console.log(response)
  }
  const responseSuccessGoogleLogout = (response) => {
    localStorage.removeItem('user')
    navigate('/', { replace: true })
    navigate(0)
  }
  const responseFailGoogleLogout = (res) => {
    console.log(res)
  }
  return (
    <Stack p={5} bg={'gray.50'} as="header" width="100%">
      <Flex w="full" alignItems={'center'}>
        <Heading
          as="h3"
          ml={{ base: 0, sm: 8 }}
          size="lg"
          fontWeight={'thin'}
          color="purple.500"
          style={{ fontFamily: 'Pacifico' }}
        >
          <Text as="a" href="/">
            Thuy Loi University
          </Text>
        </Heading>
        <Spacer></Spacer>
        <HStack
          spacing={10}
          mr={{ base: 0, sm: 8 }}
          as="nav"
          style={{ fontFamily: 'Poppins' }}
        >
          <Text as="a" href="/" fontSize="lg">
            Home
          </Text>
          <Text as="a" href="myCV" fontSize="lg">
            My CV
          </Text>
          <Text as="a" href={`/contact?email=${user?.email}`} fontSize="lg">
            Contact
          </Text>

          {user ? (
            <Menu>
              <MenuButton>
                <Avatar name={user.name} src={user.picture} />
              </MenuButton>
              <MenuList>
                <MenuGroup title="Profile">
                  <GoogleLogout
                    clientId={process.env.REACT_APP_CLIENT_ID}
                    onLogoutSuccess={responseSuccessGoogleLogout}
                    onScriptLoadFailure={responseFailGoogleLogout}
                    render={(renderProps) => (
                      <MenuItem
                        disabled={renderProps.disabled}
                        onClick={renderProps.onClick}
                      >
                        Log out
                      </MenuItem>
                    )}
                  />
                </MenuGroup>
              </MenuList>
            </Menu>
          ) : (
            <GoogleLogin
              clientId={process.env.REACT_APP_CLIENT_ID}
              onSuccess={responseSuccessGoogle}
              onFailure={responseFailGoogle}
              cookiePolicy={'single_host_origin'}
              render={(renderProps) => (
                <Button
                  disabled={renderProps.disabled}
                  onClick={renderProps.onClick}
                  colorScheme={'purple'}
                  fontWeight={'medium'}
                >
                  Login
                </Button>
              )}
            />
          )}
        </HStack>
      </Flex>
    </Stack>
  )
}

export default Navbar
