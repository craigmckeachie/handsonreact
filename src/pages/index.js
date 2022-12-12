import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Free course to help you learn React by writing code."
    >
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>

          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted
              )}
              to="/docs/"
            >
              Start Learning
            </Link>
          </div>
        </div>
      </header>
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              <div className={clsx('col col--4', styles.feature)}>
                {/* <div className="text--center">
                  <img className={styles.featureImage} src="" alt="" />
                </div> */}
                <h3>Hands-On</h3>

                <ul>
                  <li>Code along demos, no slides</li>
                  <li>Build an application in class</li>
                  <li>
                    Specific computer setup directions for students or
                    preconfigured virtual environments
                  </li>
                </ul>
              </div>
              <div className={clsx('col col--4', styles.feature)}>
                <h3>Up to Date</h3>

                <ul>
                  <li>Focused on function components with Hooks</li>
                  <li>Option to use TypeScript</li>
                  <li>Redux & alternatives to Redux State Management</li>
                  <li>
                    React Testing Library instead of Enzyme to test components
                  </li>
                </ul>
              </div>
              <div className={clsx('col col--4', styles.feature)}>
                <h3>Step-by-Step lab directions</h3>

                <ul>
                  <li>Students can work at their own pace</li>
                  <li>Includes finished code after every lab</li>
                  <li>Option to use TypeScript or JavaScript</li>
                </ul>
              </div>
              <div className={clsx('col col--4', styles.feature)}>
                <h3>Prerequisite Topics Covered</h3>
                <ul>
                  <li>New JavaScript Language Features</li>
                  <li>TypeScript Quickstart</li>
                  <li>npm (package manager)</li>
                </ul>
              </div>
              <div className={clsx('col col--4', styles.feature)}>
                <h3>Comprehensive</h3>
                <ul>
                  <li>
                    In addition to the fundamental React topics, the course
                    includes advanced topics
                  </li>
                  <li>State Management</li>
                  <li>Testing, Performance</li>
                </ul>
              </div>
              <div className={clsx('col col--4', styles.feature)}>
                <h3>Licensing</h3>
                <ul>
                  <li>
                    If you would like to use this material to conduct your own
                    training or workshop please contact us at{' '}
                    <a target="_blank" href="https://www.funnyant.com/contact">
                      funnyant.com
                    </a>
                    .
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section></section>
      </main>
    </Layout>
  );
}

export default Home;
