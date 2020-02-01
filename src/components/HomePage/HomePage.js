import React from 'react';
import { Segment } from 'semantic-ui-react';
import styled from 'styled-components';
// components
import ResponsiveContainer from '../ResponsiveContainer';
import About from '../About';
import Testimonial from '../Testimonial';
import Explore from '../Explore';
import Footer from '../Footer';

const AboutSegment = styled(Segment)`
  && {
    padding: 8em 0em;
  }
`;

const TestimonialSegment = styled(Segment)`
  && {
    padding: 0em;
  }
`;

const ExploreSegment = styled(Segment)`
  && {
    padding: 8em 0em;
  }
`;

const FooterSegment = styled(Segment)`
  && {
    padding: 5em 0em;
  }
`;

const HomePage = () => {
  return (
    <ResponsiveContainer>
      <main>
        <AboutSegment vertical>
          <About />
        </AboutSegment>
        <TestimonialSegment vertical>
          <Testimonial />
        </TestimonialSegment>
        <ExploreSegment vertical>
          <Explore />
        </ExploreSegment>
        <FooterSegment inverted vertical>
          <Footer />
        </FooterSegment>
      </main>
    </ResponsiveContainer>
  );
};

export default HomePage;
