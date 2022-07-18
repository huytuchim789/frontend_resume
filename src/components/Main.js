import {
  Box,
  Container,
  Stack,
  Text,
  HStack,
  Heading,
  Button,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import Builder from './Builder'
import ResumePreview from './ResumePreview'
import ThemeSelect from './Theme/ThemeSelect'
import { useReactToPrint } from 'react-to-print'
import { useResume } from '../Context'
import { MdOutlineFileDownload, MdSave } from 'react-icons/md'
import html2canvas from 'html2canvas'
import { addCV, myCVs } from '../api/cv'
import { useToast } from '@chakra-ui/react'
const Main = () => {
  const toast = useToast()

  useEffect(() => {
    const myCVApi = async () => {
      const response = await myCVs()
      const {
        educationList,
        image,
        projects,
        skills,
        theme,
        user,
        workList,
        about,
        _id,
        personality,
      } = response.data[0]
      // console.log(response.data)
      setAbout(about)
      setTheme(theme)
      setEducationList(educationList)
      setSkills(skills)
      setWorkList(workList)
      setProjects(projects)
      setPersonality(personality)
    }
    myCVApi()
  }, [])
  const dataURItoBlob = (dataURI) => {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1])
    else byteString = unescape(dataURI.split(',')[1])
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length)
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }
    return new Blob([ia], { type: mimeString })
  }
  const {
    printElem,
    user,
    setUser,
    theme,
    setTheme,
    about,
    setAbout,
    educationList,
    setEducationList,
    skills,
    setSkills,
    workList,
    setWorkList,
    projects,
    setProjects,
    personality,
    setPersonality,
  } = useResume()

  const handlePrint = useReactToPrint({
    content: () => printElem.current,
  })
  const save = async () => {
    console.log({
      printElem,
      user,
      theme,
      about,
      educationList,
      skills,
      workList,
      projects,
    })
    const canvas = await html2canvas(printElem.current)
    const image = canvas.toDataURL('image/png', 0.2)
    const data = new FormData()
    about.image = image
    data.append('user', JSON.stringify(user))
    data.append('theme', JSON.stringify(theme))
    data.append('about', JSON.stringify(about))
    data.append('educationList', JSON.stringify(educationList))
    data.append('workList', JSON.stringify(workList))
    data.append('projects', JSON.stringify(projects))
    data.append('skills', JSON.stringify(skills))
    data.append('image', image)
    try {
      const response = await addCV(data)
      toast({
        title: 'Saved',
        description: "We've save your CV for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: 'Cant save',
        description: error,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      console.log(error)
    }
  }
  return (
    <Container bg={'gray.50'} minW={'full'} id="builder">
      <Heading
        as="h4"
        size="lg"
        textAlign={'center'}
        color={'gray.700'}
        style={{ fontFamily: 'Poppins' }}
        fontWeight={'medium'}
      >
        Builder Dashboard
      </Heading>

      <Container maxW={'7xl'} px={8}>
        <Stack
          justifyContent={'space-between'}
          pt={4}
          direction={{ base: 'column', sm: 'row' }}
        >
          <ThemeSelect />
          <Stack
            justifyContent={'center'}
            direction={{ base: 'column', sm: 'row' }}
          >
            <Button
              rightIcon={<MdOutlineFileDownload />}
              onClick={handlePrint}
              colorScheme={'purple'}
            >
              Download
            </Button>
            {user ? (
              <Button
                rightIcon={<MdSave />}
                onClick={save}
                colorScheme={'blue'}
              >
                Save
              </Button>
            ) : (
              <></>
            )}
          </Stack>
        </Stack>
      </Container>

      <Stack
        direction={{ base: 'column', md: 'row' }}
        // mt={16}
        gap={4}
        mx={{ base: 2, md: 12 }}
        my={8}
        alignItems={'flex-start'}
        justifyContent={'space-between'}
      >
        <Builder />
        <ResumePreview />
      </Stack>
    </Container>
  )
}

export default Main
