// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Hands on React',
  tagline: 'The best way to learn React',
  url: 'https://handsonreact.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'craigmckeachie',
  projectName: 'handsonreact.com',
  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        googleAnalytics: {
          trackingID: 'G-T76XX1J3DR',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Hands on React',
        logo: {
          alt: 'React Logo',
          src: 'https://user-images.githubusercontent.com/1474579/98455653-856c7300-2141-11eb-9bf2-090d7d7e4d00.png',
        },
        items: [
          {
            type: 'doc',
            docId: '01-01-WhyReact',
            activeBasePath: 'docs',
            label: 'Course',
            position: 'left',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Labs',
            items: [
              {
                label: 'Labs (JavaScript)',
                to: 'docs/labs/react-tutorial-javascript',
              },
              {
                label: 'Labs (TypeScript)',
                to: 'docs/labs/react-tutorial-typescript',
              },
            ],
          },
          // {
          //   title: 'Community',
          //   items: [
          //     {
          //       label: 'Twitter',
          //       href: 'https://twitter.com/cmckeachie',
          //     },
          //     {
          //       label: 'YouTube',
          //       href: 'https://www.youtube.com/channel/UCxJG7GwhiI3lI7pn_HuBLgw?sub_confirmation=1',
          //     },
          //   ],
          // },
          {
            title: 'Links',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/craigmckeachie/handsonreact',
              },
            ],
          },
        ],
        copyright: `<br/><br/> 
        <section style="font-size: 85%"">
            <div className="container">
              <div className="row">
                <p>
                   The content on this site is available for private, non-commercial use under
                  <a href="http://www.gnu.org/licenses/gpl-3.0-standalone.html">
                    GPL version 3
                  </a>.
                  <br/> 
                  If you would like to use this material to conduct your
                  own training or workshop, please contact us at
                  <a href="https://www.funnyant.com/contact">funnyant.com</a>.
                  <br/>
                  Copyright © ${new Date().getFullYear()} Funny Ant, LLC. All rights reserved.
                </p>
              </div>
            </div>
          </section>
       `,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
