import { getSession, signOut } from 'next-auth/react';
import Users from "../lib/userSchema";
import connectDB from "../lib/connectDB";
import { useState } from "react";
import axios from "axios";

function UserCard({ user }) {

    const [nome, changeNome] = useState();
    const [cpf, changeCpf] = useState();
    const [celular, changeCelular] = useState();
    const [cep, changeCep] = useState();
    const [bairro, changeBairro] = useState();
    const [numero, changeNumero] = useState();
    const [cidade, changeCidade] = useState();
    const [estado, changeEstado] = useState();

    async function updateUserA() {
        const { data } = await axios.post("/api/updateUserNameCpf",
            { profileId: user.profileId, nome: nome, cpf: cpf },
            {
                headers: {
                    "content-type": "application/json",
                },
            }
        );
        console.log(data)

    }

    async function updateUserB() {
        const { data } = await axios.post("/api/updateUserCelularCep",
            { profileId: user.profileId, celular: celular, cep: cep },
            {
                headers: {
                    "content-type": "application/json",
                },
            }
        );
        console.log(data)

    }
    async function updateUserC() {
        const { data } = await axios.post("/api/updateUserCidadeEstado",
            { profileId: user.profileId, estado: estado, cidade: cidade },
            {
                headers: {
                    "content-type": "application/json",
                },
            }
        );
        console.log(data)

    }
    async function updateUserD() {
        const { data } = await axios.post("/api/updateUserBairroNumero",
            { profileId: user.profileId, bairro: bairro, numero: numero },
            {
                headers: {
                    "content-type": "application/json",
                },
            }
        );
        console.log(data)


    }

    function confirmar() {
        if (nome && cpf && celular && cep && bairro && numero && cidade && estado) {
            updateUserA()
            updateUserB()
            updateUserC()
            updateUserD()
            location.reload()
        }
    }

    return (
        <div>
            <h4>User session:</h4>
            <div>Address: {user.address}</div>
            {/* <div>Bio: {bio}</div> */}
            <br />
            {/* <input
                onChange={(e) => changeBio(e.target.value)}
                value={biogra}
            ></input> */}
            <button onClick={() => confirmar()}>Update User</button>
            <br />
            <br />
            <button onClick={() => signOut({ redirect: '/signin' })}>Sign out</button>
        </div>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: '/signin',
                permanent: false,
            },
        };
    }

    await connectDB();

    const userM = await Users.findOne({ profileId: session?.user.profileId }).lean();

    if (userM !== null) {
        // // userM.bio = userM.bio.toString();
        // userM.avatar = userM.avatar.toString();
    }

    return {
        props: { user: session.user },
    };
}

export default UserCard;