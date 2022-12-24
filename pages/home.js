import { getSession, signOut } from 'next-auth/react';
import Users from "../lib/userSchema";
import connectDB from "../lib/connectDB";
import { useEffect, useState } from "react";
import Header from '../components/header';

function home({ user }) {

    return (
        <>
            <section className="painel_user d-flex align-items-center">
                <div className="container d-flex justify-content-center container_user">
                    <div className="row row-user">
                        <div className="col col-height d-flex flex-column">
                            <div className="top d-flex justify-content-between align-items-center">
                                <img className="logo" src='image/logo.png' alt="Logo" />
                                <div onClick={() => signOut({ redirect: '/' })} className="button-logout d-flex justify-content-between" ><span>
                                    <img src='image/' alt='' /></span>Logout</div>
                            </div>
                            <div className="center col-user d-flex flex-column align-items-center justify-content-between">
                                <div className="wallet d-flex flex-column align-items-center">
                                    <h3>Wallet</h3>
                                    <p>{user?.wallet}</p>
                                </div>
                                <div className="social d-flex flex-column align-items-center justify-content-around">
                                    <h3>Social Network User</h3>
                                    <p>@{user?.network}</p>
                                </div>
                                <a href="/edit" className="btn btn-edit">Edit</a>
                            </div>
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
    const user = JSON.parse(JSON.stringify(userM));

    return {
        props: { user: user },
    };
}

export default home;