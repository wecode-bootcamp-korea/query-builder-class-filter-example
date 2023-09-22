const request = require('supertest');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const { createApp } = require('../app');
const dataSource = require('../api/models/dataSource');

describe('Kakao Login', () => {
  let app;

  beforeAll(async () => {
    app = createApp();
    await dataSource.initialize();
  });

  afterAll(async () => {
    await dataSource.query('SET FOREIGN_KEY_CHECKS=0');
    await dataSource.query('TRUNCATE users');
    await dataSource.query('SET FOREIGN_KEY_CHECKS=1');
    await dataSource.destroy();
  });

  test('SUCCESS: Create User', async () => {
    const MOCK_DATA = {
      data: {
        id: 2021031018,
        connected_at: '2021-12-05T12:29:37Z',
        properties: {
          nickname: '장호준',
          profile_image:
            'http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg',
          thumbnail_image:
            'http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_110x110.jpg',
        },
        kakao_account: {
          profile_nickname_needs_agreement: false,
          profile_image_needs_agreement: false,
          profile: [Object],
          has_email: true,
          email_needs_agreement: false,
          is_email_valid: true,
          is_email_verified: true,
          email: 'jun960429@naver.com',
          has_gender: true,
          gender_needs_agreement: false,
          gender: 'male',
        },
      },
    };

    // TODO: multiple mocking values
    axios.get = jest.fn().mockReturnValue(MOCK_DATA);

    const result = await request(app)
      .get('/users/kakao-login')
      .set({ Authorization: 'accessToken' });

    // 로그인 성공 시 token은 테스트 할 필요가 없다.
    // result._body의 값이 json response
    // result.text의 값은 String
    expect(JSON.parse(result.text).message).toEqual('SUCCESS');

    // status & statusCode 둘 다 201로 나온다.
    expect(result.status).toEqual(201);
    expect(result.statusCode).toEqual(201);
  });
});
