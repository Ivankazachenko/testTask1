import { config, utils } from '#app..js'

import { JWT } from 'google-auth-library'

const { email, key, scopes } = config.googleSheet

export const auth = new JWT({ email, key, scopes })