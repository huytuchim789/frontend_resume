import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useToast } from '@chakra-ui/react'

const ResumeContext = createContext()

export const useResume = () => useContext(ResumeContext)

export const ResumeProvider = ({ children }) => {
  const printElem = useRef()
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [theme, setTheme] = useState('purple.400')
  console.log()
  const [user, setUser] = useState(
    //user info of gmail
    JSON.parse(localStorage.getItem('user'))?.userInfo
  )

  //info of CVs
  const [about, setAbout] = useState({
    name: '',
    role: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    picture: '',
  })

  const [educationList, setEducationList] = useState([
    {
      id: '',
      degree: '',
      school: '',
      startYr: 0,
      endYr: 0,
      grade: '',
    },
  ])

  const [skills, setSkills] = useState([
    {
      id: 1,
      name: 'JavaScript',
    },
    {
      id: 2,
      name: 'ReactJS',
    },
    {
      id: 3,
      name: 'NodeJS',
    },
    {
      id: 4,
      name: 'MongoDB',
    },
    {
      id: 5,
      name: 'ExpressJS',
    },
    {
      id: 6,
      name: 'PHP',
    },
    {
      id: 7,
      name: '.Net',
    },
    {
      id: 8,
      name: 'Java',
    },
    {
      id: 9,
      name: 'RestAPI',
    },
    {
      id: 10,
      name: 'jQuery',
    },
    {
      id: 11,
      name: 'MySQL',
    },
    {
      id: 12,
      name: 'Ajax',
    },
    {
      id: 13,
      name: 'GitHub',
    },
    {
      id: 14,
      name: 'HTML',
    },
    {
      id: 15,
      name: 'CSS',
    },
    {
      id: 16,
      name: 'TailwindCSS',
    },
    {
      id: 17,
      name: 'Bootstrap',
    },
  ])

  const [workList, setWorkList] = useState([
    {
      id: '',
      position: '',
      company: '',
      type: '',
      startDate: '',
      endDate: '',
      description: '',
    },
  ])

  const [projects, setProjects] = useState([
    {
      id: '',
      name: '',
      description: '',
      url: '',
    },
  ])
  const [personality, setPersonality] = useState({
    eyebrows: {
      type: 'Straight',
      analysis:
        'Usually with great perseverance and courage. People with thick straight eyebrows are often strong-willed, courageous and stern. People with thin straight eyebrows are often clever, talented and shrewd.',
    },
    eyes: {
      type: 'Big',
      analysis:
        'Kind and compassionate, can be good friends to talk with. Good understanding of movie and arts, sometime overwhelmed by emotions.',
    },
    nose: {
      type: 'Small',
      analysis:
        'People with small noses are thoughtful and sensitive, have a conservative and peaceful personality, hesitate to act, have less ambition, and are relatively flat in middle age. Men must work harder at work, and women are slightly delayed in marriage some.',
    },
    mouth: {
      type: 'Thick',
      analysis:
        'Passionate and warm-hearted, emphasizing sensory stimuli, doing things practically and resentful, and less likely to use tricks.',
    },
    face: {
      type: 'Oval',
      analysis:
        'More likely to have better improvement in their careers. They also spend more money and pay attention to quality of life.',
    },
  })
  // useEffect(() => {
  //     toast({
  //         title: `${theme.split(".", 1)} selected`,
  //         status: 'success',
  //         isClosable: true,
  //       })
  // }, [theme]);

  const value = {
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
    printElem,
    theme,
    setTheme,
    user,
    setUser,
    loading,
    setLoading,
    personality,
    setPersonality,
  }

  return (
    <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
  )
}
