// components/MetaData.tsx
import React from 'react';
import { Helmet } from 'react-helmet';

interface MetaDataProps {
  title?: string;
  description?: string;
  keywords?: string[];
  openGraph?: {
    type?: string;
    url?: string;
    title?: string;
    description?: string;
    image?: string;
    imageAlt?: string;
  };
}

const MetaData: React.FC<MetaDataProps> = ({
  title = "SPORTON | Home - Player Posts, Achievements, and Contact Players",
  description = "SPORTON is a sports community platform that includes all athletes from Egypt in various sports, and on the other hand, player agents and clubs and institutions that will receive their talents will be present.",
  keywords = ["SPORTON", "Home", "Player Posts", "Achievements", "Contact Players", "Showcase Talent", "Connect with Clubs", "Gain Recognition", "Sports Platform"],
  openGraph,
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      {openGraph && (
        <>
          <meta property="og:type" content={openGraph.type || "website"} />
          <meta property="og:url" content={openGraph.url || ""} />
          <meta property="og:title" content={openGraph.title || title} />
          <meta property="og:description" content={openGraph.description || description} />
          <meta property="og:image" content={openGraph.image || ""} />
          <meta property="og:image:alt" content={openGraph.imageAlt || ""} />
        </>
      )}
    </Helmet>
  );
};

export default MetaData;
