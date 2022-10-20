import {
  Button,
  Center,
  Container,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
} from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { TreeSelect } from 'antd'

import { useToast } from '@chakra-ui/react'
import makeData from './makeData'
import CustomTable from './CustomTable'
import { getCSV, getDataInformation, searchInObject } from '../utils'
import _ from 'lodash'
import { SearchIcon } from '@chakra-ui/icons'
import { getAllFilesApi } from '../api/contact'
const { TreeNode } = TreeSelect

const Main = () => {
  const [dataHeader, setDataHeader] = useState([])
  const [loading, setLoading] = useState(false)
  const [dataCsv, setDataCsv] = useState([])
  const [files, setFiles] = useState([])
  const [dataInformation, setDataInformation] = useState([])
  const [currentFile, setCurrentFile] = useState('')
  const toast = useToast()
  // const columns = useMemo(() => dataHeader, [])
  const getDataCsvTable = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `http://dashboard.ulake.usth.edu.vn/api/object/${currentFile}/fileData`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access_token_csv')}`,
          },
        }
      )

      const rawResponse = await response.text()
      const dataFormat = getCSV(rawResponse)
      setDataHeader(
        dataFormat[0].map((d, i) => {
          return { Header: d, accessor: _.camelCase(d) }
        })
      )

      setDataCsv(
        makeData(
          dataFormat,
          dataFormat[0].map((d, i) => {
            return { Header: d, accessor: _.camelCase(d) }
          })
        )
      )
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error(error.response)
      return
    }
  }
  const getAllFiles = async () => {
    setLoading(true)
    try {
      const res = await getAllFilesApi()
      setFiles(res.data.resp.files)
      setCurrentFile(res.data.resp.files[0]?.id)

      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)

      return
    }
  }
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      if (!e.target.value) {
        getDataCsvTable()
        return
      }
      const data = [...dataCsv]
      console.log(data)
      setDataCsv([
        ...[dataCsv[0]],
        ...data?.filter((d) => searchInObject(d, e.target.value)),
      ])
    }
  }
  useEffect(() => {
    getDataInformation()
    getAllFiles()
  }, [])

  useEffect(() => {
    if (currentFile) getDataCsvTable()
  }, [currentFile])

  return (
    <Container minW={'full'} id="builder">
      {loading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        <>
          <Heading
            as="h4"
            size="lg"
            textAlign={'center'}
            color={'gray.700'}
            style={{ fontFamily: 'Poppins', marginBottom: '20px' }}
            fontWeight={'medium'}
          >
            USTH Rice Database
          </Heading>
          <Center mb="30px">
            <InputGroup w="50%" size="md">
              <Input
                variant="filled"
                pr="4.5rem"
                type={'text'}
                placeholder="Enter Keyword"
                onKeyPress={handleSearch}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm">
                  <SearchIcon />
                </Button>
              </InputRightElement>
            </InputGroup>
            <TreeSelect
              treeLine={true}
              style={{ width: 300, position: 'absolute', right: '10px' }}
              placeholder="Choose File"
              value={currentFile}
              onChange={(fileId) => {
                setCurrentFile(fileId)
              }}
            >
              {files.map((file) => (
                <TreeNode value={file.id} title={file.name}></TreeNode>
              ))}
            </TreeSelect>
          </Center>
          <CustomTable size={'sm'} columns={dataHeader} data={dataCsv} />;
        </>
      )}
    </Container>
  )
}

export default Main
