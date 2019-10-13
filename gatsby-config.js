module.exports = {
  plugins: [
    {
      resolve: '@greatgatsbyjs/gatsby-theme-ggt-material-ui-blog',
      options: {
        siteMetadata: {
          author: `@bharath`, // author for each post in the rss feed
          avatarImgSrc: 'https://avatars3.githubusercontent.com/u/23705200?s=460&v=4', // the 60x60 avatar image for the homepage bio
          bioLineOne: 'Code what pleases you!', // the first line of the bio card on the home page
          bioLineTwo: '', // the second line of the bio card on the home page
          copyright: 'Bharath LLC', // the text shown on the bottom left of the footer
          description: 'Tech Ramblings', // description of your site for your rss feed
          gATrackingID: 'GA-xxxxx', // google analytics tracking id
          icon: '/static/logo-256.png', // the icon used for your fav and manifest icon. 512px would be best
          manifest: {
            backgroundColor: '#e0e0e0',
              shortName: 'GGT Material UI Blog', // The shortname used in the manifest for offline capabilities
              themeColor: '#0D47A1'
          },
          theme: {
            primary: '#000',
            secondary: '#eee'
            // primary: '#bdbdbd',
            // secondary: '#616161'
          },
          title: `Bharath`,
          tagline: 'Everwhimsical Developer'
        }
      }
    }
  ]
};
