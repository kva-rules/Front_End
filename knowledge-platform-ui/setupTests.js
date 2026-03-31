import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'

globalThis.TextEncoder = globalThis.TextEncoder || TextEncoder
globalThis.TextDecoder = globalThis.TextDecoder || TextDecoder
