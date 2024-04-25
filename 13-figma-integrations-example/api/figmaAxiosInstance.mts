import axios from 'axios'
import { FIGMA_ACCESS_TOKEN, FIGMA_BASE_URL } from '../constants.mjs'

const figmaRestApi = axios.create({
  baseURL: FIGMA_BASE_URL,
  headers: {
    'X-Figma-Token': FIGMA_ACCESS_TOKEN
  }
})

export default figmaRestApi
