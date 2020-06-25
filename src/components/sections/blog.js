import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { FormattedIcon } from '@components/icons';
import styled from 'styled-components';
import { theme, mixins, media, Section, Button, Heading } from '@styles';
const { colors, fontSizes, fonts } = theme;

const StyledContainer = styled(Section)`
  ${mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
`;
const StyledGrid = styled.div`
  margin-top: 50px;

  .blog {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    grid-gap: 15px;
    position: relative;
    ${media.desktop`grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));`};
  }
`;
const StyledBlogInner = styled.div`
  ${mixins.boxShadow};
  ${mixins.flexBetween};
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  padding: 2rem 1.75rem;
  height: 100%;
  border-radius: ${theme.borderRadius};
  transition: ${theme.transition};
  background-color: ${colors.lightNavy};
`;
const StyledBlog = styled.div`
  transition: ${theme.transition};
  cursor: default;
  &:hover,
  &:focus {
    outline: 0;
    ${StyledBlogInner} {
      transform: translateY(-5px);
    }
  }
`;
const StyledBlogHeader = styled.div`
  ${mixins.flexBetween};
  margin-bottom: 30px;
`;
const StyledFolder = styled.div`
  color: ${colors.white};
  svg {
    width: 40px;
    height: 40px;
  }
`;
const StyledBlogLinks = styled.div`
  margin-right: -10px;
  color: ${colors.white};
`;
const StyledIconLink = styled.a`
  position: relative;
  top: -10px;
  padding: 10px;
  svg {
    width: 20px;
    height: 20px;
  }
`;
const StyledBlogName = styled.h5`
  margin: 0 0 10px;
  font-size: ${fontSizes.xxl};
  color: ${colors.white};
`;
const StyledBlogDescription = styled.div`
  font-size: 17px;
  color: ${colors.lightWhite};
  a {
    ${mixins.inlineLink};
  }
`;
const StyledTechList = styled.ul`
  display: flex;
  align-items: flex-end;
  flex-grow: 1;
  flex-wrap: wrap;
  padding: 0;
  margin: 20px 0 0 0;
  list-style: none;

  li {
    font-family: ${fonts.SFMono};
    font-size: ${fontSizes.xs};
    color: ${colors.lightSlate};
    line-height: 1.75;
    margin-right: 15px;
    &:last-of-type {
      margin-right: 0;
    }
  }
`;
const StyledMoreButton = styled(Button)`
  margin: 100px auto 0;
`;

const Blog = ({ data }) => {
  const [showMore, setShowMore] = useState(false);
  const revealTitle = useRef(null);
  const revealArchiveLink = useRef(null);
  const revealBlogs = useRef([]);
  useEffect(() => {
    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealArchiveLink.current, srConfig());
    revealBlogs.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  const GRID_LIMIT = 6;
  const Blogs = data.filter(({ node }) => node);
  const firstSix = Blogs.slice(0, GRID_LIMIT);
  const BlogsToShow = showMore ? Blogs : firstSix;
  // const BlogsToShow = Blogs

  return (
    <StyledContainer id="blog">
      <Heading ref={revealTitle}>My Thoughts</Heading>

      <StyledGrid>
        <TransitionGroup className="blog">
          {BlogsToShow &&
            BlogsToShow.map(({ node }, i) => {
              const { frontmatter, html } = node;
              const { external, title, tech } = frontmatter;
              return (
                <CSSTransition
                  key={i}
                  classNames="fadeup"
                  timeout={i >= GRID_LIMIT ? (i - GRID_LIMIT) * 300 : 300}
                  exit={false}>
                  <StyledBlog
                    key={i}
                    ref={el => (revealBlogs.current[i] = el)}
                    tabIndex="0"
                    style={{
                      transitionDelay: `${i >= GRID_LIMIT ? (i - GRID_LIMIT) * 100 : 0}ms`,
                    }}>
                    <StyledBlogInner>
                      <header>
                        <StyledBlogHeader>
                          <StyledFolder>{/* <FormattedIcon name="Star" /> */}</StyledFolder>
                          <StyledBlogLinks>
                            {external && (
                              <StyledIconLink
                                href={external}
                                target="_blank"
                                rel="nofollow noopener noreferrer"
                                aria-label="External Link">
                                <FormattedIcon name="External" />
                              </StyledIconLink>
                            )}
                          </StyledBlogLinks>
                        </StyledBlogHeader>
                        <StyledBlogName>{title}</StyledBlogName>
                        <StyledBlogDescription dangerouslySetInnerHTML={{ __html: html }} />
                      </header>
                      <footer>
                        {tech && (
                          <StyledTechList>
                            {tech.map((tech, i) => (
                              <li key={i}>{tech}</li>
                            ))}
                          </StyledTechList>
                        )}
                      </footer>
                    </StyledBlogInner>
                  </StyledBlog>
                </CSSTransition>
              );
            })}
        </TransitionGroup>
      </StyledGrid>

      <StyledMoreButton onClick={() => setShowMore(!showMore)}>
        Show {showMore ? 'Less' : 'More'}
      </StyledMoreButton>
    </StyledContainer>
  );
};

Blog.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Blog;
