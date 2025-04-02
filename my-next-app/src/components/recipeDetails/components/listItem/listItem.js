import React, { useState } from "react";

import styles from "./listItem.module.scss";

const ListItem = ({ detail, label, link = "" }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Extract YouTube Video ID and convert to Embed URL
  const getEmbedUrl = (url) => {
    if (url.includes("youtube.com/watch")) {
      const videoId = new URL(url).searchParams.get("v");
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  const isVideo = link.includes("youtube.com/watch");

  return (
    <>
      {detail && (
        <li key={label} className={styles.item}>
          <span className={styles.label}>{label}: </span>
          {link ? (
            isVideo ? (
              <button
                className={styles.link}
                onClick={() => setShowVideo(true)}
              >
                {detail} (Watch)
              </button>
            ) : (
              <a
                className={styles.link}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {detail}
              </a>
            )
          ) : (
            <span className={styles.text}>{detail}</span>
          )}
        </li>
      )}
      {showVideo && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowVideo(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              onClick={() => setShowVideo(false)}
            >
              ✖
            </button>
            {isLoading && <div className={styles.loader}>Loading...</div>}
            <iframe
              width="100%"
              height="400px"
              src={getEmbedUrl(link)}
              frameBorder="0"
              allowFullScreen
              onLoad={() => {
                setIsLoading(false);
              }}
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default ListItem;
