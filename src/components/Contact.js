import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Stack,
  HStack,
  VStack,
  Box,
  StackDivider,
  Heading,
  Center,
  Spinner,
  Button,
} from '@chakra-ui/react'
import ResumePreview from './ResumePreview'
import ContactFormWithSocialButtons from './ContactForm/ContactForm'
import { useSe, useSearchParams } from 'react-router-dom'
import { getCV } from '../api/cv'
import { useResume } from '../Context'
import { getDataInformation } from '../utils'
import { getAllFilesApi, updateCsv } from '../api/contact'
import CustomTable from './CustomTable'
import moment from 'moment'
import { MdUpdate } from 'react-icons/md'

const Contact = () => {
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState([])

  const getAllFiles = async () => {
    setLoading(true)
    try {
      const res = await getAllFilesApi()
      setFiles(
        res.data.resp.files.map((e) => {
          console.log(e)
          return {
            ...e,
            creationTime: moment(e.creationTime).format('DD-MM-YYYY HH:mm:ss'),
          }
        })
      )
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)

      return
    }
  }
  useEffect(() => {
    getDataInformation()
    getAllFiles()
  }, [])
  const dataHeader = useMemo(() => {
    return [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Type', accessor: 'mime' },
      { Header: 'Size', accessor: 'size' },
      { Header: 'Creation Time', accessor: 'creationTime' },
    ]
  }, [])
  const handleUpdate = async () => {
    try {
      const res = await updateCsv()
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <VStack spacing={10} align="stretch" w={'70%'}>
          <Center>
            <Heading
              as="h4"
              size="lg"
              textAlign={'center'}
              color={'gray.700'}
              style={{ fontFamily: 'Poppins', marginBottom: '20px' }}
              fontWeight={'medium'}
            >
              List CSV
            </Heading>
          </Center>
          <Center>
            <Button
              w={'25%'}
              h={'37'}
              colorScheme="pink"
              leftIcon={<MdUpdate />}
              onClick={handleUpdate}
            >
              Update CSV
            </Button>
          </Center>

          <CustomTable size={'lg'} columns={dataHeader} data={files} />
        </VStack>
      )}
    </>
  )
}

export default Contact
