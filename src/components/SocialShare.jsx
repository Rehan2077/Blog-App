import React from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

const SocialShare = ({ url, title }) => {
  return (
    <div className="flex mt-5 gap-2">
      <h2 className="text-lg lg:text-xl font-bold text-dark-hard ">
        Share on:{" "}
      </h2>
      <div className=" flex gap-4 ">
        <FacebookShareButton url={url} quote={title} hashtag="#article">
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <WhatsappShareButton url={url} quote={title} hashtag="#article">
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
        <TwitterShareButton url={url} quote={title} hashtag="#article">
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <LinkedinShareButton url={url} quote={title} hashtag="#article">
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        <TelegramShareButton url={url} quote={title} hashtag="#article">
          <TelegramIcon size={32} round />
        </TelegramShareButton>
      </div>
    </div>
  );
};

export default SocialShare;
