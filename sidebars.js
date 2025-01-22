// /**
//  * Creating a sidebar enables you to:
//  - create an ordered group of docs
//  - render a sidebar for each doc of that group
//  - provide next/previous navigation

//  The sidebars can be generated from the filesystem, or explicitly defined here.

//  Create as many sidebars as you want.
//  */

// // @ts-check

// /** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
// const sidebars = {
//   // By default, Docusaurus generates a sidebar from the docs folder structure
//   tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

//   // But you can create a sidebar manually
//   /*
//   tutorialSidebar: [
//     'intro',
//     'hello',
//     {
//       type: 'category',
//       label: 'Tutorial',
//       items: ['tutorial-basics/create-a-document'],
//     },
//   ],
//    */
// };

// module.exports = sidebars;

module.exports = {
  someSidebar: {
    Fundamentals: [
      '01-00-WhatIsReact',
      '01-01-WhyReact',
      '01-02-Comparison',
      '01-03-Architecture',
      'ComputerSetup',
      'VisualStudioCodeSetup',
      'Elements',
      'JSX',
      'VirtualDOM',
      'Components',
      'A6-ProjectSetup',
      {
        'Labs A': [
          {
            JavaScript: [
              'labs/js/Introduction',
              'labs/js/CreatingNewProject',
              'labs/js/RunningYourProject',
              'labs/js/StylesUsingCSS',
              'labs/js/YourFirstComponent',
              'labs/js/CreatingDataStructures',
            ],
            TypeScript: [
              'labs/ts/Introduction',
              'labs/ts/CreatingNewProject',
              'labs/ts/RunningYourProject',
              'labs/ts/StylesUsingCSS',
              'labs/ts/YourFirstComponent',
              'labs/ts/CreatingDataStructures',
            ],
          },
        ],
      },
      'A8-CodeOrganizationConventions',
      'Props',
      'A10-PropTypes',
      'A11-ReactTypeScript',
      'Lists',
      'Events',
      {
        'Labs B': [
          {
            JavaScript: [
              'labs/js/PassingDataToComponent',
              'labs/js/DisplayingListData',
              'labs/js/MoreReusableComponents',
              'labs/js/RespondingToEvent',
              'labs/js/CreatingForm',
            ],
            TypeScript: [
              'labs/ts/PassingDataToComponent',
              'labs/ts/DisplayingListData',
              'labs/ts/MoreReusableComponents',
              'labs/ts/RespondingToEvent',
              'labs/ts/CreatingForm',
            ],
          },
        ],
      },
      'Hooks',
      'State',
      'SideEffectsLifecyle',
      'ConditionalRendering',
      'ComponentArchitecture',
      'A22-Debugging',
      {
        'Labs C': [
          {
            JavaScript: [
              'labs/js/CommunicatingChildToParentComponent',
              'labs/js/HidingShowingComponents',
              'labs/js/MoreComponentCommunication',
              'labs/js/MultipleLevelComponentCommunication',
            ],
            TypeScript: [
              'labs/ts/CommunicatingChildToParentComponent',
              'labs/ts/HidingShowingComponents',
              'labs/ts/MoreComponentCommunication',
              'labs/ts/MultipleLevelComponentCommunication',
            ],
          },
        ],
      },
      'Forms',
      '13.1-ReactHookForm',
      'A7-BackendAPISetup',
      'HTTP',
      {
        'Labs D': [
          {
            JavaScript: [
              'labs/js/FormValuesToState',
              'labs/js/FormValidation',
              'labs/js/SetupBackendRESTAPI',
              'labs/js/HTTP-GET',
              'labs/js/HTTP-PUT',
            ],
            TypeScript: [
              'labs/ts/FormValuesToState',
              'labs/ts/FormValidation',
              'labs/ts/SetupBackendRESTAPI',
              'labs/ts/HTTP-GET',
              'labs/ts/HTTP-PUT',
            ],
          },
        ],
      },
      'Routing',
      'BuildDeploy',
      {
        'Labs E': [
          {
            JavaScript: [
              'labs/js/RouterBasics',
              'labs/js/RouteParameters',
              'labs/js/BuildAndDeploy',
            ],
            TypeScript: [
              'labs/ts/RouterBasics',
              'labs/ts/RouteParameters',
              'labs/ts/BuildAndDeploy',
            ],
          },
        ],
      },
    ],
    Advanced: [
      'CustomHooks',
      'A17-OtherHooks',
      'A13-Context',
      'A25-StateManagement',
      'ReactQuery',
      'Testing',
      'A13-RenderProps',
      'A13-HigherOrderComponents',
      'A16-Security',
      'A23-Performance',
      'A9-Styling',
      'A27-ReactServerComponents',
    ],
    Redux: [
      'Redux',
      'ReactRedux',
      'ReduxThunk',
      'ReactReduxThunk',
      'A12-ReduxTypeScript',
    ],
    Foundation: [
      'A1-PackageManager',
      'A2-CompilerSetup',
      'A3-ModernJavaScript',
      'A4-TypeScript',
      'A5-Promises',
      'A3-ECMAScriptReact',
      'F01-CSSGrid',
      'F02-FlexBox',
    ],
    Resources: ['A24-UIComponents', 'A20-Resources'],
    Labs: [
      {
        JavaScript: [
          'labs/js/Introduction',
          'labs/js/CreatingNewProject',
          'labs/js/RunningYourProject',
          'labs/js/StylesUsingCSS',
          'labs/js/YourFirstComponent',
          'labs/js/CreatingDataStructures',
          'labs/js/PassingDataToComponent',
          'labs/js/DisplayingListData',
          'labs/js/MoreReusableComponents',
          'labs/js/RespondingToEvent',
          'labs/js/CreatingForm',
          'labs/js/CommunicatingChildToParentComponent',
          'labs/js/HidingShowingComponents',
          'labs/js/MoreComponentCommunication',
          'labs/js/MultipleLevelComponentCommunication',
          'labs/js/FormValuesToState',
          'labs/js/FormValidation',
          'labs/js/SetupBackendRESTAPI',
          'labs/js/HTTP-GET',
          'labs/js/HTTP-PUT',
          'labs/js/RouterBasics',
          'labs/js/RouteParameters',
          'labs/js/21a-RouterTransitions',
          'labs/js/21b-SplashScreen',
          'labs/js/21c-SkeletonScreens',
          'labs/js/BuildAndDeploy',
          'labs/js/CustomHooks',
          'labs/js/ReactQuery',
          'labs/js/T1-FirstComponentTests',
          'labs/js/T2-SnapshotTests',
          'labs/js/T3-MoreTestingComponents',
          'labs/js/T4-NestedComponents',
          'labs/js/T5-ContainerComponents',
          'labs/js/T6-TestingForms',
          'labs/js/T7-ActionTests',
          'labs/js/T8-ReducerTests',
          'labs/js/T9-APITests',
          'labs/js/R1-ReduxInstall',
          'labs/js/R2-ReduxActionsReducer',
          'labs/js/R3-ReduxWithReact',
          'labs/js/A1-SkippingLabs',
          {
            type: 'link',
            label: 'Starter Files',
            href: 'https://github.com/craigmckeachie/react-starter-files',
          },
          {
            type: 'link',
            label: 'Solution Code',
            href: 'https://github.com/craigmckeachie/projectpilot-js',
          },
        ],
      },
      {
        TypeScript: [
          'labs/ts/Introduction',
          'labs/ts/CreatingNewProject',
          'labs/ts/RunningYourProject',
          'labs/ts/StylesUsingCSS',
          'labs/ts/YourFirstComponent',
          'labs/ts/CreatingDataStructures',
          'labs/ts/PassingDataToComponent',
          'labs/ts/DisplayingListData',
          'labs/ts/MoreReusableComponents',
          'labs/ts/RespondingToEvent',
          'labs/ts/CreatingForm',
          'labs/ts/CommunicatingChildToParentComponent',
          'labs/ts/HidingShowingComponents',
          'labs/ts/MoreComponentCommunication',
          'labs/ts/MultipleLevelComponentCommunication',
          'labs/ts/FormValuesToState',
          'labs/ts/FormValidation',
          'labs/ts/SetupBackendRESTAPI',
          'labs/ts/HTTP-GET',
          'labs/ts/HTTP-PUT',
          'labs/ts/RouterBasics',
          'labs/ts/RouteParameters',
          'labs/ts/BuildAndDeploy',
          'labs/ts/CustomHooks',
          'labs/ts/T1-FirstComponentTests',
          'labs/ts/T2-SnapshotTests',
          'labs/ts/T3-MoreTestingComponents',
          'labs/ts/T4-NestedComponents',
          'labs/ts/T5-ContainerComponents',
          'labs/ts/T6-TestingForms',
          'labs/ts/T7-ActionTests',
          'labs/ts/T8-ReducerTests',
          'labs/ts/T9-APITests',
          'labs/ts/ReactQuery',
          'labs/ts/R1-ReduxInstall',
          'labs/ts/R2-ReduxActionsReducer',
          'labs/ts/R3-ReduxWithReact',
          'labs/ts/A1-SkippingLabs',
          {
            type: 'link',
            label: 'Starter Files',
            href: 'https://github.com/craigmckeachie/react-starter-files',
          },
          {
            type: 'link',
            label: 'Solution Code',
            href: 'https://github.com/craigmckeachie/projectpilot-ts',
          },
        ],
      },
    ],
    Gatsby: [
      {
        Concepts: [
          'gatsby/concepts/Overview',
          'gatsby/concepts/Tooling',
          'gatsby/concepts/Components',
          'gatsby/concepts/Styling',
          'gatsby/concepts/Data',
          'gatsby/concepts/CSSGrid',
          'gatsby/concepts/Images',
          'gatsby/concepts/BuildDeployAudit',
          // 'gatsby/concepts/08-GraphQL',
        ],
        Labs: [
          'gatsby/labs/Overview',
          'gatsby/labs/Tooling',
          'gatsby/labs/Components',
          'gatsby/labs/Styling',
          'gatsby/labs/03a-Utility-First-Styling',
          'gatsby/labs/Data',
          'gatsby/labs/CSSGrid',
          'gatsby/labs/Images',
          'gatsby/labs/BuildDeployAudit',
          // 'gatsby/labs/GraphQL',
        ],
      },
    ],
  },
};
