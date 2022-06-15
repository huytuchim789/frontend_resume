import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Stack, HStack, VStack, Box, StackDivider } from '@chakra-ui/react'
import ResumePreview from './ResumePreview'
import ContactFormWithSocialButtons from './ContactForm/ContactForm'
import { useSe, useSearchParams } from 'react-router-dom'
import { getCV } from '../api/cv'
import { useResume } from '../Context'
const Contact = () => {
  let [searchParams] = useSearchParams()

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
  } = useResume()
  useEffect(() => {
    const getCVApi = async () => {
      //   console.log(searchParams.get('email'))
      const res = await getCV(searchParams.get('email'))
      const { user, theme, about, educationList, skills, workList, projects } =
        res.data[0]
      console.log(res.data)
      setAbout(about)
      setTheme(theme)
      setEducationList(educationList)
      setSkills(skills)
      setWorkList(workList)
      setProjects(projects)
    }
    getCVApi()
  }, [])
  return (
    <HStack spacing={10} align="stretch">
      <ContactFormWithSocialButtons />
      <ResumePreview preview />
    </HStack>
  )
}

export default Contact
