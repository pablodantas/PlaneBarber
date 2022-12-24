import { signIn } from "next-auth/react";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import { useRouter } from "next/router";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { Web3AuthConnector } from '@web3auth/web3auth-wagmi-connector';
import axios from "axios";

function SignIn() {
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { push } = useRouter();

  const handleAuth = async (wal) => {
    if (isConnected) {
      await disconnectAsync();
    }

    console.log("Connect To Site Via Wallet");

    const userData = { network: 'evm' };

    // if (wal === "meta") {
    //   const { account } = await connectAsync({
    //     connector: new MetaMaskConnector({}),
    //   });
    //   userData.address = account;
    //   userData.chain = 97;
    // }

    // if (wal === "coin") {
    //   const { account } = await connectAsync({
    //     connector: new CoinbaseWalletConnector({}),
    //   });
    //   userData.address = account;
    //   userData.chain = 97;
    // }

    // if (wal === "wal") {
    //   const { account } = await connectAsync({
    //     connector: new WalletConnectConnector({
    //       options: { qrcode: true }
    //     }),
    //   });
    //   userData.address = account;
    //   userData.chain = 97;
    // }

    if (wal === "Web3Auth") {
      const { account } = await connectAsync({
        connector: new Web3AuthConnector({
          options: {
            enableLogging: true,
            clientId: 'BCJ8lm9g3SS_RRUqTPk2gSLZn6t3GW-uCrRQ7NHwNsVCwJVWRv3X3i3ovFXW11n1RkuHNkgDoGSoGb4uLchvpWM', // Get your own client id from https://dashboard.web3auth.io
            network: 'testnet',
            chainId: 97,
            appLogo: "https://ipfs.moralis.io:2053/ipfs/Qma44gxiViTKZxDHrqfX5qmSj6uy2hv9axS99iMjhyMXut",
          },
        }),
      });
      userData.address = account;
      userData.chain = 97;
    }

    console.log("Sending Connected Account and Chain ID to Moralis Auth API");

    const { data } = await axios.post("/api/auth/request-message", userData, {
      headers: {
        "content-type": "application/json",
      },
    });

    console.log("Received Signature Request From Moralis Auth API");

    const message = data.message;

    const signature = await signMessageAsync({ message });

    console.log("Succesful Sign In, Redirecting to User Page");

    const { url } = await signIn("credentials", {
      message,
      signature,
      redirect: false,
      callbackUrl: "/home",
    });

    push(url);
  };

  return (
    <>
      <section className="login-painel">
        <div className="container">
          <div className="row row-login justify-content-center">
            <div className="col d-flex flex-column align-items-center col-login">
              <div className="row w-100 justify-content-center">
                <div className="col-12 col-sm-4 ms-sm-5 mb-3">
                  <a href="https://wear2n.com" className="button-back pb-3">
                    <span>
                      <img src='image/arrow.svg' alt="" />
                    </span>{" "}
                    Back to Site
                  </a>
                </div>
              </div>
              <div className="row box-transparency d-flex flex-wrap justify-content-center align-content-around">
                <div className="row logo">
                  <div className="col d-flex justify-content-center">
                    <img className="logo" src='image/logo.png' alt="logo" />
                  </div>
                </div>
                <div className="row d-flex justify-content-center">
                  <div className="col-9">
                    <div
                      onClick={() => handleAuth("Web3Auth")}
                      className="btn btn-aut m-0 p-0"
                    >
                      Authenticate
                    </div>
                  </div>
                </div>
                <div className="w-100 ">
                  <p>Wear to earn System</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col col-img">
              <img src='image/pet.svg' alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SignIn;