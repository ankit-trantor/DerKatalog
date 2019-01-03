export default {
    discogs: {
      oauth: {
        key: 'ogAMWXpwMuscOJcgfFNB',
        secret: 'ksbrydmyjgqMemWVmBfjWFLqNJDrkOAL',
        request_token_url: 'https://api.discogs.com/oauth/request_token',
        authorize_url: 'https://discogs.com/oauth/authorize?oauth_token=',
        access_token_url: 'https://api.discogs.com/oauth/access_token',
        callback_url: 'exp://xv-e6n.garth.derkatalog.exp.direct:80',
      },
      api_url: 'https://api.discogs.com/',
      endpoints: {
        folders: 'users/{username}/collection/folders',
        folder: 'users/{username}/collection/folders/{id}/releases',
        identity: 'oauth/identity',
        user: 'users/{username}'
      },
      records_per_page: 20,
    },
    app_user_agent: 'DerKatalog/0.1',
    storage_app_id: '@DerKatalog:',
  };
