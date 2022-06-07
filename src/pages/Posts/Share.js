import React, { useState, useCallback } from 'react';
import { render } from 'react-dom';
import { useModal } from 'react-hooks-use-modal';

import { FacebookShareButton, TwitterShareButton,WhatsappShareButton } from "react-share";
import { FacebookIcon, TwitterIcon, WhatsappIcon } from "react-share";
import Post from "./Post";

export default function Share() {

    const [Modal, open, close, isOpen] = useModal('root', {
        preventScroll: true,
        closeOnOverlayClick: false
      });






    
      return (
        <div>
        <p>Modal is Open? {isOpen ? 'Yes' : 'No'}</p>
        <button onClick={open}>OPEN</button>
        <Modal>
          <div className='bg-slate-400 text-Black'>
            <h1>Title</h1>
            <p>
            <FacebookShareButton
        url={"https://peing.net/en/"}
        
        hashtag={"#hashtag"}
        description={"aiueo"}
        className="Demo__some-network__share-button"
      >
        <FacebookIcon size={32} round /> Facebook
      </FacebookShareButton>
      <br />
      <TwitterShareButton
        title={"test"}
        url={"https://peing.net/en/"}
        hashtags={["hashtag1", "hashtag2"]}
      >
        <TwitterIcon size={32} round />
        Twitter
      </TwitterShareButton>
      <br />
      <WhatsappShareButton
        title={"test"}
        url={"https://peing.net/en/"}
        hashtags={["hashtag1", "hashtag2"]}
      >
        <WhatsappIcon size={32} round />
        Whatsapp
      </WhatsappShareButton>
            </p>
            <button onClick={close}>CLOSE</button>
          </div>
        </Modal>
      </div>
      );

}
