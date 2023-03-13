import { type AuthenticationError } from '@/domain/errors'
import { type AccessToken } from '@/domain/models'

export interface FacebookAuthentication {
  perform: (params: FacebookAuthentication.Params) => Promise<any>
}

export namespace FacebookAuthentication {
  export interface Params {
    token: string
  }

  export type Result = AccessToken | AuthenticationError
}
