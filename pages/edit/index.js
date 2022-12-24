import { getSession, signOut } from 'next-auth/react';
import Users from "../../lib/userSchema";
import connectDB from "../../lib/connectDB";
import { useEffect, useState } from "react";
import axios from "axios";

function edit({ user }) {

    const [wallet, setWallet] = useState('');
    const [network, setNetwork] = useState('');

    let infoUserUpdate = {};

    async function updateUser(infoUserUpdate) {
        const { data } = await axios.post("/api/updateUser",
            { profileId: user.profileId, infoUserUpdate },
            {
                headers: {
                    "content-type": "application/json",
                },
            }
        );
        console.log(data)
        window.location.reload(true);
    }

    function confirmar() {
        infoUserUpdate.wallet = wallet;
        infoUserUpdate.network = network;
        updateUser(infoUserUpdate);
    }

    return (
        <>
            <section className="painel_user_edit d-flex align-items-center vh-100">
                <div className="container d-flex justify-content-center container_user">
                    <div className="row row-user">
                        <div className="col col-height d-flex flex-column">
                            <div className="top d-flex justify-content-between align-items-center row">
                                <div className="buttons d-flex flex-column col">
                                    <a href="/home" className="button-back pb-3"><span>
                                        <img src='image/arrow.svg' alt="" /></span> Back to Panel</a>
                                </div>
                                <div className="logo col tiek">
                                    <img className='imagewe' src='image/logo.png' alt="Logo" />
                                </div>
                                <div className="logo col">
                                </div>
                            </div>
                            <form className="center col-user d-flex flex-column align-items-center">
                                <div className="form-center">
                                    <h3>Wallet</h3>
                                    <input type="text" className="form-control mb-4" placeholder="BSC Wallet Address" aria-label="WalletAddress" value={wallet} onChange={(e) => setWallet(e.target.value)} />
                                    <h3>Social network user</h3>
                                    <input type="text" className="form-control" placeholder="Social Network @User" aria-label="SocialNetwork" value={network} onChange={(e) => setNetwork(e.target.value)} />
                                </div>
                                <button type="button" className="btn btn-update" onClick={() => confirmar()}>Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    await connectDB();

    const userM = await Users.findOne({ profileId: session?.user.profileId }).lean();

    return {
        props: { user: session.user },
    };
}

export default edit;