import { AuthenticationError } from '@/domain/errors'
import { type FacebookAuthentication } from '@/domain/features'

class FacebookAuthenticationService {
  constructor (
    private readonly loadFacebookUserApi: LoadFacebookUserApi
  ) {}

  async perform (params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    await this.loadFacebookUserApi.loadUser(params)
    return new AuthenticationError()
  }
}

interface LoadFacebookUserApi {
  loadUser: (params: LoadFacebookUserApi.Params) => Promise<LoadFacebookUserApi.Result>
}

namespace LoadFacebookUserApi {
  export type Params = {
    token: string
  }

  export type Result = undefined
}

class LoadFacebookUserApiSpy implements LoadFacebookUserApi {
  token?: string
  result: undefined

  async loadUser (params: LoadFacebookUserApi.Params): Promise<LoadFacebookUserApi.Result> {
    this.token = params.token
    return this.result
  }
}

describe('FacebookAuthenticationService', () => {
  test('Should call LoadFacebookApi with correct params', async () => {
    const loadFacebookApi = new LoadFacebookUserApiSpy()
    const sut = new FacebookAuthenticationService(loadFacebookApi)

    await sut.perform({ token: 'any_token' })

    expect(loadFacebookApi.token).toBe('any_token')
  })

  test('Should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
    const loadFacebookApi = new LoadFacebookUserApiSpy()
    loadFacebookApi.result = undefined
    const sut = new FacebookAuthenticationService(loadFacebookApi)

    const authResult = await sut.perform({ token: 'any_token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})