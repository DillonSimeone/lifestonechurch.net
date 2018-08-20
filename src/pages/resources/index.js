import React from 'react';
import Link from 'gatsby-link';
import styled from 'react-emotion';
import Img from 'gatsby-image';

import { H1 } from '../../components/headers';
import SermonCard from '../../components/SermonCard';
import Breadcrumbs from '../../components/Breadcrumbs';

const title = 'Resources';

const SubscribeImage = styled.div`
  display: inline-block;
  margin-right: 12px;

  img {
    max-height: 36px;
  }
`;

const Page = ({ data }) => {
  const sermons = data.allContentfulSermon.edges;

  return (
    <div>
      <Breadcrumbs path={[{ title: 'Home', url: '/' }]} title={title} />

      <H1>{title}</H1>

      <div>
        <a href="https://itunes.apple.com/us/podcast/lifestone-church/id968942229">
          <SubscribeImage>
            <Img resolutions={data.itunesImage.childImageSharp.resolutions} />
          </SubscribeImage>
        </a>
        <Link to="/feed.rss">
          <SubscribeImage>
            <Img resolutions={data.rssImage.childImageSharp.resolutions} />
          </SubscribeImage>
        </Link>
      </div>

      {sermons.map(({ node }) => (
        <SermonCard
          key={node.id}
          linkTo={`/resources/sermons/${node.fields.slug}`}
          imageSizes={
            (node.sermonSeries &&
              node.sermonSeries.image &&
              node.sermonSeries.image.sizes) ||
            data.logoImage.childImageSharp.sizes
          }
          title={node.title}
          date={node.date}
          speakers={node.speaker.map(s => s.name)}
          passage={node.mainScripture}
        />
      ))}
    </div>
  );
};

export default Page;

export const query = graphql`
  query SermonsQuery {
    allContentfulSermon(sort: { fields: [date], order: DESC }) {
      edges {
        node {
          id
          fields {
            slug
          }
          title
          date
          audioUrl
          audioDuration
          audioLength
          sermonSeries {
            name
            image {
              sizes(maxWidth: 320) {
                ...GatsbyContentfulSizes
              }
            }
          }
          childContentfulSermonNotesTextNode {
            notes
          }
          speaker {
            name
            photo {
              file {
                url
              }
            }
          }
          mainScripture
          notes {
            notes
          }
        }
      }
    }
    logoImage: file(relativePath: { eq: "images/logo/logo2.jpg" }) {
      childImageSharp {
        sizes(maxWidth: 320) {
          ...GatsbyImageSharpSizes_tracedSVG
        }
      }
    }
    itunesImage: file(relativePath: { eq: "pages/resources/itunes.png" }) {
      childImageSharp {
        resolutions(width: 100, height: 36) {
          ...GatsbyImageSharpResolutions
        }
      }
    }
    rssImage: file(relativePath: { eq: "pages/resources/rss.png" }) {
      childImageSharp {
        resolutions(width: 36, height: 36) {
          ...GatsbyImageSharpResolutions
        }
      }
    }
  }
`;