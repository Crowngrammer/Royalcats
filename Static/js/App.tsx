import "./App.css";
import { useMemo } from "react";

import Minter from "./Minter";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as anchor from "@project-serum/anchor";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  getPhantomWallet,
  getSolflareWallet,
  getSolletWallet,
  getMathWallet,
} from "@solana/wallet-adapter-wallets";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import { ThemeProvider, createTheme } from "@material-ui/core";

const theme = createTheme({
  palette: {
    type: "dark",
  },
});

const candyMachineId = process.env.REACT_APP_CANDY_MACHINE_ID
  ? new anchor.web3.PublicKey(process.env.REACT_APP_CANDY_MACHINE_ID)
  : undefined;

const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;

const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(rpcHost);

const startDateSeed = parseInt(process.env.REACT_APP_CANDY_START_DATE!, 10);

const txTimeout = 30000; // milliseconds (confirm this works for your project)

const App = () => {
  const endpoint = useMemo(() => clusterApiUrl(network), []);

  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolflareWallet(),
      getSolletWallet(),
      getMathWallet(),
    ],
    []
  );

  function toggleMenu() {
    const menu = document.getElementById("mobileNavContainer")!;
    menu.classList.toggle("open-menu");
    console.log("pressed");
  }

  return (
    <div>
      <div id="mobileNavContainer" className="mobile-nav">
        <div className="mobile-nav-close-button">
          <img src="/icons/close.svg" alt="" onClick={toggleMenu} />
        </div>
        <ul>
          <li>
            <img className="mobile-nav-logo" src="/img/logo.png" alt="" />
          </li>
          <li>
            <a href="/#link1" onClick={toggleMenu}>
             Mint
            </a>
          </li>
          <li>
            <a href="/#about" onClick={toggleMenu}>
              About
            </a>
          </li>
          <li>
            <a href="/#utilities" onClick={toggleMenu}>
             Utility
            </a>
          </li>
          <li>
            <a href="/#roadmap" onClick={toggleMenu}>
              Roadmap
            </a>
          </li>

           <li>
            <a href="/#faq" onClick={toggleMenu}>
              FAQ
            </a>
          </li>
          <li>
            <div className="social-icons">
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <img className="nav-social" src="/icons/twitter.svg" alt="" />
              </a>
              <a href="https://discord.com" target="_blank" rel="noreferrer">
                <img className="nav-social" src="/icons/discord.svg" alt="" />
              </a>
            </div>
          </li>
        </ul>
      </div>
      <div className="mobile-menu-button" onClick={toggleMenu}>
        <img src="/icons/menu.svg" alt="" />
      </div>
      <nav>
        <div className="nav-container">
          <img className="nav-logo" src="/img/logo.png" alt="" />
          <a className="hide-800" href="/#link1">
           Mint
          </a>
          <a className="hide-800" href="/#about">
            About
          </a>
          <a className="hide-800" href="/#utilities">
            Utility
          </a>
          <a className="hide-800" href="/#roadmap">
            Roadmap
          </a>
          <a className="hide-800" href="/#faq">
            FAQ
          </a>
          <div className="social-icons hide-800">
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <img className="nav-social" src="/icons/twitter.svg" alt="" />
            </a>
            <a href="https://discord.com" target="_blank" rel="noreferrer">
              <img className="nav-social" src="/icons/discord.svg" alt="" />
            </a>
          </div>
        </div>
      </nav>
      <div className="topbanner">
        <img src="assets/banner.png" alt="topbanner" />
      </div>
      <div className="content-wrapper">
        <header className="card" id="link1">
          <div className="home" style={{ padding: "0 24px 0 24px 0" }}>
            <h3 className="text-secondary-color">Welcome To</h3>
            <h1 className="pb-3">Royal Cats</h1>
            <p className="text-secondary-color">
              Royal Cats are a collection of 1000 randomly generated NFTs from 6 base characters and 124 unique attributes! Our talented artist has designed each NFT to be randomly generated with a combination of base characters, backgrounds, and different traits. The Royal Cat NFT community will provide all of its owners with abundant benefits and limitless possibilities. The different NFT characters are chosen such that everyone can identify with one of them. Get ready to join the royal family!

            </p>
          </div>
          <div>
            <ThemeProvider theme={theme}>
              <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect>
                  <WalletDialogProvider>
                    <Minter
                      candyMachineId={candyMachineId}
                      connection={connection}
                      startDate={startDateSeed}
                      txTimeout={txTimeout}
                      rpcHost={rpcHost}
                    />
                  </WalletDialogProvider>
                </WalletProvider>
              </ConnectionProvider>
            </ThemeProvider>
          </div>
        </header>


        <section id="about">
          <div className="aboutinfo">
          <h1>About the collection</h1>
          <p>
            The noble family Debenham resides in the very sleepy village of Westbury. It is a place that still embodies the rural life of England. Brick houses, narrow streets and a marketplace where social life takes place. And of course, also a church, a hotel and two pubs, a small department store, as well as a butcher and a baker.
            <br></br>
            <br></br>
            Just outside the village connected to a road lined with trees and reminiscent of an avenue in Tuscany, stands Westbury Hall: the family seat of the Debanham's.
          </p>
          </div>

          <div className="characters">
            <div className="character">
              <img src="assets/count.png" alt="count" />
              <h1>Count Edmond Fitz Allen Debenham, 53 years old</h1>
              <p>The head of the family, very smart and fair to his children. His money originates from his ancestors and a number of hotels, which are owned by the family. He is a passionate hunter, loves dogs and generally just wants to live in peace.</p>
            </div>
            <div className="character">
              <img src="assets/countess.png" alt="countess" />
              <h1>Countess Maria Debanham, 45 years old</h1>
              <p>German by birth and the driving force of the family. She cares intensively for the estate and her three children. Her beautiful roses in the garden and fundraising galas are her passion.</p>
            </div>
          </div>
          <div className="characters">
            <div className="character">
              <img src="assets/son.png" alt="son" />
              <h1>Conner, the son and progenitor, 23 years old</h1>
              <p>He is the secret playboy of the family. Loves fast cars and grows pot in the flower house together with the gardener, which he shares with his friends. Goes to the casino and horse races, bets on every sporting event. More often than not he is stoned and just enjoys life without his parents suspecting anything. He lives on the money of his parents and on his bets - when he wins.</p>
            </div>
            <div className="character">
              <img src="assets/old.png" alt="old" />
              <h1>Alice the daughter, 22 years old</h1>
              <p>Very pretty, overly present on social media and a straight-up party girl. Attends university in Bristol, takes probably 50 selfies a day and never misses an opportunity to present herself in the limelight. She goes to concerts and events a lot to meet other celebrities and enjoys to go horseback riding.</p>
            </div>
            <div className="character">
              <img src="assets/young.png" alt="young" />
              <h1>Brooke the youngest daughter, 16 years old</h1>
              <p>Goes to private school in Bath and is the environmental activist in the family. Also takes part in the Friday4Future demos, much to the mother's disapproval.</p>
            </div>
          </div>
          <div className="characters">
          <div className="character">
              <img src="assets/butler.png" alt="butler" />
              <h1>Alfred the butler, 60 years old</h1>
              <p>A typical stiff English butler, loyal to the master of the house, but turning a blind eye to Conner.</p>
            </div>
          </div>
        </section>
        
      <section id="utilities">
        <div className="toputil">
        <h1>Utility</h1>
        <p>All NFTs entitle you to the benefits mentioned below, but some are rarer than others. For a full overview of rarities and benefits, click here (link to follow). </p>
        </div>
          <div className="utility">
            <img src="assets/rights.svg" alt="rights" />
             <div className="textutil">
              <h1>Exclusive rights</h1>
              <p>When you are a certified owner of a Royal Cats NFT, you receive exclusive IP rights to your unique NFT for personal and commercial use.</p>
              </div>
          </div>
          <hr></hr>
          <div className="utility">
            <img src="assets/community.svg" alt="com" />
             <div className="textutil">
              <h1>Ambitious community</h1>
              <p>Be part of launching this ambitious community. Shared goals equal shared success. Let's all grow together. </p>
              </div>
          </div>
          <hr></hr>
          <div className="utility">
            <img src="assets/perks.svg" alt="perks" />
             <div className="textutil">
              <h1>Perks</h1>
              <p>Exclusive rewards, airdrops and premium Royal Cats collectibles will be available for purchase to NFT holders.</p>
              </div>
          </div>
      </section>

      <section id ="roadmap">
        <h1>Roadmap</h1>
        <p>
        We will continue to develop and expand the Royal Cats brand. We have ambitious plans, including the launch additional NFT collections and collaborations with other renowned NFT projects. Amongst the first steps will be opening of a merch store offering Royal Cats brand merchandise as well as fundraising events and raffles.
<br></br><br></br>
We have plenty of ideas for the future of Royal Cats, so join us on this journey as we launch our project and expand the Royal Cats universe!

        </p>
      </section>
<section id = "faq">
<h1>FAQ</h1>
<br></br>
<br></br>
<br></br>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>What is the mint price?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          The mint price in pre-sale is 0.5 sol and on public sale is 0.8 sol.

          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>When is the start date?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Saturday, 01 May at 20:00 UTC presale and Tuesday, 03 May public sale.

          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>What is the utility?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Royal Cats holders will own unique and personalized NFT artwork. Holders will have access to the Royal Cats community, exclusive giveaways for holders, contests, priority whitelisting for future collections, and more!

          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>How do I mint?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          1. Log into your Phantom wallet or download the extension in your internet browser. <br></br>
2. Connect to your wallet.<br></br> 
3. Click on the mint button and you will be prompted to sign your transaction. <br></br>
4. Once you have made the purchase, your Royal Cats NFT will appear in your wallet and also on select secondary marketplaces! <br></br>

          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Where can I see my purchased NFT?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Your Royal Cats NFT will appear in any address or linked wallet you used to make your purchase. You can also see your freshly minted NFT directly on your Opensea (to be validated) account.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Where will I be Able to Buy & Sell (Secondary Market)?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          We will be listed on Magic Eden & Solanart right after the Mint.

          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>How much is the Royalty Fees?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          The royalty fee is set to 7%, it is important for us to disclose this before the mint because most projects didn’t disclose that.


          </Typography>
        </AccordionDetails>
      </Accordion>
</section>
      </div>
      <footer>
        <h3>Copyright 2022 Royal Cats</h3>
      </footer>
    </div>
  );
};

export default App;
