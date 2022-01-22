import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { XMLHttpRequest } from 'xhr2';
import axios from 'axios';

@Injectable()
export class GithubOauthService {
  async githubAccessToken(code) {
    if (!code) {
      throw new HttpException('Invaid code', HttpStatus.BAD_REQUEST);
    }

    const token = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: code.code,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    console.log('token.data', token.data);

    const userProfile = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${token.data.access_token}`,
      },
    });

    console.log(userProfile.data);

    const userEmail = await axios.get('https://api.github.com/user/emails', {
      headers: {
        Authorization: `token ${token.data.access_token}`,
      },
    });

    console.log(userEmail.data);

    // Old but in fashion ways hehee
    // const userProfile = await this.getUserProfile(token.data.access_token);
    // const userEmail = await this.getUserEmail(token.data.access_token);
  }

  // curl -H "Authorization: token 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" https://api.github.com/user
  //   getUserProfile(access_token) {
  //     const xhr = new XMLHttpRequest();

  //     xhr.open('GET', 'https://api.github.com/user');

  //     xhr.setRequestHeader('Authorization', `token ${access_token}`);

  //     xhr.onreadystatechange = function () {
  //       console.log('xhr.readyState', xhr.readyState);
  //       if (xhr.readyState === 4) {
  //         console.log(xhr.status);
  //         console.log(xhr.responseText);
  //       }
  //     };

  //     xhr.send();

  //     return xhr.responseText;
  //   }

  //   getUserEmail(access_token): Promise<any> {
  //     const xhr = new XMLHttpRequest();

  //     xhr.open('GET', 'https://api.github.com/user/emails');
  //     xhr.setRequestHeader('Authorization', `token ${access_token}`);

  //     xhr.onreadystatechange = function () {
  //       console.log('ready state email', xhr.readyState);
  //       if (xhr.readyState === 4) {
  //         console.log(xhr.status);
  //         console.log(xhr.responseText);
  //       }
  //     };
  //     xhr.send();
  //     return xhr.responseText.toPromise();
  //   }
}
