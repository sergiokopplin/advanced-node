import { FacebookAuthenticationService } from '@/data/services'
import { AuthenticationError } from '@/domain/errors'

describe('FacebookAuthenticationService', () => {
  test('Should call LoadFacebookApi with correct params', async () => {
    const loadFacebookApi = {
      loadUser: jest.fn()
    }
    const sut = new FacebookAuthenticationService(loadFacebookApi)

    await sut.perform({ token: 'any_token' })

    expect(loadFacebookApi.loadUser).toHaveBeenCalledWith({ token: 'any_token' })
    expect(loadFacebookApi.loadUser).toHaveBeenCalledTimes(1)
  })

  test('Should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
    const loadFacebookApi = {
      loadUser: jest.fn()
    }
    loadFacebookApi.loadUser.mockResolvedValueOnce(undefined)
    const sut = new FacebookAuthenticationService(loadFacebookApi)

    const authResult = await sut.perform({ token: 'any_token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
