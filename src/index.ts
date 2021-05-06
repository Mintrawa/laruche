import assert from 'assert'
import { CONFIG, AUTH, POST_MSG, POST_DATA, REWARD_MSG, REWARD_DATA } from './interfaces'

import fs from 'fs-extra'
import path from 'path'

import { PrivateKey } from '@hiveio/dhive'
import { createHash } from 'crypto'

import { io } from 'socket.io-client'

const start = async (): Promise<void> => {
  try {
    /** config */
    const config: CONFIG = await fs.readJson(path.join(__dirname, './config/config.json'))
    assert(config && config.WSS, 'Config file ERROR')
    console.log(config)

    /** For handshake authentication */
    const auth: AUTH = {
      action:  'authentication',
      account: config.ACCOUNT,
      key:     'posting'
    }
    const key = PrivateKey.fromString(config.KEYS.posting)
    const signature = createHash('sha256').update(Buffer.from(auth.toString())).digest()
    auth.signature = key.sign(signature).toString()

    /** Try to connect */
    const ioClient = io(`${config.WSS}`, { transports: ['websocket'], upgrade: false, auth })

    /** On CONNECTED */
    ioClient.on('connect', () => {
      try {
        /** Join the POST room */
        const postMsg: POST_MSG = {
          action: 'join',
          data: {
            tags:      config.TAGS,
            community: config.COMMUNITIES,
            lang:      config.LANGS
          }
        }
        ioClient.emit('POST', postMsg)

        /** On message */
        ioClient.on('MSG', async (data: string) => {
          console.log(data)
        })

        /** On POST message */
        ioClient.on('POST', async (data: POST_DATA) => {
          console.log(data)
        })

        /** Join the REWARD room */
        const rewardMsg: REWARD_MSG = {
          action:   'join',
          accounts: config.ACCOUNTS
        }
        ioClient.emit('REWARD', rewardMsg)

        /** On REWARD message */
        ioClient.on('REWARD', async (data: REWARD_DATA) => {
          console.log(data)
        })
      } catch (e) {
        console.log('\x1b[31m%s\x1b[0m', `Error: ${e.msg ? e.msg : e.message}`)
        console.log('\x1b[33m%s\x1b[0m', 'Stack: ', e.stack ? e.stack : 'No info')
        ioClient.disconnect()
      }
    })

    /** On DISCONNECT */
    ioClient.on('disconnect', () => {
      console.log('\x1b[31m%s\x1b[0m', `Socket disconnected!`)
      ioClient.close()
      start()
    })
  } catch (e) {
    console.log('\x1b[31m%s\x1b[0m', `Error: ${e.msg ? e.msg : e.message}`)
    console.log('\x1b[33m%s\x1b[0m', 'Stack:', e.stack ? e.stack : 'No info')
  }
}
start()