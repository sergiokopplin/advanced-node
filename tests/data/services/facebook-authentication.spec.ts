import { type LoadFacebookUserApi } from '@/data/contracts/apis'
import { FacebookAuthenticationService } from '@/data/services'
import { AuthenticationError } from '@/domain/errors'

import { mock } from 'jest-mock-extended'

describe('FacebookAuthenticationService', () => {
  test('Should call LoadFacebookApi with correct params', async () => {
    const loadFacebookApi = mock<LoadFacebookUserApi>()

    const sut = new FacebookAuthenticationService(loadFacebookApi)
    await sut.perform({ token: 'any_token' })

    expect(loadFacebookApi.loadUser).toHaveBeenCalledWith({ token: 'any_token' })
    expect(loadFacebookApi.loadUser).toHaveBeenCalledTimes(1)
  })

  test('Should return AuthenticationError when LoadFacebookUserApi returns undefined', async () => {
    const loadFacebookApi = mock<LoadFacebookUserApi>()
    loadFacebookApi.loadUser.mockResolvedValueOnce(undefined)

    const sut = new FacebookAuthenticationService(loadFacebookApi)
    const authResult = await sut.perform({ token: 'any_token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
